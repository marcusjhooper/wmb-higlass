import React, { useEffect, useRef, useState } from 'react';
import getConfig from './Config'; // Import the getConfig function
import DefaultConfig from './WMB_classes.json'; // Default config

const HiGlassViewer = ({ clickedCellValue }) => {
  const viewerRef = useRef(null);
  const [currentConfig, setCurrentConfig] = useState(DefaultConfig);

  useEffect(() => {
    let configToUse = DefaultConfig;

    if (clickedCellValue) {
      configToUse = getConfig(clickedCellValue); // Get the updated configuration
    }

    console.log("Config to use:", configToUse); // Log the config to debug

    setCurrentConfig(configToUse);

    if (viewerRef.current) {
      try {
        const hgApi = hglib.viewer(viewerRef.current, configToUse, {
          bounded: false,
        });

        return () => {
          hgApi.destroy(); // Clean up
        };
      } catch (error) {
        console.error("Error initializing HiGlass:", error);
      }
    }
  }, [clickedCellValue]);

  return <div ref={viewerRef} style={{ width: '100%', height: '1000px' }}></div>;
};

export default HiGlassViewer;