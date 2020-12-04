import {
  select,
  csv,
  scaleLinear,
  extent,
  axisLeft,
  axisBottom,
  format,
} from "d3";

const svg = select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

// render viz
const render = (data) => {
  const margin = { top: 50, right: 40, left: 150, bottom: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const xValue = (d) => d.horsepower;
  const xAxisLabel = "Weight";

  const yValue = (d) => d.weight;
  const yAxisLabel = "Horsepower";
  const circleRadius = 10;

  const title = "Cars: Horsepower vs Weight";

  //scales
  const xScale = scaleLinear()
    .domain(extent(data, xValue)) //extent gives from min to max
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice();

  // axis
  const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(20);

  const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(20);

  // grouping
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  //call x axis
  const xAxisGroup = g
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0,${innerHeight})`);

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
  const yAxisGroup = g.append("g").call(yAxis);

  yAxisGroup.selectAll(".domain").remove();

  //y axis label
  yAxisGroup
    .append("text")
    .text(yAxisLabel)
    .attr("fill", "black")
    .attr("x", -innerHeight / 2)
    .attr("y", -90)
    .attr("class", "y-axis-label")
    .attr("transform", `rotate(-90)`)
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
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("r", circleRadius);
};

//load csv data
csv("https://vizhub.com/curran/datasets/auto-mpg.csv").then((data) => {
  console.log("auto", data);
  // convert string population to number population
  data.forEach((data) => {
    data.mpg = +data.mpg;
    data.cylinders = +data.cylinders;
    data.displacements = +data.displacements;
    data.horsepower = +data.horsepower;
    data.acceleration = +data.acceleration;
    data.year = +data.year;
  });
  render(data);
});
