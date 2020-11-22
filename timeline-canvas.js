import clamp          from 'https://cdn.jsdelivr.net/gh/mreinstein/math-gap/src/clamp.js'
import findPosOnScale from './find-position-on-scale.js'
import html           from 'https://cdn.jsdelivr.net/npm/snabby@2/snabby.js'
import lerp           from 'https://cdn.jsdelivr.net/gh/mreinstein/math-gap/src/lerp.js'
import throttle       from 'https://cdn.skypack.dev/lodash.throttle'


const DOT_WIDTH = 4
const FPS = 60


function getTimePeriodData (graph) {
    return graph.data.filter((dataPoint) => {
        // if data is outside of the time range skip it
        if (dataPoint.t < graph.timeRange.start)
            return false

        if (dataPoint.t > graph.timeRange.end)
            return false

        return true
    })
}


function getGraphMetrics (model, graph) {
    let leftMargin = 10
    const rightMargin = 10
    let bottomMargin = graph.renderTicks ? 20 : 0

    if (graph.renderValueLabel && graph.selection.type === 'value')
        bottomMargin += 30

    const graphHeight = graph.height - bottomMargin
    const graphWidth = model.width - leftMargin - rightMargin

    return {
        leftMargin, rightMargin, bottomMargin, graphHeight, graphWidth
    }
}


function verticalGridLinesMinor (model, graph, update) {
    if (!graph.gridLines || !graph.gridLines.vertical)
        return

    const m = getGraphMetrics(model, graph)

    const gridLines = [ ]
    const pixelsPerTick = 6
    const pixelsPerMinorLine = pixelsPerTick * graph.gridLines.vertical.ticksPerMinor

    const strokeWidth = 1 / (window.devicePixelRatio || 1)
    const { ctx } = graph

    ctx.lineWidth = 1 //strokeWidth
    ctx.strokeStyle = graph.gridLines.vertical.minorColor

    ctx.beginPath()

    for (let i=0; i < m.graphWidth; i += pixelsPerMinorLine) {
        const x = m.leftMargin + i + 0.5
        ctx.moveTo(x, 0)
        ctx.lineTo(x, m.graphHeight)
    }

    ctx.stroke()
}


function verticalGridLinesMajor (model, graph, update) {
    if (!graph.gridLines || !graph.gridLines.vertical)
        return

    const m = getGraphMetrics(model, graph)

    const pixelsPerTick = 6
    const pixelsPerMajorLine = pixelsPerTick * graph.gridLines.vertical.ticksPerMajor

    const { ctx } = graph

    const strokeWidth = 1 / (window.devicePixelRatio || 1)
    ctx.lineWidth = strokeWidth
    ctx.strokeStyle = graph.gridLines.vertical.majorColor

    ctx.beginPath()

    for (let i=0; i < m.graphWidth; i += pixelsPerMajorLine) {
        const x = m.leftMargin + i + 0.5
        ctx.moveTo(x, 0)
        ctx.lineTo(x, m.graphHeight)
    }

    ctx.stroke()
}


function gridLines (model, graph, update) {
    if (!graph.gridLines || !graph.gridLines.horizontal)
        return

    const m = getGraphMetrics(model, graph)

    const { ctx } = graph

    const strokeWidth = 1 / (window.devicePixelRatio || 1)
    ctx.lineWidth = 0.5 //strokeWidth
    ctx.strokeStyle = graph.gridLines.horizontal.color

    ctx.beginPath()

    ctx.setLineDash([4, 2])

    const distanceBetweenLines = m.graphHeight / (graph.gridLines.horizontal.lineCount + 1)
    for (let y=distanceBetweenLines; y < m.graphHeight; y += distanceBetweenLines) {
        ctx.moveTo(m.leftMargin + 0.5, y + 0.5)
        ctx.lineTo(m.leftMargin + m.graphWidth + 0.5, y + 0.5)
    }

    ctx.stroke()
    ctx.setLineDash([])
}


