import clamp          from 'https://cdn.jsdelivr.net/gh/mreinstein/math-gap/src/clamp.js'
import findPosOnScale from './find-position-on-scale.js'
import html           from 'https://cdn.jsdelivr.net/npm/snabby@2/snabby.js'
import lerp           from 'https://cdn.jsdelivr.net/gh/mreinstein/math-gap/src/lerp.js'
import throttle       from 'https://cdn.skypack.dev/lodash.throttle'
import { h }          from 'https://cdn.jsdelivr.net/npm/snabbdom@2.1.0/build/package/h.js'; // helper function for creating vnodes


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
    if (!graph.gridLines)
        return html``

    const m = getGraphMetrics(model, graph)
  
    const gridLines = [ ]

    if (graph.gridLines.vertical) {
        const pixelsPerTick = 6
        const pixelsPerMinorLine = pixelsPerTick * graph.gridLines.vertical.ticksPerMinor
        for (let i=0; i < m.graphWidth; i += pixelsPerMinorLine) {
            const x = m.leftMargin + i
            //gridLines.push(html`<line x1="${x}" x2="${x}" y1="0" y2="${m.graphHeight}"/>`)
            gridLines.push(h('line', { attrs: { x1: x, x2: x, y1: 0, y2: m.graphHeight } }))
        }
    }

    const strokeWidth = 1 / (window.devicePixelRatio || 1)
    return html`<g class="grid-minor" style="stroke: ${graph.gridLines.vertical.minorColor}; stroke-width: ${strokeWidth}">${gridLines}</g>`
}


function verticalGridLinesMajor (model, graph, update) {
    if (!graph.gridLines)
        return html``

    const m = getGraphMetrics(model, graph)
  
    const gridLines = [ ]

    if (graph.gridLines.vertical) {
        const pixelsPerTick = 6
        const pixelsPerMajorLine = pixelsPerTick * graph.gridLines.vertical.ticksPerMajor
        for (let i=0; i < m.graphWidth; i += pixelsPerMajorLine) {
            const x = m.leftMargin + i
            //gridLines.push(html`<line x1="${x}" x2="${x}" y1="0" y2="${m.graphHeight}"/>`)
            gridLines.push(h('line', { attrs: { x1: x, x2: x, y1: 0, y2: m.graphHeight } }))
        }
    }

    const strokeWidth = 1 / (window.devicePixelRatio || 1)
    return html`<g class="grid-major" style="stroke: ${graph.gridLines.vertical.majorColor}; stroke-width: ${strokeWidth}">${gridLines}</g>`
}


function gridLines (model, graph, update) {
    if (!graph.gridLines)
        return html``

    const m = getGraphMetrics(model, graph)
  
    const gridLines = [ ]

    if (graph.gridLines.horizontal) {
        const distanceBetweenLines = m.graphHeight / (graph.gridLines.horizontal.lineCount + 1)
        for (let y=distanceBetweenLines; y < m.graphHeight; y += distanceBetweenLines) {
            gridLines.push(html`<line x1="${m.leftMargin}" x2="${m.leftMargin + m.graphWidth}" y1="${y}" y2="${y}"/>`)
        }
    }

    const strokeWidth = 1 / (window.devicePixelRatio || 1)

    return html`<g class="grid-horiz"
                   style="stroke: ${graph.gridLines.horizontal.color}; stroke-width: ${strokeWidth}"
                   stroke-dasharray="4 2">${gridLines}</g>`
}


function renderLinePlotGraph (model, graph, dotWidth) {
    const tp = getTimePeriodData(graph)
    const m = getGraphMetrics(model, graph)
    
    const lines = [ ]
    let lastX, lastY

    for (let i=0; i < tp.length; i++) {
        const point = tp[i]

        const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, point.t)
        const x = startX * (m.graphWidth - dotWidth) + m.leftMargin

        const yLength = graph.yRange.end - graph.yRange.start
        const y = (1 - (point.value / yLength)) * (m.graphHeight - dotWidth)

        if (i > 0)
            lines.push(h('line', { attrs: { x1: lastX, y1: lastY, x2: x, y2: y } }))
    
        lastX = x
        lastY = y
    }

    return lines
}


function renderScatterPlotGraph (model, graph, dotWidth) {
    const tp = getTimePeriodData(graph)
    const m = getGraphMetrics(model, graph)
    
    return tp.map((point) => {
        const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, point.t)
        const x = startX * (m.graphWidth - dotWidth) + m.leftMargin

        const yLength = graph.yRange.end - graph.yRange.start
        const y = (1 - (point.value / yLength)) * (m.graphHeight - dotWidth)

        return h('rect', {
            attrs: {
                x,
                y,
                'data-value': point.value,
                width: dotWidth,
                height: dotWidth
            }
        })
    })
}


