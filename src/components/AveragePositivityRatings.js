/*import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer } from 'recharts';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`Month: ${monthNames[label - 1]}`}</p>
                <p className="intro">{`Average Rating: ${Math.round(payload[0].value * 100) / 100}`}</p>
            </div>
        );
    }

    return null;
};

const AveragePositivityRatings = ({ monthlyRatings }) => {
    if (!monthlyRatings || monthlyRatings.length === 0) {
        return <p>No data available</p>;
    }

    return (
        <div className="text-center">
            <h4 className="text-xl font-semibold mb-2">Average Positivity Ratings from {monthlyRatings[0].year} to {monthlyRatings[monthlyRatings.length - 1].year}</h4>
            <ResponsiveContainer width="100%" height={380}>
                <AreaChart data={monthlyRatings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="month"
                        tickFormatter={(tick, index) => {
                            if (index === 0) {
                                return monthlyRatings[0].year;
                            }
                            if (index === monthlyRatings.length - 1) {
                                return monthlyRatings[monthlyRatings.length - 1].year;
                            }
                            return '';
                        }}
                    >
                        <Label value="Timeline" offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis domain={[0, 5]}>
                        <Label value="Positivity Rating" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="averageRating" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AveragePositivityRatings; */


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
        nameGap: 50,  // Increased value to move the header further away
        axisLabel: {
          fontSize: 14,
          fontWeight: 'bold',
          interval: 'auto', // automatically adjust intervals
          rotate: 0, // no rotation
          formatter: value => {
            const [month, year] = value.split(' ');
            return `${month}\n${year}`; // split into two lines
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

    // Clean up on unmount
    return () => {
      myChart.dispose();
    };
  }, [monthlyRatings]);

  if (!monthlyRatings || monthlyRatings.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="text-center">
      <h4 className="text-xl font-semibold mb-2">Average Positivity Ratings from {monthlyRatings[0].year} to {monthlyRatings[monthlyRatings.length - 1].year}</h4>
      <div ref={chartRef} style={{ width: '100%', height: 380 }}></div>
    </div>
  );
};

export default AveragePositivityRatings;


