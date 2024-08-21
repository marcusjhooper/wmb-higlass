// src/FilterableTable.js
import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useFilters } from 'react-table';

const FilterableTable = ({ onCellClick }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

    useEffect(() => {
      // Fetch and parse the JSON file
      fetch('/data.json') // Ensure this path is correct
        .then(response => response.json())
        .then(jsonData => {
          console.log('Fetched Data:', jsonData); // Log fetched data

          if (Array.isArray(jsonData) && jsonData.length > 0) {
            // Dynamically generate column definitions based on the data
            const columnHeaders = Object.keys(jsonData[0]);
            const cols = columnHeaders.map(header => ({
              Header: header,
              accessor: header,
              Cell: header.toLowerCase().includes('color') ? ({ value }) => (
                <div style={{ backgroundColor: value, width: '100%', height: '20px' }}></div>
              ) : undefined,
            }));
            console.log('Columns:', cols); // Log columns

            setData(jsonData);
            setColumns(cols);
          } else {
            console.error('Fetched data is not in expected format.');
          }
        })
        .catch(error => {
          console.error('Error fetching JSON:', error);
        });
    }, []);

  const columnsMemo = useMemo(() => columns, [columns]);
  const dataMemo = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: columnsMemo, data: dataMemo }, useFilters);

  const handleClick = (cell) => {
    const cellValue = cell.value;
    onCellClick(cellValue); // Send the clicked cell data to the HiGlassViewer
  };

  return (
    <div>
      {data.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} key={column.id}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} onClick={() => handleClick(cell)} key={cell.column.id}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FilterableTable;