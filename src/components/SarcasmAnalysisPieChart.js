import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const SarcasmAnalysisPieChart = ({ summary }) => {
    const totalReviews = summary["Number of Reviews"];
    const sarcasticComments = summary["Number of Sarcastic Comments"];
    const nonSarcasticComments = totalReviews - sarcasticComments;

    const pieData = [
        { name: 'Sarcastic', value: sarcasticComments, count: sarcasticComments },
        { name: 'Non-Sarcastic', value: nonSarcasticComments, count: nonSarcasticComments }
    ];

    const COLORS = ['#87c187', '#F08080'];

    const renderCustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow">
                    <p className="label text-sm">{`${data.name}: ${data.count} (${((data.value / totalReviews) * 100).toFixed(2)}%)`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="bg-white p-4 m-2 rounded-lg shadow-md text-center flex flex-col justify-center items-center border-black border">
            <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Sarcasm Analysis</h4>
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

export default SarcasmAnalysisPieChart;
