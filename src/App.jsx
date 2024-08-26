import React, { useState, useMemo } from 'react';
import FilterableTable from './FilterableTable';
import HiGlassViewer from './HiGlassViewer';
import SunburstPlot from './SunburstPlot'; // Import the SunburstChart component
import './App.css'; // Make sure to add your styles here
import cldf from './data.json';
import getConfig from './Config'; // Ensure to import getConfig if needed

import { useTable } from 'react-table';


const data = {
  name: 'root',
  children: [
    {
      name: 'Level 1 - A',
      children: [
        { name: 'Level 2 - A1', value: 100 },
        { name: 'Level 2 - A2', value: 50 }
      ]
    },
    {
      name: 'Level 1 - B',
      children: [
        { name: 'Level 2 - B1', value: 80 },
        { name: 'Level 2 - B2', value: 30 }
      ]
    }
  ]
};



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
