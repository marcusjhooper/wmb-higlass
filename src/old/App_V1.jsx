import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import './App.css';
import * as d3 from 'd3';

// SunburstPlot component for rendering the Plotly Sunburst chart


const SunburstPlot = () => {
  const chartRef = useRef();

  useEffect(() => {
    const data = {
      name: "root",
      children: [
        { name: "A", size: 10 },
        { name: "B", size: 20 },
        {
          name: "C",
          children: [
            { name: "C1", size: 15 },
            { name: "C2", size: 30 }
          ]
        }
      ]
    };

    const width = 500;
    const radius = width / 2;

    const partition = d3.partition()
      .size([2 * Math.PI, radius]);

    const root = d3.hierarchy(data)
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

    const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

    // Create the sunburst slices
    const slices = svg.selectAll("path")
      .data(partition(root).descendants())
      .enter().append("path")
      .attr("d", arc)
      .style("fill", d => color(d.depth))
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

  }, []); // Empty array ensures this effect runs once on mount

  return (
    <div>
      <h3>Sunburst Chart</h3>
      <div ref={chartRef}></div>
    </div>
  );
};


// HiGlassViewer component for rendering the HiGlass viewer
const HiGlassViewer = () => {
  useEffect(() => {
    // Ensure that hglib is available globally
    if (window.hglib) {
      const hgApi = window.hglib.viewer(
        document.getElementById('higlass-container'),
        'http://higlass.io/api/v1/viewconfs/?d=default',
        {
          bounded: false,
        }
      );
    } else {
      console.error('HiGlass library not loaded');
    }
  }, []);

  return (
    <div>
      <h3>HiGlass Viewer</h3>
      <div id="higlass-container" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};



// Main App component combining SunburstPlot and HiGlassViewer
export default function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        {/* Sunburst Chart Section */}
        <div className="col-md-6">
          <SunburstPlot />
        </div>

        {/* HiGlass Viewer Section */}
        <div className="col-md-6">
          <HiGlassViewer />
        </div>
      </div>
    </div>
  );
}



/// function WMB_HiGlass() {
//   // Example data for Plotly Sunburst chart
//   const sunburstData = [
//     {
//       type: 'sunburst',
//       labels: ["A", "B", "C", "D", "E"],
//       parents: ["", "A", "A", "B", "B"],
//       values: [10, 20, 15, 30, 25],
//       branchvalues: "total",
//     }
//   ];



//   // Initialize HiGlass Viewer
//   useEffect(() => {
//     // Ensure that hglib is available globally
//     if (window.hglib) {
//       const hgApi = window.hglib.viewer(
//         document.getElementById('higlass-container'),
//         'http://higlass.io/api/v1/viewconfs/?d=default',
//         {
//           bounded: true,
//         }
//       );
//     } else {
//       console.error('HiGlass library not loaded');
//     }
//   }, []);

//   return (
//     <div className="App container-fluid">
//       <div className="row">
//         {/* Sunburst Chart Section */}
//         <div className="col-md-6">
//           <h3>Sunburst Chart</h3>
//           <Plot
//             data={sunburstData}
//             layout={{ margin: { t: 0, l: 0, r: 0, b: 0 }, width: 500, height: 500 ,
//             sunburstcolorway: ["#636efa", "#ef553b", "#00cc96", "#ab63fa", "#19d3f3", "#e763fa"],
//             extendsunburstcolors: true}}
//           />
//         </div>

//         {/* HiGlass Viewer Section */}
//         <div className="col-md-6">
//           <h3>HiGlass Viewer</h3>
//           <div id="higlass-container" style={{ width: '1000px', height: '1000px',
//            }}></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default WMB_HiGlass;
