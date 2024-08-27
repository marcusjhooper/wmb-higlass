import React, { useState } from 'react';
import FilterableTable from './FilterableTable';
import HiGlassViewer from './HiGlassViewer';
import SunburstPlot from './SunburstPlot'; // Import SunburstPlot
import './App.css'; 
import getConfig from './Config'; // Import the getConfig function

function App() {
  const [clickedCellValue, setClickedCellValue] = useState(null);

  const handleTableClick = (cellValue) => {
    setClickedCellValue(cellValue); // Update state with the clicked cell value from table
  };

  const handleSunburstClick = (segmentName) => {
    setClickedCellValue(segmentName); // Update state with the clicked segment from Sunburst
  };

  const updatedConfig = getConfig(clickedCellValue); // Call getConfig with the clicked cell/segment value

  return (
    <div className="App">
      <div className="app-container">
        <SunburstPlot onSegmentClick={handleSunburstClick} /> {/* Pass the click handler */}
        <HiGlassViewer clickedCellValue={clickedCellValue} config={updatedConfig} />
        
      </div>
    </div>
  );
}

export default App;