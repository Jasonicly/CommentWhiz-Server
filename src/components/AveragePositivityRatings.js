import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

const AveragePositivityRatings = ({ monthlyRatings }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const xAxisData = monthlyRatings.map(item => `${monthNames[item.month - 1]} ${item.year}`);
    const seriesData = monthlyRatings.map(item => item.averageRating);

    const option = {
      xAxis: {
        type: 'category',
        data: xAxisData,
        name: 'Timeline',
        nameLocation: 'middle',
        nameTextStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        nameGap: 50,
        axisLabel: {
          fontSize: 14,
          fontWeight: 'bold',
          interval: 'auto',
          rotate: 0,
          formatter: value => {
            const [month, year] = value.split(' ');
            return `${month}\n${year}`;
          }
        }
      },
      yAxis: {
        type: 'value',
        name: 'Positivity Rating',
        nameLocation: 'middle',
        nameRotate: 90,
        nameTextStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        nameGap: 50,
        min: 0,
        max: 5,
        axisLabel: {
          fontSize: 14,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: params => {
          const { value } = params[0];
          const { dataIndex } = params[0];
          return `Month: ${xAxisData[dataIndex]}<br/>Average Rating: ${Math.round(value * 100) / 100}`;
        }
      },
      series: [
        {
          data: seriesData,
          type: 'line',
          smooth: true
        }
      ]
    };

    myChart.setOption(option);

    const resizeChart = () => {
      myChart.resize();
    };

    window.addEventListener('resize', resizeChart);

    // Clean up on unmount
    return () => {
      myChart.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [monthlyRatings]);

  if (!monthlyRatings || monthlyRatings.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="text-center">
      <h4 className="text-xl font-semibold mb-2">Average Positivity Ratings from {monthlyRatings[0].year} to {monthlyRatings[monthlyRatings.length - 1].year}</h4>
      <div ref={chartRef} className="w-full" style={{ maxHeight: '400px', minHeight: '300px', height: '50vh' }}></div>
    </div>
  );
};

export default AveragePositivityRatings; 
