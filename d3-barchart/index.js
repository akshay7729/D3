import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format,
} from "d3";

const svg = select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

// render viz
const render = (data) => {
  const margin = { top: 50, right: 40, left: 140, bottom: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  //scales
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.population)])
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, innerHeight])
    .padding(0.1);
  //formatter
  const xFormat = (num) => format("0.3s")(num).replace("G", "B");

  // axis
  const xAxis = axisBottom(xScale).tickFormat(xFormat).tickSize(-innerHeight);
  const yAxis = axisLeft(yScale);

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
    .text("population")
    .attr("fill", "black")
    .attr("x", innerWidth / 2)
    .attr("y", 60)
    .attr("class", "x-axis-label");

  //call y axis
  g.append("g").call(yAxis).selectAll(".domain, .tick line").remove();

  // title
  g.append("text")
    .text("Top 10 most populous countries in the world")
    .attr("x", "15%")
    .attr("y", -15)
    .attr("class", "title");

  // bars
  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(d.country))
    .attr("width", (d) => xScale(d.population))
    .attr("height", yScale.bandwidth());
};

//load csv data
csv("data.csv").then((data) => {
  // convert string population to number population
  data.forEach((data) => {
    data.population = +data.population * 1000;
  });
  render(data);
});
