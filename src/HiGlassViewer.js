// src/HiGlassViewer.js
import React, { useEffect, useRef } from 'react';

const HiGlassViewer = ({ clickedCellValue }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current) {
      // Initialize the HiGlass viewer
      const hgApi = hglib.viewer(
        viewerRef.current,
        'http://higlass.io/api/v1/viewconfs/?d=default',
        {
          bounded: false,
        }
      );

      // Update HiGlassViewer based on clicked cell value
      if (clickedCellValue) {
        console.log('Clicked cell value:', clickedCellValue);
        // You can use the clickedCellValue to update the HiGlass viewer
        // For example, you might want to update the view configuration or do something else.
      }
    }
  }, [clickedCellValue]);
  return (
    <div ref={viewerRef} style={{width: '100%', height: '1000px' }}></div>
  );
};

export default HiGlassViewer;