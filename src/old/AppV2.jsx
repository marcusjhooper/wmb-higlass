// src/App.js
import React, { useState } from 'react';
import FilterableTable from './FilterableTable';
import HiGlassViewer from './HiGlassViewer';
import './App.css'; // Make sure to add your styles here

function App() {
  const [clickedCellValue, setClickedCellValue] = useState(null);

  const handleCellClick = (cellValue) => {
    setClickedCellValue(cellValue); // Update state with the clicked cell value
  };

  return (
    <div className="App">
      <h1>Filterable Table with HiGlass Viewer Integration</h1>
      <div className="container">
        <div className="table-section">
          <FilterableTable onCellClick={handleCellClick} />
        </div>
        <div className="higlass-viewer-section">
          <HiGlassViewer clickedCellValue={clickedCellValue} />
        </div>
      </div>
    </div>
  );
}

export default App;