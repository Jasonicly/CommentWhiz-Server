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

    const resizeChart = () => {
      myChart.resize();
    };

    window.addEventListener('resize', resizeChart);

    return () => {
      window.removeEventListener('resize', resizeChart);
      myChart.dispose();
    };
  }, [summary]);

  return (
    <div className="bg-white p-4 m-2 rounded-lg text-left flex flex-col items-left">
      <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Sentiment Analysis</h4>
      <div className="pt-5 w-full" style={{ display: 'flex', alignItems: 'center', position: 'relative', top: '-50px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginRight: '10px', fontSize: '8px', fontFamily: "'Oswald', sans-serif" }}>
          <div className="legend-item" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '25px', height: '20px', backgroundColor: '#36A98A', display: 'inline-block', marginRight: '5px' }}></span>
            <span>Positive ({summary["Number of Positive Reviews"]})</span>
          </div>
          <div className="legend-item" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '25px', height: '20px', backgroundColor: '#F85050', display: 'inline-block', marginRight: '5px' }}></span>
            <span>Negative ({summary["Number of Negative Reviews"]})</span>
          </div>
          <div className="legend-item" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '25px', height: '20px', backgroundColor: '#FCD12A', display: 'inline-block', marginRight: '5px' }}></span>
            <span>Neutral ({summary["Number of Neutral Reviews"]})</span>
          </div>
        </div>
        <div ref={chartRef} style={{ display: 'flex', width: '100%', height: '200px', margin: 'auto', position: 'relative', top: '25px' }}></div>
      </div>
    </div>
  );
};

export default SentimentAnalysisPieChart;
