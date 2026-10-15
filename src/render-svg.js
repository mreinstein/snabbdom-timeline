// svg renderer. every helper returns an array of vnodes (possibly empty) because
// snabbdom's svg namespacing walks children and can't handle null entries.
import { h } from 'snabbdom'
import {
    AXIS_COLOR,
    DOT_WIDTH,
    LABEL_COLOR,
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
    hairline,
    timeToX,
} from './graph-utils.js'


function verticalGridLines (graph, m, kind, pixelRatio) {
    const xs = getVerticalGridLines(graph, m, kind)
    if (!xs.length)
        return [ ]

    const lines = xs.map((x) => h('line', { attrs: { x1: x, x2: x, y1: 0, y2: m.graphHeight } }))
    const color = kind === 'minor' ? graph.gridLines.vertical.minorColor : graph.gridLines.vertical.majorColor

    return [ h(`g.grid-${kind}`, { style: { stroke: color, strokeWidth: hairline(pixelRatio) } }, lines) ]
}


function horizontalGridLines (graph, m, pixelRatio) {
    const ys = getHorizontalGridLines(graph, m)
    if (!ys.length)
        return [ ]

    const x1 = m.leftMargin
    const x2 = m.leftMargin + m.graphWidth
    const lines = ys.map((y) => h('line', { attrs: { x1, x2, y1: y, y2: y } }))

    return [
        h('g.grid-horiz', {
            attrs: { 'stroke-dasharray': '4 2' },
            style: { stroke: graph.gridLines.horizontal.color, strokeWidth: hairline(pixelRatio) },
        }, lines)
    ]
}


function axis (graph, m) {
    const children = [
        h('line', { attrs: { x1: m.leftMargin, x2: m.leftMargin + m.graphWidth, y1: m.graphHeight, y2: m.graphHeight } })
    ]

    if (graph.renderTicks) {
        for (const tick of getTickMarks(m))
            children.push(h('line', { attrs: { x1: tick.x, x2: tick.x, y1: m.graphHeight, y2: m.graphHeight + tick.height } }))

        for (const label of getTickLabels(graph, m))
            children.push(h('text', { attrs: { x: label.x, y: m.graphHeight + 19 } }, label.seconds))
    }

    return [ h('g', { style: { stroke: AXIS_COLOR, strokeDasharray: '0', strokeWidth: '1' } }, children) ]
}


