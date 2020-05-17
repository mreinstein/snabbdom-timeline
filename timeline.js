import findPosOnScale from './find-position-on-scale.js'
import html           from 'https://cdn.jsdelivr.net/gh/mreinstein/snabby@248d06d727659a0bb43a1c0f4f22cbd69be9177/snabby.js'
import lerp           from './lerp.js'


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


function graphComponent (model, graph, update) {

    const tp = getTimePeriodData(graph)

    const timePeriod = (graph.timeRange.end - graph.timeRange.start)

    const m = getGraphMetrics(model, graph)

    const pixelsPerSecond = m.graphWidth / timePeriod


    const _mouseMove = function (ev) {
        if (!graph.selection.dragging)
            return

        if (graph.selection.dragging === 'start') {
            const pos = Math.max(0, (ev.offsetX - m.leftMargin) / m.graphWidth)
            graph.selection.start = lerp(graph.timeRange.start, graph.timeRange.end, pos)
        } else if (graph.selection.dragging === 'end') {
            const pos = Math.min(1, (ev.offsetX - m.leftMargin) / m.graphWidth)
            graph.selection.end = (pos === 1) ? Infinity : lerp(graph.timeRange.start, graph.timeRange.end, pos)
        } else {
            let pos = (ev.offsetX - m.leftMargin) / m.graphWidth
            if (pos < 0)
                pos = 0
            graph.selection.time = lerp(graph.timeRange.start, graph.timeRange.end, pos)
        }

        update()
    }

    const _stopDragging = function () {
        graph.selection.dragging = undefined
        update()
    }

    return html`
        <svg xmlns="http://www.w3.org/2000/svg" class="graph"
             aria-labelledby="title"
             role="img"
             viewBox="0 0 ${model.width} ${graph.height}" 
             style="height: ${graph.height}px"
             @on:mouseup=${_stopDragging}
             @on:mouseleave=${_stopDragging}
             @on:mousemove=${_mouseMove}>
            <title id="title">${graph.title}</title>

            <g class="grid y-grid" id="yGrid">
                <line x1="${m.leftMargin}" x2="${m.leftMargin+m.graphWidth}" y1="${m.graphHeight}" y2="${m.graphHeight}" />
                ${tickMarksComponent(model, graph, update)}
                ${tickLabelsComponent(model, graph, update)}
            </g>

            <g class="data" data-setname="Our first data set">
                ${tp.map((point) => {
                    const x = pixelsPerSecond * (point.t - graph.timeRange.start)
                    const yLength = graph.yRange.end - graph.yRange.start
                    const y = (1 - (point.value / yLength)) * (m.graphHeight - 4) // 2 is half the height of the dot

                    return html`<rect x="${m.leftMargin + x}" y="${y}" style="fill: ${graph.dataColor};" data-value="${point.value}" width="4" height="4" />`                    
                })}
            </g>

            ${timeSelectionComponent(model, graph, update)}

            <text x="${model.width - 10}" y="18" style="fill: rgba(0, 0, 0, 0.7); text-anchor: end; pointer-events: none;">${graph.label}</text>
            ${renderLabelComponent(model, graph, update)}
        </svg>`
}


function renderLabelComponent (model, graph, update) {
    if (graph.renderValueLabel && graph.selection.type === 'value') {
        const m = getGraphMetrics(model, graph)
        return html`<text x="2" y="${m.graphHeight + m.bottomMargin - 8}" style="fill: rgba(0, 0, 0, 0.7); text-anchor: start; pointer-events: none;">t: ${graph.selection.time.toFixed(1)}s</text>
            `
    }

    return html``
}


function tickMarksComponent (model, graph, update) {
    const m = getGraphMetrics(model, graph)
  
    const tickMarks = [ ]

    const constPixelsPerTick = 6
    const tickHeight = 4

    if (graph.renderTicks)
        for (let i=0; i < m.graphWidth; i += constPixelsPerTick)
            tickMarks.push({ x: m.leftMargin + i, height: tickHeight })

    return tickMarks.map((tick) => {
        return html`<line x1="${tick.x}" x2="${tick.x}" y1="${m.graphHeight}" y2="${m.graphHeight + tick.height}" />`
    })
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

    const _mouseDown = function (position) {
        graph.selection.dragging = position
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
    const _mouseDown = function (ev) {
        graph.selection.dragging = true
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
    model.width = model.container.offsetWidth || model.container.elm.offsetWidth
    return html`
        <div class="graph-stack">
            ${model.graphs.map((g) => graphComponent(model, g, update))}
        </div>`
}