function graphComponent (model, graph, update) {

    const dotWidth = 4
    const m = getGraphMetrics(model, graph)

    const _stopDragging = function () {
        graph.selection.dragging = undefined
        update()
    }

    const _insertHook = function (vnode) {
        model.elm = vnode.elm
    }

    return html`
        <svg xmlns="http://www.w3.org/2000/svg"
             class="graph"
             aria-labelledby="title"
             role="img"
             viewBox="0 0 ${model.width} ${graph.height}" 
             style="height: ${graph.height}px; width: 100%; background-color: white; font-size: 10px; text-anchor: middle; -moz-user-select: none; -webkit-user-select: none; user-select: none; -webkit-user-drag: none; -khtml-user-drag: none; -moz-user-drag: none; -o-user-drag: none; user-drag: none;"
             @on:mouseup=${_stopDragging}
             @hook:insert=${_insertHook}>
            <title id="title">${graph.title}</title>

            ${verticalGridLinesMinor(model, graph, update)}
            ${verticalGridLinesMajor(model, graph, update)}
            ${gridLines(model, graph, update)}

            <g style="stroke: #888; stroke-dasharray: 0; stroke-width: 1;"> 
                <line x1="${m.leftMargin}" x2="${m.leftMargin+m.graphWidth}" y1="${m.graphHeight}" y2="${m.graphHeight}" />
                ${tickMarksComponent(model, graph, update)}
                ${tickLabelsComponent(model, graph, update)}
            </g>

            <g class="data"
               style="fill: ${graph.dataColor}; stroke: ${graph.dataColor}; stroke-width: 1;">
               ${graph.type === 'scatterPlot' ? renderScatterPlotGraph(model, graph, dotWidth) : renderLinePlotGraph(model, graph, dotWidth)}
            </g>

            ${timeSelectionComponent(model, graph, update)}

            <text x="${m.graphWidth + m.leftMargin - dotWidth}" y="12" style="fill: rgba(0, 0, 0, 0.7); text-anchor: end; pointer-events: none;">${graph.label}</text>
            ${renderLabelComponent(model, graph, update)}
        </svg>`
}


function renderLabelComponent (model, graph, update) {
    if (graph.renderValueLabel && graph.selection.type === 'value') {
        const m = getGraphMetrics(model, graph)
        return html`<text x="2" y="${m.graphHeight + m.bottomMargin - 8}" style="fill: rgba(0, 0, 0, 0.7); text-anchor: start; pointer-events: none;">t: ${graph.selection.time.toFixed(1)}s</text>`
    }

    return html``
}


function tickMarksComponent (model, graph, update) {
    const m = getGraphMetrics(model, graph)
  
    const tickMarks = [ ]

    const constPixelsPerTick = 6
    const tickHeight = 4

    if (graph.renderTicks) {
        for (let i=0; i < m.graphWidth; i += constPixelsPerTick) {
            const x = m.leftMargin + i
            const height = tickHeight
            tickMarks.push(
                h('line', { attrs: { x1: x, x2: x, y1: m.graphHeight, y2: m.graphHeight + tickHeight } })
            )
        }
    }

    return tickMarks
}


function tickLabelsComponent (model, graph, update) {
    const m = getGraphMetrics(model, graph)

    const timePeriod = (graph.timeRange.end - graph.timeRange.start)
    
    const tickLabels = [ ]
    const constPixelsPerTick = 6
   
    if (graph.renderTicks) {
        const tickCount = m.graphWidth / constPixelsPerTick
        const secondsPerTick = timePeriod / tickCount
        let lastSecond

        // every 10 ticks, draw the seconds
        for (let i=0; i < m.graphWidth; i += 60) {
            const tickIdx = i / constPixelsPerTick
            const seconds = (graph.timeRange.start + tickIdx * secondsPerTick).toFixed(1)
            if (lastSecond !== seconds) {
                tickLabels.push({ x: m.leftMargin + i, seconds })
                lastSecond = seconds
            }
        }
    }

    return tickLabels.map((tick) => {
        return html`<text x="${tick.x}" y="${m.graphHeight + 19}">${tick.seconds}</text>`
    })
}


function timeSelectionComponent (model, graph, update) {
    if (graph.selection.type === 'range')
        return timeRangeSelectionComponent(model, graph, update)

    if (graph.selection.type === 'value')
        return timeValueSelectionComponent(model, graph, update)

    return html``
}