function renderLinePlotGraph (model, graph, dotWidth) {
    const tp = getTimePeriodData(graph)
    const m = getGraphMetrics(model, graph)

    const { ctx } = graph
    let lastX, lastY

    if (graph.linePlotAreaColor) {
        const region = new Path2D()

        for (let i=0; i < tp.length; i++) {
            const point = tp[i]

            const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, point.t)
            const x = Math.round(startX * (m.graphWidth - dotWidth) + m.leftMargin) + 0.5

            const yLength = graph.yRange.end - graph.yRange.start
            const y = Math.round((1 - (point.value / yLength)) * (m.graphHeight - dotWidth)) + 0.5

            if (i === 0)
                region.moveTo(x, m.graphHeight)

            region.lineTo(x, y)
            lastX = x
        }

        region.lineTo(lastX, m.graphHeight)

        region.closePath()
        ctx.fillStyle = graph.linePlotAreaColor
        ctx.fill(region)
    }

    ctx.beginPath()
    ctx.strokeStyle = graph.dataColor
    ctx.lineWidth = 1

    for (let i=0; i < tp.length; i++) {
        const point = tp[i]

        const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, point.t)
        const x = Math.round(startX * (m.graphWidth - dotWidth) + m.leftMargin) + 0.5

        const yLength = graph.yRange.end - graph.yRange.start
        const y = Math.round((1 - (point.value / yLength)) * (m.graphHeight - dotWidth)) + 0.5

        if (i > 0) {
            ctx.moveTo(lastX, lastY)
            ctx.lineTo(x, y)
        }

        lastX = x
        lastY = y
    }

    ctx.stroke()
}


function renderScatterPlotGraph (model, graph, dotWidth) {
    const tp = getTimePeriodData(graph)
    const m = getGraphMetrics(model, graph)

    const { ctx } = graph

    ctx.fillStyle = graph.dataColor

    return tp.map((point) => {
        const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, point.t)
        const x = startX * (m.graphWidth - dotWidth) + m.leftMargin

        const yLength = graph.yRange.end - graph.yRange.start
        const y = (1 - (point.value / yLength)) * (m.graphHeight - dotWidth)

        ctx.fillRect(Math.round(x), Math.round(y), dotWidth, dotWidth)
    })
}


