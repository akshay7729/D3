(function (d3) {
  'use strict';

  var svg = d3.select("svg");
  var w = +svg.attr("width");
  var h = +svg.attr("height");
  var eyeSpacing = 100;
  var eyyYoffset = 70;
  var eyeRadius = 30;
  var eyeBrowWidth = 50;
  var eyeBrowHeight = 20;

  var g = svg.append("g").attr("transform", ("translate(" + (w / 2) + "," + (h / 2) + ")"));

  var circle = g
    .append("circle")
    .attr("r", h / 2)
    .attr("fill", "yellow")
    .attr("stroke", "black");

  var eyesG = g.append("g").attr("transform", ("translate(0," + (-eyyYoffset) + ")"));

  var leftEye = eyesG
    .append("circle")
    .attr("r", eyeRadius)
    .attr("cx", -eyeSpacing);

  var rightEye = eyesG
    .append("circle")
    .attr("r", eyeRadius)
    .attr("cx", eyeSpacing);

  var eyesbrowsG = g
    .append("g")
    .attr("transform", ("translate(0," + (-eyyYoffset - 70) + ")"));

  eyesbrowsG
    .transition()
    .duration(2000)
    .attr("transform", ("translate(0," + (-eyyYoffset - 100) + ")"))
    .transition()
    .duration(2000)
    .attr("transform", ("translate(0," + (-eyyYoffset - 70) + ")"));

  var leftEyeBrow = eyesbrowsG
    .append("rect")
    .attr("x", -eyeSpacing - eyeBrowWidth / 2)
    .attr("width", eyeBrowWidth)
    .attr("height", eyeBrowHeight);

  var rightEyeBrow = eyesbrowsG
    .append("rect")
    .attr("x", eyeSpacing - eyeBrowWidth / 2)
    .attr("width", eyeBrowWidth)
    .attr("height", eyeBrowHeight);

  var mouth = g.append("path").attr(
    "d",
    d3.arc()({
      innerRadius: 150,
      outerRadius: 170,
      startAngle: Math.PI / 2,
      endAngle: (Math.PI * 3) / 2,
    })
  );

}(d3));
//# sourceMappingURL=bundle.js.map
