import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import './App.css';
import * as d3 from 'd3';

// SunburstPlot component for rendering the Plotly Sunburst chart



class Barplot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: [], layout: {}, frames: [], config: {}};
  }

  render() {
    return (
      <Plot
        data={this.state.data}
        layout={this.state.layout}
        frames={this.state.frames}
        config={this.state.config}
        onInitialized={(figure) => this.setState(figure)}
        onUpdate={(figure) => this.setState(figure)}
      />
    );
  }
}

const SunburstPlot = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the CSV data using d3.csv
    d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/coffee-flavors.csv', function(err, rows) {
      if (err) {
        console.error('Error loading CSV:', err);
        return;
      }

      // Unpack the rows to get the ids, labels, and parents columns
      const unpack = (rows, key) => rows.map(row => row[key]);

      const plotData = [{
        type: "sunburst",
        maxdepth: 2,
        ids: unpack(rows, 'ids'),
        labels: unpack(rows, 'labels'),
        parents: unpack(rows, 'parents'),
        textposition: 'inside',
        insidetextorientation: 'radial',
      }];

      // Set the data for the Plotly chart
      setData(plotData);
    });
  }, []);

  return (
    <div>
      <h3>Sunburst Chart</h3>
      <Plot
        data={data}
        layout={{  width: 500, height: 500 }}
      />
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