function linePlot (graph, m) {
    const points = getTimePeriodData(graph).map((point) => dataPointPosition(graph, m, point))
    if (!points.length)
        return [ ]

    const line = points.map(({ x, y }, i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ')
    const result = [ ]

    if (graph.linePlotAreaColor) {
        const first = points[0]
        const last = points[points.length - 1]
        const area = `M ${first.x} ${m.graphHeight} L ${line.slice(2)} L ${last.x} ${m.graphHeight} Z`
        result.push(h('path', { attrs: { d: area, fill: graph.linePlotAreaColor, stroke: 'transparent' } }))
    }

    result.push(h('path', { attrs: { d: line, fill: 'none', 'stroke-linejoin': 'round' } }))

    return result
}


function scatterPlot (graph, m) {
    return getTimePeriodData(graph).map((point) => {
        const { x, y } = dataPointPosition(graph, m, point)
        return h('rect', { attrs: { x, y, 'data-value': point.value, width: DOT_WIDTH, height: DOT_WIDTH } })
    })
}


function rangeSelection (graph, m, startDrag) {
    const startX = timeToX(graph, m, graph.selection.start)
    const endX = timeToX(graph, m, graph.selection.end)
    const grabStart = (ev) => startDrag(ev, graph, 'start')
    const grabEnd = (ev) => startDrag(ev, graph, 'end')
    const handleStyle = { fill: SELECTION_COLOR, cursor: 'ew-resize' }

    return [
        h('g.time-selection', [
            h('rect', {
                attrs: { x: m.leftMargin, y: 0, width: startX - m.leftMargin, height: m.graphHeight },
                style: { fill: UNSELECTED_FILL },
                on: { pointerdown: grabStart },
            }),
            h('path', {
                attrs: { d: `M ${startX} 12 l -5 -4 l 0 -8 l 10 0 l 0 8 Z` },
                style: handleStyle,
                on: { pointerdown: grabStart },
            }),
            h('line', { attrs: { x1: startX, x2: startX, y1: 11, y2: m.graphHeight + 1, stroke: SELECTION_COLOR } }),

            h('rect', {
                attrs: { x: endX, y: 0, width: m.leftMargin + m.graphWidth - endX, height: m.graphHeight },
                style: { fill: UNSELECTED_FILL },
                on: { pointerdown: grabEnd },
            }),
            h('path', {
                attrs: { d: `M ${endX} 12 l -5 -4 l 0 -8 l 10 0 l 0 8 Z` },
                style: handleStyle,
                on: { pointerdown: grabEnd },
            }),
            h('line', { attrs: { x1: endX, x2: endX, y1: 11, y2: m.graphHeight + 1, stroke: SELECTION_COLOR } }),
        ])
    ]
}


function valueSelection (graph, m, startDrag) {
    const x = timeToX(graph, m, graph.selection.time)
    const y = m.graphHeight

    return [
        h('g.time-selection', { on: { pointerdown: (ev) => startDrag(ev, graph, 'time') } }, [
            h('line', { attrs: { x1: x, x2: x, y1: 0, y2: m.graphHeight, stroke: 'deeppink' } }),
            h('path', {
                attrs: { d: `M ${x} ${y - 1} l 5 4 l 0 8 l -10 0 l 0 -8 Z` },
                style: { fill: SELECTION_COLOR, cursor: 'ew-resize' },
            }),
        ])
    ]
}


function timeSelection (graph, m, startDrag) {
    const type = graph.selection?.type

    if (type === 'range')
        return rangeSelection(graph, m, startDrag)

    if (type === 'value')
        return valueSelection(graph, m, startDrag)

    return [ ]
}


function labels (graph, m) {
    const result = [ ]
    const textStyle = { fill: LABEL_COLOR, pointerEvents: 'none' }

    if (graph.label != null)
        result.push(h('text', {
            attrs: { x: m.graphWidth + m.leftMargin - DOT_WIDTH, y: 12 },
            style: { ...textStyle, textAnchor: 'end' },
        }, String(graph.label)))

    const valueLabel = getValueLabel(graph)
    if (valueLabel)
        result.push(h('text', {
            attrs: { x: 2, y: m.graphHeight + m.bottomMargin - 8 },
            style: { ...textStyle, textAnchor: 'start' },
        }, valueLabel))

    return result
}


function graphComponent (width, pixelRatio, graph, startDrag) {
    const m = getGraphMetrics(width, graph)

    // role=img + a <title> child gives each graph an accessible name
    return h('svg.graph', {
        attrs: { role: 'img', viewBox: `0 0 ${width} ${graph.height}` },
        style: { height: `${graph.height}px` },
    }, [
        h('title', graph.title == null ? '' : String(graph.title)),
        ...verticalGridLines(graph, m, 'minor', pixelRatio),
        ...verticalGridLines(graph, m, 'major', pixelRatio),
        ...horizontalGridLines(graph, m, pixelRatio),
        ...axis(graph, m),
        h('g.data', {
            style: { fill: graph.dataColor, stroke: graph.dataColor, strokeWidth: '1' },
        }, graph.type === 'scatterPlot' ? scatterPlot(graph, m) : linePlot(graph, m)),
        ...timeSelection(graph, m, startDrag),
        ...labels(graph, m),
    ])
}


export default function renderSvg ({ width, pixelRatio, graphs, startDrag }) {
    return h('div.graph-stack', graphs.map((graph) => graphComponent(width, pixelRatio, graph, startDrag)))
}
