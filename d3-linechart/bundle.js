(function (d3) {
  'use strict';

  var svg = d3.select("svg");
  var width = +svg.attr("width");
  var height = +svg.attr("height");

  // render viz
  var render = function (data) {
    var margin = { top: 50, right: 40, left: 110, bottom: 100 };
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;
    var xValue = function (d) { return d.timestamp; };
    var xAxisLabel = "Time";

    var yValue = function (d) { return d.temperature; };
    var yAxisLabel = "Temperature";

    var title = "A week in San Francisco";

    //scales
    var xScale = d3.scaleTime()
      .domain(d3.extent(data, xValue)) //extent gives from min to max
      .range([0, innerWidth])
      .nice();

    var yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0])
      .nice();

    // axis
    var xAxis = d3.axisBottom(xScale).tickSize(-innerHeight).tickPadding(20);

    var yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickPadding(20);

    // grouping
    var g = svg
      .append("g")
      .attr("transform", ("translate(" + (margin.left) + "," + (margin.top) + ")"));

    //call x axis
    var xAxisGroup = g
      .append("g")
      .call(xAxis)
      .attr("transform", ("translate(0," + innerHeight + ")"));

    xAxisGroup.select(".domain").remove();

    //x axis label
    xAxisGroup
      .append("text")
      .text(xAxisLabel)
      .attr("fill", "black")
      .attr("x", innerWidth / 2)
      .attr("y", 60)
      .attr("class", "x-axis-label");

    //call y axis
    var yAxisGroup = g.append("g").call(yAxis);

    yAxisGroup.selectAll(".domain").remove();

    //y axis label
    yAxisGroup
      .append("text")
      .text(yAxisLabel)
      .attr("fill", "black")
      .attr("x", -innerHeight / 2)
      .attr("y", -60)
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle");

    // title
    g.append("text")
      .text(title)
      .attr("x", "15%")
      .attr("y", -15)
      .attr("class", "title");

    //path
    var lineGenerator = d3.line()
      .x(function (d) { return xScale(xValue(d)); })
      .y(function (d) { return yScale(yValue(d)); })
      .curve(d3.curveBasis);

    g.append("path").attr("d", lineGenerator(data)).attr("class", "line-path");
  };

  //load csv data
  d3.csv("https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv").then(
    function (data) {
      data.forEach(function (d) {
        d.temperature = +d.temperature;
        d.timestamp = new Date(d.timestamp);
      });
      render(data);
    }
  );

}(d3));
//# sourceMappingURL=bundle.js.map
