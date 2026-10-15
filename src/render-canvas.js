// canvas renderer. the vdom is just one <canvas> per graph; drawing happens in
// snabbdom hooks so it always runs after the canvas width/height attributes
// have been applied (changing those clears the canvas).
//
// the canvas' drawing buffer is sized in device pixels (css size × devicePixelRatio)
// so it stays sharp on high-dpi screens. drawing code works in css px: the
// context is scaled to match, and lines/edges are snapped to whole device pixels.
import { h } from 'snabbdom'
import {
    DOT_WIDTH,
    SELECTION_COLOR,
    UNSELECTED_FILL,
    dataPointPosition,
    getGraphMetrics,
    getHorizontalGridLines,
    getTickLabels,
    getTickMarks,
    getTimePeriodData,
    getValueLabel,
    getVerticalGridLines,
    timeToX,
} from './graph-utils.js'


const DOWN_HANDLE_PATH = [ [ -5, -4 ], [ 0, -8 ], [ 10, 0 ], [ 0, 8 ] ]
const UP_HANDLE_PATH = [ [ 5, 4 ], [ 0, 8 ], [ -10, 0 ], [ 0, -8 ] ]


// stroke settings for a line cssWidth wide that covers whole device pixels.
// scale is device pixels per css px along the line's thickness.
function crispLine (scale, cssWidth) {
    const w = cssWidth * scale

    // widths under 1 device pixel are kept as-is (they draw lighter)
    const deviceWidth = (w < 1 - 1e-6) ? w : Math.round(w)

    // odd widths need their centre on a pixel centre, even ones on a pixel edge
    const odd = deviceWidth < 1 || deviceWidth % 2 === 1

    return {
        width: deviceWidth / scale,
        // snapped centre for a line meant to be centred at v (css px)
        at: (v) => (odd ? Math.floor(v * scale) + 0.5 : Math.round(v * scale)) / scale,
    }
}


// helpers for snapping css px coordinates to the device pixel grid.
// sx/sy: device pixels per css px horizontally/vertically
function pixelGrid (sx, sy) {
    return {
        sx,
        sy,
        // nearest device pixel edge
        x: (v) => Math.round(v * sx) / sx,
        y: (v) => Math.round(v * sy) / sy,
        // vertical lines (thickness measured along x) and horizontal lines
        vline: (cssWidth) => crispLine(sx, cssWidth),
        hline: (cssWidth) => crispLine(sy, cssWidth),
    }
}


function drawVerticalGridLines (ctx, px, graph, m, kind) {
    const xs = getVerticalGridLines(graph, m, kind)
    if (!xs.length)
        return

    const vertical = graph.gridLines.vertical
    const line = px.vline(1 / px.sx)  // a single device pixel, like the svg renderer
    ctx.lineWidth = line.width
    ctx.strokeStyle = kind === 'minor' ? vertical.minorColor : vertical.majorColor

    const y1 = px.y(m.graphHeight)
    ctx.beginPath()
    for (const x of xs) {
        const cx = line.at(x + 0.5)
        ctx.moveTo(cx, 0)
        ctx.lineTo(cx, y1)
    }
    ctx.stroke()
}


function drawHorizontalGridLines (ctx, px, graph, m) {
    const ys = getHorizontalGridLines(graph, m)
    if (!ys.length)
        return

    const line = px.hline(0.5)
    ctx.lineWidth = line.width
    ctx.strokeStyle = graph.gridLines.horizontal.color
    ctx.setLineDash([ 4, 2 ])

    const x0 = px.x(m.leftMargin)
    const x1 = px.x(m.leftMargin + m.graphWidth)
    ctx.beginPath()
    for (const y of ys) {
        const cy = line.at(y + 0.5)
        ctx.moveTo(x0, cy)
        ctx.lineTo(x1, cy)
    }
    ctx.stroke()

    ctx.setLineDash([ ])
}


