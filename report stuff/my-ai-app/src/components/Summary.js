import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './Summary.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Summary({ summary }) {
    const data = [
        { name: 'Positive', value: summary["Percentage of Positive Reviews"] },
        { name: 'Negative', value: summary["Percentage of Negative Reviews"] },
        { name: 'Neutral', value: summary["Percentage of Neutral Reviews"] },
    ];

    return (
        <div className="summary">
            <h2>Summary</h2>
            <div className="summary-content">
                <div className="summary-details">
                    <ul>
                        <li>Number of Reviews: {summary["Number of Reviews"]}</li>
                        <li>Number of Positive Reviews: {summary["Number of Positive Reviews"]}</li>
                        <li>Number of Negative Reviews: {summary["Number of Negative Reviews"]}</li>
                        <li>Number of Neutral Reviews: {summary["Number of Neutral Reviews"]}</li>
                        <li>Percentage of Positive Reviews: {summary["Percentage of Positive Reviews"]}%</li>
                        <li>Percentage of Negative Reviews: {summary["Percentage of Negative Reviews"]}%</li>
                        <li>Percentage of Neutral Reviews: {summary["Percentage of Neutral Reviews"]}%</li>
                        <li>Enhanced Rating: {summary["Enhanced Rating"]}</li>
                    </ul>
                </div>
                <div className="summary-chart">
                    <PieChart width={200} height={200}>
                        <Pie
                            data={data}
                            cx={100}
                            cy={100}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </div>
    );
}

export default Summary;
