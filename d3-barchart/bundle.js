(function (d3) {
  'use strict';

  var svg = d3.select("svg");
  var width = +svg.attr("width");
  var height = +svg.attr("height");

  //create a rectangle
  var render = function (data) {
    // value accesors
    var xValue = function (d) { return d.population; };
    var yValue = function (d) { return d.country; };
    var margin = { top: 20, bottom: 40, left: 80, right: 40 };
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;

    var xScale = d3.scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);

    var xAxis = d3.axisBottom(xScale);

    var yScale = d3.scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);

    var yAxis = d3.axisLeft(yScale);

    var g = svg
      .append("g")
      .attr("transform", ("translate(" + (margin.left) + "," + (margin.top) + ")"));

    g.append("g").call(yAxis);
    g.append("g").call(xAxis).attr("transform", ("translate(0," + innerHeight + ")"));

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", function (d) { return yScale(yValue(d)); })
      .attr("width", function (d) { return xScale(xValue(d)); })
      .attr("height", yScale.bandwidth())
      .attr("fill", "#9620d2");
  };

  // returns a promise
  d3.csv("data.csv").then(function (data) {
    data.forEach(function (d) {
      d.population = +d.population * 1000;
    });
    render(data);
  });

}(d3));
//# sourceMappingURL=bundle.js.map