function timeRangeSelectionComponent (model, graph, update) {
    const m = getGraphMetrics(model, graph)
    const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.start)
    const endX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.end)

    const _mouseMove = throttle(function (ev) {
        const rect = model.elm.getBoundingClientRect()
        const x = clamp(ev.clientX - rect.left, 0, model.elm.clientWidth) //x position within the element.

        if (graph.selection.dragging === 'start') {
            const pos = clamp((x - m.leftMargin) / m.graphWidth, 0, 1)
            graph.selection.start = lerp(graph.timeRange.start, graph.timeRange.end, pos)

        } else if (graph.selection.dragging === 'end') {
            const pos = clamp((x - m.leftMargin) / m.graphWidth, 0, 1)
            graph.selection.end = (pos === 1) ? Infinity : lerp(graph.timeRange.start, graph.timeRange.end, pos)
        }

        update()
    }, 1000 / FPS)

    const _mouseUp = function () {
        graph.selection.dragging = undefined
        document.removeEventListener('mouseup', _mouseUp)
        document.removeEventListener('mousemove', _mouseMove)
        update()
    }

    // @param String position  start | end
    const _mouseDown = function (position) {
        graph.selection.dragging = position
        document.addEventListener('mousemove', _mouseMove, { passive: true })
        document.addEventListener('mouseup', _mouseUp)
        update()
    }

    return html`
        <g class="time-selection">

            <rect x="${m.leftMargin}" y="0" width="${startX * m.graphWidth}" height="${m.graphHeight}"
                    @on:mousedown=${()=> _mouseDown('start')}
                    style="fill: rgba(205,205,205, 0.85);"/>

            <path d="M ${m.leftMargin + startX * m.graphWidth} 12 l -5 -4 l 0 -8    l 10 0  l 0 8 Z"
                  style="fill: rgb(255,64,129); cursor: ew-resize;"
                  @on:mousedown=${()=> _mouseDown('start')}/>

            <line x1="${m.leftMargin + startX * m.graphWidth}"
                  x2="${m.leftMargin + startX * m.graphWidth}"
                  y1="11"
                  y2="${m.graphHeight+1}" stroke="rgb(255,64,129)"/>


            <rect x="${m.leftMargin + (endX * m.graphWidth)}" y="0" width="${m.graphWidth - (m.graphWidth*endX)}" height="${m.graphHeight}"
                    @on:mousedown=${()=> _mouseDown('end')}
                    style="fill: rgba(205,205,205, 0.85);"/>

            <path d="M ${m.leftMargin + (endX * m.graphWidth)} 12 l -5 -4 l 0 -8    l 10 0  l 0 8 Z"
                  style="fill: rgb(255,64,129); cursor: ew-resize;"
                  @on:mousedown=${()=> _mouseDown('end')}/> 

            <line x1="${m.leftMargin + (endX * m.graphWidth)}"
                  x2="${m.leftMargin + (endX * m.graphWidth)}"
                  y1="11"
                  y2="${m.graphHeight+1}" stroke="rgb(255,64,129)"/>      
        </g>`
}


function timeValueSelectionComponent (model, graph, update) {
    
    const _mouseMove = throttle(function (ev) {
        const rect = model.elm.getBoundingClientRect()
        const x = clamp(ev.clientX - rect.left, 0, model.elm.clientWidth) //x position within the element.

        const pos = clamp((x - m.leftMargin) / m.graphWidth, 0, 1)
        graph.selection.time = lerp(graph.timeRange.start, graph.timeRange.end, pos)
        update()
    }, 1000 / 60)

    const _mouseUp = function () {
        graph.selection.dragging = undefined
        document.removeEventListener('mouseup', _mouseUp)
        document.removeEventListener('mousemove', _mouseMove)
        update()
    }

    const _mouseDown = function (position) {
        graph.selection.dragging = true
        document.addEventListener('mousemove', _mouseMove, { passive: true })
        document.addEventListener('mouseup', _mouseUp)
        update()
    }

    const m = getGraphMetrics(model, graph)

    const startX = findPosOnScale(graph.timeRange.start, graph.timeRange.end, graph.selection.time)

    const x = startX * m.graphWidth + m.leftMargin
    const y = m.graphHeight

    return html`
        <g class="time-selection" @on:mousedown=${_mouseDown}>
            <line x1="${x}"
                  x2="${x}"
                  y1="0"
                  y2="${m.graphHeight}" stroke="deeppink"/>

            <path d="M ${x} ${y-1} l 5 4 l 0 8    l -10 0  l 0 -8 Z"
                  style="fill: rgb(255,64,129); cursor: ew-resize;"
                  />
        </g>`
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
