// geometry + data helpers shared by the svg and canvas renderers
import findPosOnScale from './find-position-on-scale.js'


export const DOT_WIDTH = 4
export const PIXELS_PER_TICK = 6
export const SELECTION_COLOR = 'rgb(255,64,129)'
export const UNSELECTED_FILL = 'rgba(205,205,205,0.85)'
export const LABEL_COLOR = 'rgba(0,0,0,0.7)'
export const AXIS_COLOR = '#888'


// width (in css px) of a line that renders as 1 device pixel
export function hairline (pixelRatio) {
    return 1 / pixelRatio
}


export function getTimePeriodData (graph) {
    const { start, end } = graph.timeRange
    return graph.data.filter((point) => point.t >= start && point.t <= end)
}


export function getGraphMetrics (width, graph) {
    const leftMargin = 10
    const rightMargin = 10
    let bottomMargin = graph.renderTicks ? 20 : 0

    if (graph.renderValueLabel && graph.selection?.type === 'value')
        bottomMargin += 30

    const graphHeight = graph.height - bottomMargin
    const graphWidth = Math.max(0, width - leftMargin - rightMargin)

    return { leftMargin, rightMargin, bottomMargin, graphHeight, graphWidth }
}


// convert a time value into an x coordinate within the graph area
export function timeToX (graph, m, t) {
    return m.leftMargin + findPosOnScale(graph.timeRange.start, graph.timeRange.end, t) * m.graphWidth
}


// position of a data point (top left corner of its dot)
export function dataPointPosition (graph, m, point) {
    const x = findPosOnScale(graph.timeRange.start, graph.timeRange.end, point.t) * (m.graphWidth - DOT_WIDTH) + m.leftMargin
    const yLength = graph.yRange.end - graph.yRange.start
    const y = (1 - (point.value / yLength)) * (m.graphHeight - DOT_WIDTH)
    return { x, y }
}


// x positions of vertical grid lines. kind is 'minor' | 'major'
export function getVerticalGridLines (graph, m, kind) {
    const vertical = graph.gridLines?.vertical
    if (!vertical)
        return [ ]

    const spacing = PIXELS_PER_TICK * (kind === 'minor' ? vertical.ticksPerMinor : vertical.ticksPerMajor)
    if (!(spacing > 0))
        return [ ]

    const xs = [ ]
    for (let i = 0; i < m.graphWidth; i += spacing)
        xs.push(m.leftMargin + i)

    return xs
}


// y positions of horizontal grid lines
export function getHorizontalGridLines (graph, m) {
    const horizontal = graph.gridLines?.horizontal
    if (!horizontal || !(horizontal.lineCount > 0))
        return [ ]

    const distanceBetweenLines = m.graphHeight / (horizontal.lineCount + 1)
    const ys = [ ]
    for (let i = 1; i <= horizontal.lineCount; i++)
        ys.push(i * distanceBetweenLines)

    return ys
}


// tick marks along the bottom axis; every 10th tick is a tall one
export function getTickMarks (m) {
    const ticks = [ ]
    for (let i = 0; i < m.graphWidth; i += PIXELS_PER_TICK)
        ticks.push({ x: m.leftMargin + i, height: (i % (PIXELS_PER_TICK * 10) === 0) ? 8 : 4 })

    return ticks
}


// time labels drawn under every 10th tick, skipping consecutive duplicates
export function getTickLabels (graph, m) {
    const labels = [ ]
    if (m.graphWidth <= 0)
        return labels

    const timePeriod = graph.timeRange.end - graph.timeRange.start
    const secondsPerTick = timePeriod / (m.graphWidth / PIXELS_PER_TICK)
    let lastSeconds

    for (let i = 0; i < m.graphWidth; i += PIXELS_PER_TICK * 10) {
        const seconds = (graph.timeRange.start + (i / PIXELS_PER_TICK) * secondsPerTick).toFixed(1)
        if (seconds !== lastSeconds) {
            labels.push({ x: m.leftMargin + i, seconds })
            lastSeconds = seconds
        }
    }

    return labels
}


// text for the value-selection time label, or undefined when it shouldn't render
export function getValueLabel (graph) {
    if (!graph.renderValueLabel || graph.selection?.type !== 'value')
        return

    const t = graph.selection.time === Infinity ? graph.timeRange.end : graph.selection.time
    return `t: ${t.toFixed(1)}s`
}
