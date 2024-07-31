import React from 'react';
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

export default AveragePositivityRatings;
