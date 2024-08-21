import React, { useState, useMemo } from 'react';
import './App.css'; // Ensure styles here
import cldf from './data.json';
import { useTable, useFilters, usePagination } from 'react-table';

// Default column filter function
function DefaultColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search `}
    />
  );
}

const FilterableTable = ({ onCellClick }) => {
  // Table setup
  const data = useMemo(() => cldf, []);
  const columns = useMemo(
    () => [
      {
        Header: 'Class',
        accessor: 'class_label',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Subclass',
        accessor: 'subclass_label',
        Filter: DefaultColumnFilter,
      },
      {
        Header: 'Supertype',
        accessor: 'supertype_label',
        Filter: DefaultColumnFilter,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Use `page` instead of `rows` to handle pagination
    prepareRow,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 6 }, // Show only 6 rows by default
    },
    useFilters, // Enable filtering
    usePagination // Enable pagination
  );

  const [clickedCellPosition, setClickedCellPosition] = useState(null);

  const handleClick = (cellValue, rowIndex, columnIndex) => {
    setClickedCellPosition({ rowIndex, columnIndex });
    onCellClick(cellValue); // Pass the clicked cell value to the HiGlassViewer
  };

  return (
    <div className="table-container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell, columnIndex) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    onClick={() => handleClick(cell.value, rowIndex, columnIndex)}
                    style={{
                      backgroundColor:
                        clickedCellPosition &&
                        clickedCellPosition.rowIndex === rowIndex &&
                        clickedCellPosition.columnIndex === columnIndex
                          ? 'rgba(144, 238, 144, 0.5)' // Light green with transparency
                          : 'transparent',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FilterableTable;