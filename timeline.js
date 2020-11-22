import canvas from './timeline-canvas.js'
import svg   from './timeline-svg.js'


export default function timelineComponent (model, update) {
    return (model.renderer === 'canvas') ? canvas(model, update) : svg(model, update)
}
