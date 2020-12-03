import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
} from "d3";

const svg = select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

//create a rectangle
const render = (data) => {
  // value accesors
  const xValue = (d) => d.population;
  const yValue = (d) => d.country;
  const margin = { top: 20, bottom: 40, left: 80, right: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  const xAxis = axisBottom(xScale);

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);

  const yAxis = axisLeft(yScale);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("g").call(yAxis);
  g.append("g").call(xAxis).attr("transform", `translate(0,${innerHeight})`);

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(yValue(d)))
    .attr("width", (d) => xScale(xValue(d)))
    .attr("height", yScale.bandwidth())
    .attr("fill", "#9620d2");
};

// returns a promise
csv("data.csv").then((data) => {
  data.forEach((d) => {
    d.population = +d.population * 1000;
  });
  render(data);
});
