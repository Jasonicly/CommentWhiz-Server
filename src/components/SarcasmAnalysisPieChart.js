import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const SarcasmAnalysisDashboard = ({ summary }) => {
    const totalReviews = summary["Number of Reviews"];
    const sarcasticComments = summary["Number of Sarcastic Comments"];
    const sarcasmPercentage = Math.round((sarcasticComments / totalReviews) * 100) / 100; // Convert to decimal for gauge

    const option = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '75%'],
                radius: '100%',
                min: 0,
                max: 1,
                splitNumber: 8,
                axisLine: {
                    lineStyle: {
                        width: 6,
                        color: [
                            [0.25, '#7CFFB2'],
                            [0.5, '#58D9F9'],
                            [0.75, '#FDDD60'],
                            [1, '#FF6E76']
                        ]
                    }
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 15,
                    offsetCenter: [0, '-60%'],
                    itemStyle: {
                        color: '#000000'
                    }
                },
                axisTick: {
                    length: 12,
                    lineStyle: {
                        color: 'auto',
                        width: 2
                    }
                },
                splitLine: {
                    length: 20,
                    lineStyle: {
                        color: 'auto',
                        width: 2
                    }
                },
                axisLabel: {
                    color: '#464646',
                    fontSize: 15,
                    distance: -50,
                    rotate: 'tangential',
                    formatter: function (value) {
                        if (value === 0.875) {
                            return 'Miguel';
                        } else if (value === 0.625) {
                            return 'Jonathan';
                        } else if (value === 0.375) {
                            return 'Wei Liang';
                        } else if (value === 0.125) {
                            return 'Thu Ta';
                        }
                        return '';
                    }
                },
                title: {
                    offsetCenter: [0, '20%'],
                    fontSize: 20
                },
                detail: {
                    fontSize: 50,
                    offsetCenter: [0, '-15%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return Math.round(value * 100) + '%';
                    },
                    color: 'inherit'
                },
                data: [
                    {
                        value: sarcasmPercentage,
                        name: 'Sarcasm Rating'
                    }
                ]
            }
        ]
    };

    return (
        <div className="bg-white m-2 rounded-lg text-left flex flex-col items-left">
            <div className="text-left">
                <h4 className="text-xl font-semibold text-left" style={{ fontFamily: "'Oswald', sans-serif" }}>Sarcasm Detection</h4>
            </div>
            <div className="flex flex-col items-center">
                <ReactECharts option={option} style={{ height: '200px', width: '100%' }} />
                <p className="text-sm text-center">of comments detected as sarcastic</p>
            </div>
        </div>
    );
};

export default SarcasmAnalysisDashboard;
