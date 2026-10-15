import {
    attributesModule,
    eventListenersModule,
    init,
    styleModule,
} from "snabbdom";
import { clamp, lerp } from "@footgun/math-gap";
import { getColors, getGraphMetrics } from "./graph-utils.js";
import renderCanvas from "./render-canvas.js";
import renderSvg from "./render-svg.js";

const TAG_NAME = "snabbdom-timeline";

const patch = init([attributesModule, styleModule, eventListenersModule]);

// static styles live in a stylesheet rather than inline on every vnode. :where()
// keeps the host selector at zero specificity so page css can easily override.
//
// touch-action: horizontal touch drags go to the selection controls, while
// vertical swipes and pinches still scroll/zoom the page.
const STYLES = `
:where(${TAG_NAME}) { display: block; }
:where(${TAG_NAME}:state(dragging)) { cursor: ew-resize; }
:where(${TAG_NAME}) .graph-stack { display: grid; grid-template-columns: minmax(0, 1fr); width: 100%; }
:where(${TAG_NAME}) .graph { display: block; box-sizing: content-box; width: 100%; padding: 10px 0 0; background-color: white; font-size: 10px; text-anchor: middle; -webkit-user-select: none; user-select: none; touch-action: pan-y pinch-zoom; }
`;

let sheet;

// add the component styles to whichever document or shadow root the element lives in
function adoptStyles(el) {
    const root = el.getRootNode();
    if (!("adoptedStyleSheets" in root)) return;

    if (!sheet) {
        sheet = new CSSStyleSheet();
        sheet.replaceSync(STYLES);
    }

    if (!root.adoptedStyleSheets.includes(sheet))
        root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
}

function contentWidth(el) {
    const style = getComputedStyle(el);
    return (
        el.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight)
    );
}

// move the dragged control to pos (0..1 across the graph area).
// @param String type  start | end | time
// @return Boolean  true if the selection changed
function applyDrag(graph, type, pos) {
    const { selection, timeRange } = graph;

    // all the way to the right means "follow the latest data"
    let value =
        pos === 1 && type !== "start"
            ? Infinity
            : lerp(timeRange.start, timeRange.end, pos);

    // prevent the range controls from crossing each other
    if (type === "start") value = Math.min(value, selection.end);
    else if (type === "end") value = Math.max(value, selection.start);

    if (selection[type] === value) return false;

    selection[type] = value;
    return true;
}

export class SnabbdomTimeline extends HTMLElement {
    static observedAttributes = ["renderer"];

    #graphs = [];
    #vnode = null;
    #width;
    #frame = 0;
    #resizeObserver;
    #pixelRatioQuery = null;
    #drag = null;
    #internals = this.attachInternals?.();

    get graphs() {
        return this.#graphs;
    }

    set graphs(graphs) {
        this.#graphs = Array.isArray(graphs) ? graphs : [];
        this.update();
    }

    // svg | canvas
    get renderer() {
        return this.getAttribute("renderer") === "canvas" ? "canvas" : "svg";
    }

    set renderer(renderer) {
        this.setAttribute("renderer", renderer);
    }

