import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
]);

const EmotionAnalysisGraph = ({ summary }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const barData = [
      { name: 'Joy', count: summary["Number of Joy Emotions"], color: '#FFF500' },
      { name: 'Anger', count: summary["Number of Anger Emotions"], color: '#DC0000' },
      { name: 'Neutral', count: summary["Number of Neutral Emotions"], color: '#8F8F8F' },
      { name: 'Sad', count: summary["Number of Sadness Emotions"], color: '#39379D' },
      { name: 'Disgust', count: summary["Number of Disgust Emotions"], color: '#0A8739' },
      { name: 'Surprise', count: summary["Number of Surprise Emotions"], color: '#FF8A00' }
    ];  

    const yAxisData = barData.map(item => item.name);
    const seriesData = barData.map(item => item.count);
    const colorData = barData.map(item => item.color);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          // Access the color of the bar
          const color = params.color;
          // Use the emotion name from yAxisData and value from params
          return `
            <div style="display: flex; align-items: center;">
              <div style="width: 10px; height: 10px; background-color: ${color}; border-radius: 50%; margin-right: 5px;"></div>
              <div>${params.name}: ${params.value}</div>
            </div>
          `;
        }
      },
    
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: yAxisData
      },
      series: [
        {
          name: 'Count',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            position: 'right', // Position the label outside the bar
            formatter: function (params) {
              return params.value ? params.value : '';
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: seriesData.map((value, index) => ({
            value: value,
            itemStyle: {
              color: colorData[index]
            }
          }))
        }
      ]
    };

    option && myChart.setOption(option);

    const resizeChart = () => {
      myChart.resize();
    };

    window.addEventListener('resize', resizeChart);

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', resizeChart);
      myChart.dispose();
    };
  }, [summary]);

  return (
    <div className="bg-white p-4 m-2 rounded-lg shadow-md text-center flex flex-col items-center justify-center">
      <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Emotion Analysis</h4>
      <div ref={chartRef} style={{ width: '100%', height: '300px', maxWidth: '100%' }}></div>
    </div>
  );
};

export default EmotionAnalysisGraph; 
