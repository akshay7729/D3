import { select, arc } from "d3";
const svg = select("svg");
const w = +svg.attr("width");
const h = +svg.attr("height");
const eyeSpacing = 100;
const eyyYoffset = 70;
const eyeRadius = 30;
const eyeBrowWidth = 50;
const eyeBrowHeight = 20;

const g = svg.append("g").attr("transform", `translate(${w / 2},${h / 2})`);

const circle = g
  .append("circle")
  .attr("r", h / 2)
  .attr("fill", "yellow")
  .attr("stroke", "black");

const eyesG = g.append("g").attr("transform", `translate(0,${-eyyYoffset})`);

const leftEye = eyesG
  .append("circle")
  .attr("r", eyeRadius)
  .attr("cx", -eyeSpacing);

const rightEye = eyesG
  .append("circle")
  .attr("r", eyeRadius)
  .attr("cx", eyeSpacing);

const eyesbrowsG = g
  .append("g")
  .attr("transform", `translate(0,${-eyyYoffset - 70})`);

eyesbrowsG
  .transition()
  .duration(2000)
  .attr("transform", `translate(0,${-eyyYoffset - 100})`)
  .transition()
  .duration(2000)
  .attr("transform", `translate(0,${-eyyYoffset - 70})`);

const leftEyeBrow = eyesbrowsG
  .append("rect")
  .attr("x", -eyeSpacing - eyeBrowWidth / 2)
  .attr("width", eyeBrowWidth)
  .attr("height", eyeBrowHeight);

const rightEyeBrow = eyesbrowsG
  .append("rect")
  .attr("x", eyeSpacing - eyeBrowWidth / 2)
  .attr("width", eyeBrowWidth)
  .attr("height", eyeBrowHeight);

const mouth = g.append("path").attr(
  "d",
  arc()({
    innerRadius: 150,
    outerRadius: 170,
    startAngle: Math.PI / 2,
    endAngle: (Math.PI * 3) / 2,
  })
);
