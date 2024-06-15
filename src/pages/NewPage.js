import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import Footer from "../components/Footer";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function NewPage() {
    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = (event) => {
            const receivedData = JSON.parse(event.data);
            setData(receivedData);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const COLORS = ['#90EE90', '#F08080', '#ADD8E6'];

    const renderReviewSections = () => {
        if (!data) return null;

        const { summary, reviews, key_topics } = data;

        const pieData = [
            { name: 'Positive', value: summary["Percentage of Positive Reviews"] },
            { name: 'Negative', value: summary["Percentage of Negative Reviews"] },
            { name: 'Neutral', value: summary["Percentage of Neutral Reviews"] },
        ];

        return (
            <div className="container mx-auto p-4">
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold">Analysis Overview</h3>
                        <div className="flex">
                            <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center justify-center mr-4">
                                <h4 className="mb-2">Number of Reviews</h4>
                                <span>{summary["Number of Reviews"]}</span>
                            </div>
                            <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center justify-center mr-4">
                                <h4 className="mb-2">Number of Positive Reviews</h4>
                                <span>{summary["Number of Positive Reviews"]}</span>
                            </div>
                            <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center justify-center mr-4">
                                <h4 className="mb-2">Number of Negative Reviews</h4>
                                <span>{summary["Number of Negative Reviews"]}</span>
                            </div>
                            <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center justify-center">
                                <h4 className="mb-2">Number of Neutral Reviews</h4>
                                <span>{summary["Number of Neutral Reviews"]}</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-center">
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <h4 className="text-xl font-semibold mb-2">Summary</h4>
                            <p>Here is a summary of key points.fffsdfsdfrethythyt hytrhthdh</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
                            <h4 className="text-xl font-semibold mb-2">Enhanced Rating</h4>
                            <div className="text-4xl font-bold">
                                {summary["Enhanced Rating"]}
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                            <div className="text-center">
                                <h4 className="text-xl font-semibold mb-2">Review Distribution</h4>
                                <PieChart width={300} height={300}>
                                    <Pie
                                        data={pieData}
                                        cx={150}
                                        cy={150}
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
                    <h3 className="text-2xl font-bold mb-4">Reviews</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                <p>{review.title}</p>
                                <p>{review.body}</p>
                                <p><strong>Sentiment:</strong> {review.sentiment}</p>
                                <p><strong>AI Rating:</strong> {review["AI-rating"]}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
                    <h3 className="text-2xl font-bold mb-4">Key Topics</h3>
                    {Object.keys(key_topics).map((topic, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                            <h4 className="text-xl font-semibold">{topic}</h4>
                            <p><strong>Unique Comment Count:</strong> {key_topics[topic].unique_comment_count}</p>
                            <ul className="list-disc list-inside">
                                {key_topics[topic].comments.map((comment, idx) => (
                                    <li key={idx}>
                                        <p>{comment.body}</p>
                                        <p><strong>Sentiment:</strong> {comment.sentiment}</p>
                                        <p><strong>AI Rating:</strong> {comment["AI-rating"]}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <SearchBar />
            <Container.Outer customStyles={{ backgroundColor: '#53a079', padding: '20px', margin: '20px' }} showIcon={false} showHeader={false}>
                <Container.Inner>
                    <div className="flex items-center mb-8">
                        <h1 className="text-xl font-bold text-white mr-2"><strong>Name of product</strong></h1>
                        {!showDetails && (
                            <Button
                                onClick={toggleDetails}
                                text="View Details"
                                className="w-auto"
                            />
                        )}
                    </div>
                    {showDetails && (
                        <div className="w-full bg-white p-4 rounded-lg shadow-md">
                            <p><strong>Brand:</strong> .....</p>
                            <p><strong>Description:</strong> Description of product......</p>
                            <Button
                                onClick={toggleDetails}
                                text="View Less"
                                className="mt-4 w-auto"
                            />
                        </div>
                    )}
                </Container.Inner>
            </Container.Outer>
            {renderReviewSections()}
            <Footer />
        </div>
    );
}

export default NewPage;
