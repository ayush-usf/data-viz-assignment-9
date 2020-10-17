// Ref: https://bl.ocks.org/micahstubbs/7f360cc66abfa28b400b96bc75b8984e

d3.json('link.json', createAdjacencyMatrix);
function createAdjacencyMatrix(data) {

    let tooltip = d3.select("body").append("div").attr("class", "toolTip");

    const adjacencyMatrix = d3.adjacencyMatrixLayout();
    console.log('adjacencyMatrix', adjacencyMatrix);
    console.log('d3', d3);
    adjacencyMatrix
        .size([870,870])
        .nodes(data.nodes)
        .links(data.links)
        .directed(false)
        .nodeID(d => d.name);
    const matrixData = adjacencyMatrix();
    console.log(matrixData)
    const someColors = d3.scaleOrdinal()
        .range(d3.schemeCategory20b);
    d3.select('svg')
        .append('g')
        .attr('transform', 'translate(80,80)')
        .attr('id', 'adjacencyG')
        .selectAll('rect')
        .data(matrixData)
        .enter()
        .append('rect')
        .attr('width', d => {
            return d.width
        })
        .attr('height', d => {
            return d.height
        })
        .attr('x', d => {
            return d.x
        })
        .attr('y', d => {
            return d.y
        })
        .on("mouseover",(d => mouseover(d.id)))
        .on("mouseout",(d => mouseout()))
        .style('stroke', 'black')
        .style('stroke-width', '1px')
        .style('stroke-opacity', .1)
        .style('fill-opacity', d => d.weight * 0.8);
    d3.select('#adjacencyG')
        .call(adjacencyMatrix.xAxis);
    d3.select('#adjacencyG')
        .call(adjacencyMatrix.yAxis);

    function mouseover(p) {
        if(event.target.tagName === "rect" && event.target.style["fill-opacity"] != "0"){
            let y_x = p.split("-")
            tooltip
                .style("left", event.pageX - 50 + "px")
                .style("top", event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html("X: "+y_x[0] +", Y: "+y_x[1]);
        }
    }

    function mouseout() {
        tooltip.style("display", "none");
    }
}