/*import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const SentimentAnalysisPieChart = ({ summary }) => {
    const totalReviews = summary["Number of Reviews"];
    const pieData = [
        { name: 'Positive', value: summary["Percentage of Positive Reviews"], count: summary["Number of Positive Reviews"] },
        { name: 'Negative', value: summary["Percentage of Negative Reviews"], count: summary["Number of Negative Reviews"] },
        { name: 'Neutral', value: summary["Percentage of Neutral Reviews"], count: summary["Number of Neutral Reviews"] },
    ];

    const COLORS = ['#87c187', '#F08080', '#ffd966'];

    const renderCustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow">
                    <p className="label text-sm">{`${data.name}: ${data.count} (${data.value}%)`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="bg-white p-4 m-2 rounded-lg shadow-md text-center flex flex-col justify-center items-center border-black border">
            <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Sentiment Analysis</h4>
            <PieChart width={200} height={250}>
                <Pie
                    data={pieData}
                    cx={90}
                    cy={90}
                    labelLine={false}
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={renderCustomTooltip} />
                <Legend
                    wrapperStyle={{
                        paddingTop: '20px'
                    }}
                />
            </PieChart>
        </div>
    );
};

export default SentimentAnalysisPieChart;*/

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart as EChartsPieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { LabelLayout } from 'echarts/features';

echarts.use([
  TooltipComponent,
  LegendComponent,
  EChartsPieChart,
  CanvasRenderer,
  LabelLayout
]);

const SentimentAnalysisPieChart = ({ summary }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'item'
      },
      /*legend: {
        orient: 'vertical',
        left: 'left',
        top: 'middle',
        textStyle: {
          fontSize: 12,
          fontFamily: "'Oswald', sans-serif"
        }
      },*/
      series: [
        {
          name: 'Sentiment Analysis',
          type: 'pie',
          radius: ['45%', '80%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 15,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: summary["Number of Positive Reviews"], name: 'Positive' },
            { value: summary["Number of Negative Reviews"], name: 'Negative' },
            { value: summary["Number of Neutral Reviews"], name: 'Neutral' }
          ]
        }
      ],
      color: ['#36A98A', '#E64545', '#FCD12A']
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [summary]);

  return (
    <div className="bg-white p-4 m-2 rounded-lg shadow-md text-center flex flex-col items-center border-black border">
      <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Sentiment Analysis</h4>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginRight: '20px', fontSize: '12px', fontFamily: "'Oswald', sans-serif" }}>
          <div className="legend-item" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '12px', height: '12px', backgroundColor: '#36A98A', display: 'inline-block', marginRight: '5px' }}></span>
            <span>Positive ({summary["Number of Positive Reviews"]})</span>
          </div>
          <div className="legend-item" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '12px', height: '12px', backgroundColor: '#F85050', display: 'inline-block', marginRight: '5px' }}></span>
            <span>Negative ({summary["Number of Negative Reviews"]})</span>
          </div>
          <div className="legend-item" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '12px', height: '12px', backgroundColor: '#FCD12A', display: 'inline-block', marginRight: '5px' }}></span>
            <span>Neutral ({summary["Number of Neutral Reviews"]})</span>
          </div>
        </div>
        <div ref={chartRef} style={{display: 'flex', width: 200, height: 200 }}></div>
      </div>
    </div>
  );
};

export default SentimentAnalysisPieChart;








