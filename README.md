# snabbdom-timeline

an interactive timeline component implemented in snabbdom


## example usage

```javascript
import timelineComponent from 'https://cdn.jsdelivr.net/gh/mreinstein/snabbdom-timeline/timeline.js';


// contains all data needed to render a timeline component

const model = {
    container: document.createElement('div'),
    width: 0,
    graphs: [
        {
            title: 'test title',
            label: 'title',
            type: 'scatterPlot',
            timeRange: {
                start: 0,  // seconds
                end: 0     // seconds
            },
            yRange: {
                start: 0,
                end: 100
            },
            selection: {
                type: 'range',
                start: 0,         // seconds | 0
                end: Infinity,    // seconds | Infinity
                dragging: false
            },
            height: 40,           // pixels
            dataColor: 'dodgerblue',
            renderTicks: false,
            renderValueLabel: false,
            data: [ ]
        }
    ]
};


document.body.appendChild(model.container);


function update () {
    const oldVnode = model.container
    const newVnode = timelineComponent(model, update)
    model.container = html.update(oldVnode, newVnode)
}


update()

```
