// src/App.js
import React, { useState } from 'react';
import FilterableTable from './FilterableTable';
import HiGlassViewer from './HiGlassViewer';
import './App.css'; // Make sure to add your styles here
import cldf from'./data.json';

import {useTable} from 'react-table';



function App() {
  //table
  const data = React.useMemo(() => cldf, []);
  const columns = React.useMemo(() => [
  {Header:"class", accessor:'class_label'},
  {Header:"subclass", accessor:'subclass_label'},
  {Header:"supertype", accessor:'supertype_label'}
  ],[]);

  const{getTableProps,getTableBodyProps,headerGroups,rows,prepareRow}= 
   useTable({columns,data})



  const [clickedCellValue, setClickedCellValue] = useState(null);
  console.log(cldf)

  const handleCellClick = (cellValue) => {
    setClickedCellValue(cellValue); // Update state with the clicked cell value
  };

  return (
    <div className="App">
    <div className="app-container">
      <FilterableTable onCellClick={setClickedCellValue} />
      <HiGlassViewer clickedCellValue={clickedCellValue} />
    </div>


 
      </div>
  );
}

export default App;