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

const CommentCategories = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const categories = [
      'delivery', 
      'service', 
      'price', 
      'value', 
      'quality', 
      'usage_performance', 
      'overall_satisfaction'
    ];

    const positiveData = [];
    const negativeData = [];
    const neutralData = [];

    categories.forEach(category => {
      const categoryData = data[category];
      positiveData.push(categoryData.sentiment.positive);
      negativeData.push(categoryData.sentiment.negative);
      neutralData.push(categoryData.sentiment.neutral);
    });

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Positive', 'Negative', 'Neutral']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%', // Increase bottom margin to provide more space for labels
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [
          'Delivery',
          'Service',
          'Price',
          'Value',
          'Quality',
          'Performance',
          'Overall Satisfaction'
        ],
        axisLabel: {
          interval: 0,
          rotate: 0, // Keep labels horizontal
          fontSize: 12, // Adjust font size if needed
          formatter: (value) => {
            // Wrap long labels
            return value.split(' ').join('\n');
          }
        }
      },
      yAxis: {
        type: 'value',
        name: 'Number of comments',
        nameTextStyle: {
          fontSize: 14, // Adjust font size if needed
          padding: [0, -170, 0, -100] // Adjust padding as needed
        },
        nameRotate: 0, // Rotate the name to be parallel to the axis
        namegap: 50
      },
      series: [
        {
          name: 'Positive',
          type: 'bar',
          stack: 'total',
          data: positiveData,
          itemStyle: {
            color: '#36A98A'
          }
        },
        {
          name: 'Negative',
          type: 'bar',
          stack: 'total',
          data: negativeData,
          itemStyle: {
            color: '#F85050'
          }
        },
        {
          name: 'Neutral',
          type: 'bar',
          stack: 'total',
          data: neutralData,
          itemStyle: {
            color: '#FCD12A'
          }
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
      window.removeEventListener('resize', resizeChart);
      myChart.dispose();
    };
  }, [data]);

  return (
    <div className="bg-white p-4 m-2 rounded-lg shadow-md text-center flex flex-col items-center justify-center">
      <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Comment Categories with Sentiment</h4>
      <div ref={chartRef} style={{ width: '100%', height: '300px', maxWidth: '100%' }}></div>
    </div>
  );
};

export default CommentCategories;