function drawAxis (ctx, px, graph, m, colors) {
    const axis = px.hline(1)
    const y = axis.at(m.graphHeight - 0.5)

    ctx.beginPath()
    ctx.strokeStyle = colors.axis
    ctx.lineWidth = axis.width
    ctx.moveTo(px.x(m.leftMargin), y)
    ctx.lineTo(px.x(m.leftMargin + m.graphWidth), y)
    ctx.stroke()

    if (!graph.renderTicks)
        return

    const tick = px.vline(1)
    ctx.lineWidth = tick.width
    ctx.beginPath()
    for (const { x, height } of getTickMarks(m)) {
        const cx = tick.at(x + 0.5)
        ctx.moveTo(cx, px.y(m.graphHeight))
        ctx.lineTo(cx, px.y(m.graphHeight + height))
    }
    ctx.stroke()

    ctx.font = '10px monospace'
    ctx.textAlign = 'center'
    for (const label of getTickLabels(graph, m))
        ctx.strokeText(label.seconds, label.x, m.graphHeight + 19)
}


function drawLinePlot (ctx, px, graph, m) {
    // snap points so horizontal/vertical runs of the line stay crisp
    const lx = px.vline(1)
    const ly = px.hline(1)
    const points = getTimePeriodData(graph).map((point) => {
        const { x, y } = dataPointPosition(graph, m, point)
        return { x: lx.at(x + 0.5), y: ly.at(y + 0.5) }
    })

    if (!points.length)
        return

    if (graph.linePlotAreaColor) {
        const region = new Path2D()
        region.moveTo(points[0].x, m.graphHeight)
        for (const { x, y } of points)
            region.lineTo(x, y)
        region.lineTo(points[points.length - 1].x, m.graphHeight)
        region.closePath()

        ctx.fillStyle = graph.linePlotAreaColor
        ctx.fill(region)
    }

    ctx.beginPath()
    ctx.strokeStyle = graph.dataColor
    ctx.lineWidth = lx.width
    for (let i = 1; i < points.length; i++) {
        ctx.moveTo(points[i - 1].x, points[i - 1].y)
        ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.stroke()
}


function drawScatterPlot (ctx, px, graph, m) {
    // constant whole-device-pixel dot size, so every dot looks the same
    const w = Math.max(1, Math.round(DOT_WIDTH * px.sx)) / px.sx
    const h = Math.max(1, Math.round(DOT_WIDTH * px.sy)) / px.sy

    ctx.fillStyle = graph.dataColor
    for (const point of getTimePeriodData(graph)) {
        const { x, y } = dataPointPosition(graph, m, point)
        ctx.fillRect(px.x(x), px.y(y), w, h)
    }
}


function drawDragHandle (ctx, startX, startY, path) {
    const region = new Path2D()
    let x = startX
    let y = startY

    region.moveTo(x, y)
    for (const [ dx, dy ] of path) {
        x += dx
        y += dy
        region.lineTo(x, y)
    }
    region.closePath()

    ctx.fillStyle = SELECTION_COLOR
    ctx.fill(region)
}


function drawRangeSelection (ctx, px, graph, m) {
    const startX = px.x(timeToX(graph, m, graph.selection.start))
    const endX = px.x(timeToX(graph, m, graph.selection.end))
    const left = px.x(m.leftMargin)
    const right = px.x(m.leftMargin + m.graphWidth)
    const bottom = px.y(m.graphHeight)

    // greyed out (unselected) regions
    ctx.fillStyle = UNSELECTED_FILL
    ctx.fillRect(left, 0, startX - left, bottom)
    ctx.fillRect(endX, 0, right - endX, bottom)

    drawDragHandle(ctx, startX, 12, DOWN_HANDLE_PATH)
    drawDragHandle(ctx, endX, 12, DOWN_HANDLE_PATH)

    const line = px.vline(1)
    const top = px.y(11)
    const lineBottom = px.y(m.graphHeight + 1)
    ctx.strokeStyle = SELECTION_COLOR
    ctx.lineWidth = line.width
    ctx.beginPath()
    for (const x of [ startX, endX ]) {
        const cx = line.at(x - 0.5)
        ctx.moveTo(cx, top)
        ctx.lineTo(cx, lineBottom)
    }
    ctx.stroke()
}


function drawValueSelection (ctx, px, graph, m) {
    const x = px.x(timeToX(graph, m, graph.selection.time))

    drawDragHandle(ctx, x, m.graphHeight - 1, UP_HANDLE_PATH)

    const line = px.vline(1)
    const cx = line.at(x - 0.5)
    ctx.strokeStyle = SELECTION_COLOR
    ctx.lineWidth = line.width
    ctx.beginPath()
    ctx.moveTo(cx, 0)
    ctx.lineTo(cx, px.y(m.graphHeight))
    ctx.stroke()
}


function drawLabels (ctx, graph, m, colors) {
    ctx.fillStyle = colors.label

    const valueLabel = getValueLabel(graph)
    if (valueLabel) {
        ctx.textAlign = 'start'
        ctx.fillText(valueLabel, 2, m.graphHeight + m.bottomMargin - 8)
    }

    if (graph.label != null) {
        ctx.textAlign = 'end'
        ctx.fillText(String(graph.label), m.graphWidth + m.leftMargin - DOT_WIDTH, 12)
    }
}


function drawGraph (canvas, width, graph, colors) {
    const ctx = canvas.getContext('2d')

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!(width > 0 && graph.height > 0 && canvas.width > 0 && canvas.height > 0))
        return

    // the buffer size was rounded to whole device pixels, so derive the scale
    // from it (per axis) rather than using devicePixelRatio directly
    const px = pixelGrid(canvas.width / width, canvas.height / graph.height)
    ctx.setTransform(px.sx, 0, 0, px.sy, 0, 0)

    const m = getGraphMetrics(width, graph)

    drawVerticalGridLines(ctx, px, graph, m, 'minor')
    drawVerticalGridLines(ctx, px, graph, m, 'major')
    drawHorizontalGridLines(ctx, px, graph, m)
    drawAxis(ctx, px, graph, m, colors)

    if (graph.type === 'scatterPlot')
        drawScatterPlot(ctx, px, graph, m)
    else
        drawLinePlot(ctx, px, graph, m)

    if (graph.selection?.type === 'range')
        drawRangeSelection(ctx, px, graph, m)
    else if (graph.selection?.type === 'value')
        drawValueSelection(ctx, px, graph, m)

    drawLabels(ctx, graph, m, colors)
}


