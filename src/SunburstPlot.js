import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import Sunburst from 'highcharts/modules/sunburst';
import HighchartsReact from 'highcharts-react-official'
import df from './Sunburst_cldf.json'
// Initialize the sunburst module for Highcharts
Sunburst(Highcharts);

const SunburstPlot = ({ data = df }) => {

  useEffect(() => {
    // Initialize Highcharts chart
    Highcharts.chart('sunburst-container', {
      chart: {
        height: '100%',
      },
      colors: ['transparent'].concat(Highcharts.getOptions().colors),
      title: {
        text: 'WMB',
      },
      subtitle: {
        text: 'AIT21',
      },
      series: [{
        type: 'sunburst',
        data: data,
        name: 'Root',
        allowDrillToNode: true,
        borderRadius: 3,
        cursor: 'pointer',
        dataLabels: {
          format: '{point.name}',
          filter: {
            property: 'innerArcLength',
            operator: '>',
            value: 16,
          },
        },
        levels: [{
          level: 1,
          levelIsConstant: false,
          dataLabels: {
            filter: {
              property: 'outerArcLength',
              operator: '>',
              value: 64,
            },
          },
        }, {
          level: 2,
          colorByPoint: true,
        }, {
          level: 3,
          colorVariation: {
            key: 'brightness',
            to: -0.5,
          },
        }, {
          level: 4,
          colorVariation: {
            key: 'brightness',
            to: 0.5,
          },
        }],
      }],
      tooltip: {
        headerFormat: '',
        pointFormat: 'The value of <b>{point.name}</b> is <b>{point.value}</b>',
      },
    });
  }, [data]);

  return (
    <div id="sunburst-container" style={{ height: '500px', width: '100%' }} />
  );
};

export default SunburstPlot;