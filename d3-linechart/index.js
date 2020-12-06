import {
  select,
  csv,
  line,
  scaleLinear,
  curveBasis,
  extent,
  scaleTime,
  axisLeft,
  axisBottom,
} from "d3";

const svg = select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

// render viz
const render = (data) => {
  const margin = { top: 50, right: 40, left: 110, bottom: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const xValue = (d) => d.timestamp;
  const xAxisLabel = "Time";

  const yValue = (d) => d.temperature;
  const yAxisLabel = "Temperature";
  const circleRadius = 6;

  const title = "A week in San Francisco";

  //scales
  const xScale = scaleTime()
    .domain(extent(data, xValue)) //extent gives from min to max
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
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
    .attr("y", -60)
    .attr("class", "y-axis-label")
    .attr("transform", `rotate(-90)`)
    .attr("text-anchor", "middle");

  // title
  g.append("text")
    .text(title)
    .attr("x", "15%")
    .attr("y", -15)
    .attr("class", "title");

  //path
  const lineGenerator = line()
    .x((d) => xScale(xValue(d)))
    .y((d) => yScale(yValue(d)))
    .curve(curveBasis);

  g.append("path").attr("d", lineGenerator(data)).attr("class", "line-path");
};

//load csv data
csv("https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv").then(
  (data) => {
    data.forEach((d) => {
      d.temperature = +d.temperature;
      d.timestamp = new Date(d.timestamp);
    });
    render(data);
  }
);
