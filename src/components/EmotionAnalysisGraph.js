/*import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const EmotionAnalysisGraph = ({ summary }) => {
    const totalEmotions = summary["Number of Joy Emotions"] + summary["Number of Anger Emotions"] + summary["Number of Neutral Emotions"] + summary["Number of Sadness Emotions"] + summary["Number of Disgust Emotions"] + summary["Number of Surprise Emotions"];

    const barData = [
        { name: 'Joy', Count: summary["Number of Joy Emotions"], color: '#FFD700' },
        { name: 'Anger', Count: summary["Number of Anger Emotions"], color: '#FF4500' },
        { name: 'Neutral', Count: summary["Number of Neutral Emotions"], color: '#808080' },
        { name: 'Sadness', Count: summary["Number of Sadness Emotions"], color: '#1E90FF' },
        { name: 'Disgust', Count: summary["Number of Disgust Emotions"], color: '#32CD32' },
        { name: 'Surprise', Count: summary["Number of Surprise Emotions"], color: '#FFA500' }
    ];

    const topEmotion = barData.reduce((prev, current) => (prev.Count > current.Count) ? prev : current);

    const renderCustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const percentage = ((data.Count / totalEmotions) * 100).toFixed(1);
            return (
                <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow">
                    <p className="label text-sm">{`${data.name}`}</p>
                    <p className="label text-sm">{`Count: ${data.Count} (${percentage}%)`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="bg-white p-4 m-2 rounded-lg shadow-md text-center border-1 border-black flex flex-col items-center justify-center border-black border">
            <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Emotion Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={renderCustomTooltip} />
                    <Bar dataKey="Count" fill="#000000">
                        {barData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <h5 className="text-lg font-semibold mt-4">Top Emotion: {topEmotion.name}</h5>
        </div>
    );
};

export default EmotionAnalysisGraph;
*/

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
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
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

    // Clean up on unmount
    return () => {
      myChart.dispose();
    };
  }, [summary]);

  return (
    <div className="bg-white p-4 m-2 rounded-lg shadow-md text-center border-1 border-black flex flex-col items-center justify-center border-black border">
      <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Emotion Analysis</h4>
      <div ref={chartRef} style={{ width: '100%', height: 300 }}></div>
    </div>
  );
};

export default EmotionAnalysisGraph;



//<h5 className="text-lg font-semibold mt-4">Top Emotion: {barData.reduce((prev, current) => (prev.count > current.count) ? prev : current).name}</h5>
