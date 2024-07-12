import React from 'react';
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
            <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Sentiment Analysis</h4>
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

export default SentimentAnalysisPieChart;
