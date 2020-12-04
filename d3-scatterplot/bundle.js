(function (d3) {
  'use strict';

  var svg = d3.select("svg");
  var width = +svg.attr("width");
  var height = +svg.attr("height");

  // render viz
  var render = function (data) {
    var margin = { top: 50, right: 40, left: 150, bottom: 100 };
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;
    var xValue = function (d) { return d.horsepower; };
    var xAxisLabel = "Weight";

    var yValue = function (d) { return d.weight; };
    var yAxisLabel = "Horsepower";
    var circleRadius = 10;

    var title = "Cars: Horsepower vs Weight";

    //scales
    var xScale = d3.scaleLinear()
      .domain(d3.extent(data, xValue)) //extent gives from min to max
      .range([0, innerWidth])
      .nice();

    var yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([0, innerHeight])
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
      .attr("y", -90)
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle");

    // title
    g.append("text")
      .text(title)
      .attr("x", "15%")
      .attr("y", -15)
      .attr("class", "title");

    // bars
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", function (d) { return yScale(yValue(d)); })
      .attr("cx", function (d) { return xScale(xValue(d)); })
      .attr("r", circleRadius);
  };

  //load csv data
  d3.csv("https://vizhub.com/curran/datasets/auto-mpg.csv").then(function (data) {
    console.log("auto", data);
    // convert string population to number population
    data.forEach(function (data) {
      data.mpg = +data.mpg;
      data.cylinders = +data.cylinders;
      data.displacements = +data.displacements;
      data.horsepower = +data.horsepower;
      data.acceleration = +data.acceleration;
      data.year = +data.year;
    });
    render(data);
  });

}(d3));
//# sourceMappingURL=bundle.js.map