function graphComponent (model, graph, update) {

    const dotWidth = 4
    const m = getGraphMetrics(model, graph)

    // TODO: change mouse cursor to ew-resize when hovering over a drag handle

    const _mouseMove = throttle(function (ev) {
        const rect = model.elm.getBoundingClientRect()
        const x = clamp(ev.clientX - rect.left, 0, model.elm.clientWidth) //x position within the element.

        if (graph.selection.dragging === 'time') {
            const pos = clamp((x - m.leftMargin) / m.graphWidth, 0, 1)
            graph.selection.time = lerp(graph.timeRange.start, graph.timeRange.end, pos)

        } else if (graph.selection.dragging === 'start') {
            const pos = clamp((x - m.leftMargin) / m.graphWidth, 0, 1)

            graph.selection.start = lerp(graph.timeRange.start, graph.timeRange.end, pos)

            // prevent dragging the start control beyond end
            if (graph.selection.start > graph.selection.end)
                graph.selection.start = graph.selection.end

        } else if (graph.selection.dragging === 'end') {
            const pos = clamp((x - m.leftMargin) / m.graphWidth, 0, 1)

            graph.selection.end = (pos === 1) ? Infinity : lerp(graph.timeRange.start, graph.timeRange.end, pos)

            // prevent dragging the end control beyond start
            if (graph.selection.end < graph.selection.start)
                graph.selection.end = graph.selection.start
        }

        update()
    }, 1000 / FPS)

    const _mouseUp = function (ev) {
        graph.selection.dragging = undefined
        document.removeEventListener('mouseup', _mouseUp)
        document.removeEventListener('mousemove', _mouseMove)
        update()
    }

    const _mouseDown = function (ev) {

        let draggingType  // start | end  | time | undefined

        if (graph.selection?.type === 'range' && ev.offsetY <= 21) {
            // check to see if the offsetX is within the bounds of the start or end drag controls
            const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.start)
            const endX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.end)

            const x = startX * (m.graphWidth - dotWidth) + m.leftMargin
            const x2 = endX * (m.graphWidth - dotWidth) + m.leftMargin

            if (Math.abs(ev.offsetX - x) < 10) {
                draggingType = 'start'
            } else if (Math.abs(ev.offsetX - x2) < 10) {
                draggingType = 'end'
            }
        } else if (graph.selection?.type === 'value') {
            const m = getGraphMetrics(model, graph)
            if (ev.offsetY >= m.graphHeight + 10)
                draggingType = 'time'
        }

        graph.selection.dragging = draggingType

        if (draggingType) {
            document.addEventListener('mousemove', _mouseMove, { passive: true })
            document.addEventListener('mouseup', _mouseUp)
            update()
        }
    };

    const _insertHook = function (vnode) {
        model.elm = vnode.elm
        graph.ctx = vnode.elm.getContext('2d')
    }

    if (graph.ctx) {
        graph.ctx.clearRect(0, 0, model.elm.width, model.elm.height)
        verticalGridLinesMinor(model, graph, update)
        verticalGridLinesMajor(model, graph, update)
        gridLines(model, graph, update)


        // draw the bottom line of the graph
        graph.ctx.beginPath()
        graph.ctx.strokeStyle = '#888'
        graph.ctx.lineWidth = 1
        graph.ctx.moveTo(m.leftMargin + 0.5, m.graphHeight - 0.5)
        graph.ctx.lineTo(m.leftMargin + m.graphWidth + 0.5, m.graphHeight - 0.5)
        graph.ctx.stroke()


        if (graph.renderTicks) {
            tickMarksComponent(model, graph, update)
            tickLabelsComponent(model, graph, update)
        }

        graph.ctx.strokeStyle = graph.dataColor
        if (graph.type === 'scatterPlot')
            renderScatterPlotGraph(model, graph, dotWidth)
        else
            renderLinePlotGraph(model, graph, dotWidth)
        timeSelectionComponent(model, graph, update)
        renderLabelComponent(model, graph, update)
    }

    if (!graph.key)
        graph.key = 'u' + Math.floor(Math.random() * 9999999)

    return html`<canvas width="${model.width}"
                        height="${graph.height}"
                        @hook:insert=${_insertHook}
                        @key=${graph.key}
                        style="height: ${graph.height}px; width: 100%; padding-top: 10px; background-color: white; image-rendering: pixelated"
                        @style:cursor=${graph.selection.dragging ? 'ew-resize' : 'inherit' }
                        @on:mousedown=${_mouseDown}></canvas>`
}


function renderLabelComponent (model, graph, update) {
    const { ctx } = graph
    const m = getGraphMetrics(model, graph)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'

    if (graph.renderValueLabel && graph.selection.type === 'value') {
        ctx.textAlign = 'start'
        ctx.fillText(`t: ${graph.selection.time.toFixed(1)}s`, 2, m.graphHeight + m.bottomMargin - 8)
    }

    ctx.textAlign = 'end'
    ctx.fillText(graph.label, m.graphWidth + m.leftMargin - DOT_WIDTH, 12)
}


function tickMarksComponent (model, graph, update) {

    const m = getGraphMetrics(model, graph)

    const { ctx } = graph

    const constPixelsPerTick = 6

    ctx.lineWidth = 1
    ctx.strokeStyle = '#888'

    ctx.beginPath()

    for (let i=0; i < m.graphWidth; i += constPixelsPerTick) {
        const tickHeight = (i % 60 === 0) ? 8 : 4
        const x = m.leftMargin + i + 0.5
        const height = tickHeight
        ctx.moveTo(x, m.graphHeight)
        ctx.lineTo(x, m.graphHeight + tickHeight)
    }

    ctx.stroke()
}