    connectedCallback() {
        // properties assigned before the element was defined shadow our accessors
        for (const prop of ["graphs", "renderer"]) {
            if (Object.hasOwn(this, prop)) {
                const value = this[prop];
                delete this[prop];
                this[prop] = value;
            }
        }

        adoptStyles(this);

        this.#resizeObserver ??= new ResizeObserver(([entry]) => {
            const width = Math.floor(entry.contentRect.width);
            if (width !== this.#width) {
                this.#width = width;
                this.update();
            }
        });
        this.#resizeObserver.observe(this);

        this.#watchPixelRatio();
        this.update();
    }

    disconnectedCallback() {
        this.#resizeObserver?.disconnect();
        this.#unwatchPixelRatio();
        cancelAnimationFrame(this.#frame);
        this.#frame = 0;
        this.#endDrag(false);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) this.update();
    }

    // schedule a re-render on the next animation frame. call this after mutating
    // graph data/config; multiple calls within a frame result in a single render.
    update() {
        if (this.#frame || !this.isConnected) return;

        this.#frame = requestAnimationFrame(() => {
            this.#frame = 0;
            this.#render();
        });
    }

    #render() {
        if (!this.isConnected) return;

        this.#width ??= Math.max(0, Math.floor(contentWidth(this)));

        // our container was removed from outside (e.g. innerHTML = ''); start over
        if (this.#vnode && this.#vnode.elm.parentNode !== this)
            this.#vnode = null;

        const canvas = this.renderer === "canvas";
        const render = canvas ? renderCanvas : renderSvg;
        const vnode = render({
            width: this.#width,
            pixelRatio: window.devicePixelRatio || 1,
            graphs: this.#graphs,
            startDrag: this.#startDrag,
            // canvas can't use css var(), so resolve the themeable colors at render time.
            // (svg references the custom properties directly.)
            colors: canvas ? getColors(getComputedStyle(this)) : undefined,
        });

        if (this.#vnode) {
            this.#vnode = patch(this.#vnode, vnode);
        } else {
            const mount = document.createElement("div");
            this.appendChild(mount);
            this.#vnode = patch(mount, vnode);
        }
    }

    // re-render when devicePixelRatio changes (window moved to a screen with a
    // different scale, or browser zoom), so the canvas stays sharp and svg
    // hairlines stay 1 device pixel wide. the css width may not change, so the
    // ResizeObserver alone doesn't catch this. the media query only matches the
    // current ratio, so it's re-created after every change.
    #watchPixelRatio() {
        this.#unwatchPixelRatio();
        this.#pixelRatioQuery = matchMedia(
            `(resolution: ${window.devicePixelRatio || 1}dppx)`,
        );
        this.#pixelRatioQuery.addEventListener(
            "change",
            this.#onPixelRatioChange,
        );
    }

    #unwatchPixelRatio() {
        this.#pixelRatioQuery?.removeEventListener(
            "change",
            this.#onPixelRatioChange,
        );
        this.#pixelRatioQuery = null;
    }

    #onPixelRatioChange = () => {
        this.#watchPixelRatio();
        this.update();
    };

    // called by the renderers on pointerdown over a drag control
    // @param String type  start | end | time
    #startDrag = (ev, graph, type) => {
        // primary mouse button, touch contact or pen tip only
        if (ev.button !== 0 || !graph.selection) return;

        if (this.#drag) {
            // one drag at a time: ignore other fingers/pointers
            if (ev.pointerId !== this.#drag.pointerId) return;

            // a new press from the dragging pointer means its release was missed
            this.#endDrag(true);
        }

        // route this pointer's events to the host until it's released, even when
        // it leaves the element or the window, and across re-renders (switching
        // renderer replaces the graph elements)
        this.setPointerCapture(ev.pointerId);

        this.#drag = { graph, type, pointerId: ev.pointerId, changed: false };
        graph.selection.dragging = type;
        this.#setDragState(true);

        this.addEventListener("pointermove", this.#onPointerMove);
        this.addEventListener("pointerup", this.#onPointerEnd);
        this.addEventListener("pointercancel", this.#onPointerEnd);
        this.addEventListener("lostpointercapture", this.#onPointerEnd);
        this.update();
    };

    #onPointerMove = (ev) => {
        const drag = this.#drag;
        if (ev.pointerId !== drag?.pointerId) return;

        const m = getGraphMetrics(this.#width, drag.graph);
        if (m.graphWidth <= 0) return;

        // every graph spans the full width of the stack, so they share its left edge
        const left = this.#vnode.elm.getBoundingClientRect().left;
        const pos = clamp(
            (ev.clientX - left - m.leftMargin) / m.graphWidth,
            0,
            1,
        );

        if (!applyDrag(drag.graph, drag.type, pos)) return;

        drag.changed = true;
        this.#emit("input", drag.graph);
        this.update();
    };

    // pointerup, pointercancel (e.g. the browser took over a touch to scroll), or
    // lostpointercapture (capture was released some other way)
    #onPointerEnd = (ev) => {
        if (ev.pointerId === this.#drag?.pointerId) this.#endDrag(true);
    };

    #endDrag(emitChange) {
        const drag = this.#drag;
        if (!drag) return;

        this.#drag = null;
        this.removeEventListener("pointermove", this.#onPointerMove);
        this.removeEventListener("pointerup", this.#onPointerEnd);
        this.removeEventListener("pointercancel", this.#onPointerEnd);
        this.removeEventListener("lostpointercapture", this.#onPointerEnd);

        if (this.hasPointerCapture(drag.pointerId))
            this.releasePointerCapture(drag.pointerId);

        drag.graph.selection.dragging = undefined;
        this.#setDragState(false);

        if (emitChange && drag.changed) this.#emit("change", drag.graph);

        this.update();
    }

    // toggle the :state(dragging) custom state, which drives the drag cursor
    #setDragState(dragging) {
        try {
            this.#internals.states[dragging ? "add" : "delete"]("dragging");
        } catch {
            // CustomStateSet unsupported (or a pre-standard version): no drag cursor
        }
    }

    #emit(type, graph) {
        this.dispatchEvent(
            new CustomEvent(type, {
                bubbles: true,
                detail: {
                    graph,
                    graphIndex: this.#graphs.indexOf(graph),
                    selection: graph.selection,
                },
            }),
        );
    }
}

if (!customElements.get(TAG_NAME))
    customElements.define(TAG_NAME, SnabbdomTimeline);

export default SnabbdomTimeline;
