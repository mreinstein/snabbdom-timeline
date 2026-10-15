# changelog

## 0.9.1
* bugfix: make deps listed as optional required, because they are


## 0.9.0
* BREAKING: the component is now a `<snabbdom-timeline>` custom element instead of a `(model, update) => vnode` snabby function
  * graph configs/data are passed via the `graphs` property, and the renderer via the `renderer` attribute/property
  * call `element.update()` after mutating graph data; renders are batched per animation frame
  * width is measured automatically (ResizeObserver); `model.container`, `model.width` are gone
  * `model.border` is gone; style the element with css instead
  * dragging selection controls dispatches `input` (while dragging) and `change` (on release) events
  * `selection.dragging` is `'time'` (was `true` in the svg renderer) while dragging a value selection
* feature: drag selection controls with touch and pen (pointer events + pointer capture instead of mouse events)
  * graphs set `touch-action: pan-y pinch-zoom` so vertical swipes still scroll the page
  * while dragging, the element matches `:state(dragging)` and shows an `ew-resize` cursor
* feature: the canvas renderer is sharp on high-dpi screens
  * the canvas drawing buffer matches the screen's pixel density (`devicePixelRatio`), and lines/edges snap to whole device pixels
  * re-renders automatically when the pixel ratio changes (window moved to another monitor, browser zoom); svg hairlines follow too
  * note: at 2x the canvas has 4x as many pixels to draw
* use npm and esm.sh modules instead of skypack/jsdelivr urls
* drop the snabby, hyperx and lodash.throttle dependencies; render with snabbdom directly
* canvas renderer: draw on the first render and after resizes (previously blank until the next update)
* canvas renderer: no longer writes `ctx`/`key` properties onto graph objects
* canvas renderer: minor vertical grid lines are a single device pixel wide, matching the svg renderer
* svg renderer: draw line plots as a single path instead of one element per segment
* svg renderer: remove duplicate `id="title"` attributes when rendering multiple graphs
* don't render the text "undefined" when a graph has no `label`
* `selection` is now truly optional on a graph
* build steps are stupid, remove the build step!


## 0.8.0
* update snabby dependency
* remove unneeded rollup modules


## 0.7.0
* when time selection is all the way to the right, store the `selection.time` value as Infinity


## 0.6.0
* feature: provide a canvas based renderer (fixes #13)
* feature: optionally render fill area under line plot (fixes #11)
* bugfix: fix error occurring when optional gridlines field is missing from model
* bugfix: prevent start and end time range sliders from overlapping (fixes #3)


## 0.5.0
* improve rendering and dragging performance. fixes #9
* make drag handles easier to use. fixes #5


## 0.4.0

* add line plot graph type


## 0.3.1

* tweak readme


## 0.3.0

* update to snabby v2
* require node v12.17+
* enforce build before npm publish


## 0.2.0

* reduce npm package size by specifying `package.json` `file` field
* clarify both npm and pure es module import use cases
* add changelog
* update `snabby` dep to `1.2`
* update `rollup` dep


## 0.1.0

* initial npm version