function tickLabelsComponent (model, graph, update) {
    const m = getGraphMetrics(model, graph)

    const timePeriod = (graph.timeRange.end - graph.timeRange.start)

    const { ctx } = graph

    const constPixelsPerTick = 6

    ctx.font = '10px monospace'
    ctx.textAlign = 'center'
    //ctx.fillStyle = '#888'
    ctx.strokeStyle = '#888'
    //ctx.strokeWidth = 1

    const tickCount = m.graphWidth / constPixelsPerTick
    const secondsPerTick = timePeriod / tickCount
    let lastSecond

    // every 10 ticks, draw the seconds
    for (let i=0; i < m.graphWidth; i += 60) {
        const tickIdx = i / constPixelsPerTick
        const seconds = (graph.timeRange.start + tickIdx * secondsPerTick).toFixed(1)
        if (lastSecond !== seconds) {
            lastSecond = seconds
            ctx.strokeText(seconds, m.leftMargin + i, m.graphHeight + 19)
        }
    }
}


function timeSelectionComponent (model, graph, update) {
    if (graph.selection.type === 'range')
        timeRangeSelectionComponent(model, graph, update)

    if (graph.selection.type === 'value')
        timeValueSelectionComponent(model, graph, update)
}


function timeRangeSelectionComponent (model, graph, update) {
    const m = getGraphMetrics(model, graph)
    const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.start)
    const endX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.end)

    const { ctx } = graph

    // draw left and right greyed out graph areas (unselected regions)
    ctx.fillStyle = 'rgba(205,205,205, 0.85)'
    ctx.fillRect(m.leftMargin,
                 0,
                 startX * m.graphWidth,
                 m.graphHeight)


    ctx.fillRect(m.leftMargin + (endX * m.graphWidth),
                 0,
                 m.graphWidth - (m.graphWidth*endX),
                 m.graphHeight)

    const downHandlePath = [
        [ -5, -4],
        [  0, -8],
        [ 10,  0],
        [  0,  8]
    ]

    // left drag handle
    renderDragHandle(ctx, m.leftMargin + startX * m.graphWidth, 12, downHandlePath)

    // right drag handle
    renderDragHandle(ctx,m.leftMargin + (endX * m.graphWidth), 12, downHandlePath)

    ctx.strokeStyle = 'rgb(255,64,129)'
    ctx.lineWidth = 1
    ctx.beginPath()
    // left drag line
    ctx.moveTo(m.leftMargin + startX * m.graphWidth - 0.5, 11)
    ctx.lineTo(m.leftMargin + startX * m.graphWidth - 0.5, m.graphHeight+1)

    // right drag line
    ctx.moveTo(m.leftMargin + (endX * m.graphWidth) - 0.5, 11)
    ctx.lineTo(m.leftMargin + (endX * m.graphWidth) - 0.5, m.graphHeight+1)

    ctx.stroke()
}


function renderDragHandle (ctx, startX, startY, path) {
    const region = new Path2D()

    const currentPoint = [ startX, startY ]
    region.moveTo(currentPoint[0], currentPoint[1])

    for (const p of path) {
        currentPoint[0] += p[0]
        currentPoint[1] += p[1]
        region.lineTo(currentPoint[0], currentPoint[1])
    }

    region.closePath()
    ctx.fillStyle = 'rgba(255,64,129)'
    ctx.fill(region)
}


function timeValueSelectionComponent (model, graph, update) {
    const m = getGraphMetrics(model, graph)

    const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.time)

    const x = startX * m.graphWidth + m.leftMargin
    const y = m.graphHeight

    const { ctx } = graph

    const upHandlePath = [
        [  5, 4],
        [  0, 8],
        [-10, 0],
        [  0, -8]
    ]

    renderDragHandle(ctx, x, y-1, upHandlePath)

    ctx.strokeStyle = 'rgb(255,64,129)'
    ctx.lineWidth = 1
    ctx.beginPath()

    // drag line
    ctx.moveTo(x - 0.5, 0)
    ctx.lineTo(x - 0.5, m.graphHeight)
    ctx.stroke()
}


export default function timelineComponent (model, update) {
    const _insertHook = function (vnode) {
        model.container = vnode
    }

    if (model.container)
        model.width = model.container.elm ? model.container.elm.offsetWidth : model.container.offsetWidth

    return html`
        <div class="graph-stack"
             @hook:insert=${_insertHook}
             style="width: 100%; display: grid; grid-template-columns: 1fr; border: 1px solid #adafaf;">
            ${model.graphs.map((g) => graphComponent(model, g, update))}
        </div>`
}
