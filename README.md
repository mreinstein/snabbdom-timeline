# snabbdom-timeline

an interactive timeline component implemented in snabbdom

![alt text](example.png "screenshot")


## features
* can stack multiple graphs
* single time or ranged time selectors
* data oriented, functional design
* tiny! (~ 300 lines of code)
* renders with SVG


## usage

requires node >= v12.17 or a browser that supports the es module format.


via `npm`:
```javascript
import html     from 'snabby'
import timeline from 'snabbdom-timeline'
```

via a pure es module (browser or `deno`):
```javascript
import html     from 'https://cdn.jsdelivr.net/npm/snabby@2/snabby.js'
import timeline from 'https://cdn.jsdelivr.net/gh/mreinstein/snabbdom-timeline/timeline.js'
```


```javascript

// contains all data needed to render a timeline component

const model = {
    container: document.createElement('div'),
    width: 0,
    graphs: [
        {
            title: 'test title',
            label: 'title',
            type: 'scatterPlot',  // scatterPlot | linePlot
            timeRange: {
                start: 0,  // seconds
                end: 0     // seconds
            },
            yRange: {
                start: 0,
                end: 100
            },

            // optional: render a selection control
            selection: {
                type: 'range',
                start: 0,       // seconds | 0
                end: Infinity,  // seconds | Infinity
                dragging: false
            },

            height: 40,              // pixels
            dataColor: 'dodgerblue', // color of data points on the graph
            renderTicks: false,
            renderValueLabel: false,

            // the data points to render
            data: [ ],

            // optional: settings for grid background lines
            gridLines: {
                vertical: {
                    majorColor: '#dedede',
                    minorColor: '#f3f3f3',
                    ticksPerMinor: 2.5,
                    ticksPerMajor: 10
                },
                horizontal: {
                    color: '#eeeeee',
                    lineCount: 2
                }
            }
        }
    ]
}


document.body.appendChild(model.container)


function update () {
    const oldVnode = model.container
    const newVnode = timeline(model, update)
    model.container = html.update(oldVnode, newVnode)
}


// pump test data into the graph
setInterval(function () {
    const value = model.graphs[0].yRange.start + Math.round(Math.random() * (model.graphs[0].yRange.end - model.graphs[0].yRange.start))
    model.graphs[0].data.push({
        t: performance.now() / 1000,
        value
    })

    update()
}, 2000)

update()

```

## graph types

There are 2 available graph types:

### scatterPlot

![alt text](plot-scatter.png "scatter plot graph")


### linePlot

![alt text](plot-line.png "line plot graph")
 

You can also open `example.html` in a browser to see a more complicated example with 2 graphs linked together.