// figure out which drag control (if any) a pointerdown landed on.
// offsetY includes the canvas' 10px top padding.
function hitTest (ev, width, graph) {
    const selection = graph.selection
    const m = getGraphMetrics(width, graph)

    if (selection?.type === 'range' && ev.offsetY <= 21) {
        const startX = timeToX(graph, m, selection.start)
        const endX = timeToX(graph, m, selection.end)
        const startDistance = Math.abs(ev.offsetX - startX)
        const endDistance = Math.abs(ev.offsetX - endX)

        if (startDistance >= 10 && endDistance >= 10)
            return

        if (startDistance !== endDistance)
            return startDistance < endDistance ? 'start' : 'end'

        // handles overlap: grab the one that has room to move
        return (startX > m.leftMargin + m.graphWidth / 2) ? 'start' : 'end'
    }

    if (selection?.type === 'value' && ev.offsetY >= m.graphHeight + 10)
        return 'time'
}


function graphComponent (width, pixelRatio, graph, startDrag, colors) {
    const draw = (vnode) => drawGraph(vnode.elm, width, graph, colors)

    return h('canvas.graph', {
        // drawing buffer in device pixels, displayed at the css size
        attrs: {
            width: Math.round(width * pixelRatio),
            height: Math.round(graph.height * pixelRatio),
        },
        style: { width: `${width}px`, height: `${graph.height}px` },
        on: {
            pointerdown: (ev) => {
                const type = hitTest(ev, width, graph)
                if (type)
                    startDrag(ev, graph, type)
            },
        },
        hook: {
            create: (_, vnode) => draw(vnode),
            postpatch: (_, vnode) => draw(vnode),
        },
    })
}


export default function renderCanvas ({ width, pixelRatio, graphs, startDrag, colors }) {
    return h('div.graph-stack', graphs.map((graph) => graphComponent(width, pixelRatio, graph, startDrag, colors)))
}
