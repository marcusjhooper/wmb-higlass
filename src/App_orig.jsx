import React, { useState, useMemo } from 'react';
import FilterableTable from './FilterableTable';
import HiGlassViewer from './HiGlassViewer';
import SunburstPlot from './SunburstPlot'; // Import the SunburstChart component
import './App.css'; // Make sure to add your styles here
import cldf from './data.json';
import getConfig from './Config'; // Ensure to import getConfig if needed

import { useTable } from 'react-table';


function App() {
  // Table setup
  const data = React.useMemo(() => cldf, []);
  const columns = React.useMemo(() => [
    { Header: "Class", accessor: 'class_label' },
    { Header: "Subclass", accessor: 'subclass_label' },
    { Header: "Supertype", accessor: 'supertype_label' }
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable({ columns, data }, useTable.filters, useTable.pagination);

  const [clickedCellValue, setClickedCellValue] = useState(null);

  const handleCellClick = (cellValue) => {
    setClickedCellValue(cellValue); // Update state with the clicked cell value
  };

  return (
    <div className="App">
      <div className="app-container">
        <FilterableTable onCellClick={setClickedCellValue} />
        <HiGlassViewer clickedCellValue={clickedCellValue} />
        <SunburstPlot />}
      </div>
    </div>
  );
}

export default App;
