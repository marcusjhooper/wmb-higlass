import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// SunburstPlot component for rendering a D3.js Sunburst chart
const SunburstPlot = ({ data, onClickSegment }) => {
  const chartRef = useRef();
  const [currentRoot, setCurrentRoot] = useState(data);
  const [history, setHistory] = useState([data]);

  useEffect(() => {
    const width = 500;
    const radius = width / 2;

    const partition = d3.partition()
      .size([2 * Math.PI, radius]);

    const root = d3.hierarchy(currentRoot)
      .sum(d => d.size);

    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1);

    // Clear the chart before re-rendering
    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", width)
      .append("g")
      .attr("transform", `translate(${radius},${radius})`);

    const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, currentRoot.children ? currentRoot.children.length + 1 : 1));

    // Create the sunburst slices
    const slices = svg.selectAll("path")
      .data(partition(root).descendants())
      .enter().append("path")
      .attr("d", arc)
      .style("fill", d => color(d.depth))
      .on("click", (event, d) => {
        if (d.depth === 0) return; // Ignore click on the root
        const clickedData = d.data;
        onClickSegment(clickedData); // Notify parent component
        setCurrentRoot(clickedData); // Update the chart to subset
        setHistory([...history, clickedData]); // Add to history
      })
      .on("mouseover", function(event, d) {
        d3.select(this).style("opacity", 0.7);
      })
      .on("mouseout", function(event, d) {
        d3.select(this).style("opacity", 1);
      })
      .append("title")
      .text(d => `${d.data.name}: ${d.value}`);

    // Add labels to the arcs
    svg.selectAll("text")
      .data(partition(root).descendants())
      .enter().append("text")
      .attr("transform", function(d) {
        const angle = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        return `rotate(${angle - 90}) translate(${(d.y0 + d.y1) / 2},0) rotate(${angle > 180 ? 180 : 0})`;
      })
      .attr("dx", "-20") // Fine-tuning the label position
      .attr("dy", ".5em")
      .text(d => d.data.name)
      .style("text-anchor", "middle")
      .style("font-size", "12px");

  }, [currentRoot]); // Redraw the chart when currentRoot changes

  // Navigate up the hierarchy
  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setCurrentRoot(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  };

  return (
    <div>
      <h3>AIT21</h3>
      <button onClick={goBack} disabled={history.length <= 1}>Go Back</button>
      <div ref={chartRef}></div>
    </div>
  );
};

export default SunburstPlot;