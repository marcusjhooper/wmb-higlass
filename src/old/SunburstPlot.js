import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import * as d3 from 'd3';

const SunburstPlot = ({ csvFile  }) => {
  const [options, setOptions] = useState(null);

  const transformData = (data) => {
    const root = { name: 'root', children: [] };

    data.forEach(row => {
      const className = row.class_label;
      const classColor = row.class_color;
      const subclassName = row.subclass_label;
      const subclassColor = row.subclass_color;
      const supertypeName = row.supertype_label;
      const supertypeColor = row.supertype_color;

      // Find or create class node
      let classNode = root.children.find(child => child.name === className);
      if (!classNode) {
        classNode = { name: className, color: classColor, children: [] };
        root.children.push(classNode);
      }

      // Find or create subclass node
      let subclassNode = classNode.children.find(child => child.name === subclassName);
      if (!subclassNode) {
        subclassNode = { name: subclassName, color: subclassColor, children: [] };
        classNode.children.push(subclassNode);
      }

      // Create supertype node (leaf node)
      const supertypeNode = {
        name: supertypeName,
        color: supertypeColor,
        children: [] // Leaf node
      };

      subclassNode.children.push(supertypeNode);
    });

    return root.children;
  };

  useEffect(() => {
    if (csvFile) {
      d3.csv(csvFile).then(rawData => {
        const hierarchicalData = transformData(rawData);

        setOptions({
          autoSize: true,
          data: hierarchicalData,
          series: [{
            type: 'sunburst',
            labelKey: 'name',
            colorKey: 'color',
            sizeKey: 'children.length',  // Size determined by number of children
            label: {
              enabled: true,
              color: 'white',
            },
            innerRadiusOffset: -40, // Control inner radius size
            outerRadiusOffset: 40,  // Control outer radius size
          }]
        });
      });
    }
  }, [csvFile]);

  return (
    <div>
      {options ? <AgCharts options={options} /> : <p>Loading...</p>}
    </div>
  );
};

export default SunburstPlot;