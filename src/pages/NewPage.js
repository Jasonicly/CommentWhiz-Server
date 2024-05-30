import React, { useState } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import Footer from "../components/Footer";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function NewPage() {
    const [showDetails, setShowDetails] = useState(false);
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/process_reviews', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setData(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

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
                    <h3 className="text-2xl font-bold mb-4">Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-xl font-semibold mb-2">Summary</h4>
                            <ul className="list-disc list-inside">
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
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-xl font-semibold mb-2">Review Distribution</h4>
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={pieData}
                                    cx={200}
                                    cy={200}
                                    labelLine={false}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
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
                        <h2 className="text-xl font-bold text-white mr-2">Name of product</h2>
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
                            <p><strong>Colour:</strong> ....</p>
                            <p><strong>Connectivity technology:</strong>.....</p>
                            <p><strong>Special features:</strong> .....</p>
                            <p><strong>Movement detection technology:</strong> .....</p>
                            <p><strong>Number of buttons:</strong> .....</p>
                            <p><strong>Hand orientation:</strong> .....</p>
                            <p><strong>Model name:</strong> .....</p>
                            <p><strong>Item weight:</strong> .....</p>
                            <ul className="list-disc list-inside">
                                <li><strong>......</strong></li>
                                <li><strong>....</strong></li>
                                <li><strong>.....</strong></li>
                                <li><strong>.......</strong></li>
                            </ul>
                            <Button
                                onClick={toggleDetails}
                                text="View Less"
                                className="mt-4 w-auto"
                            />
                        </div>
                    )}
                </Container.Inner>
            </Container.Outer>
            <form onSubmit={handleSubmit} className="my-4 flex flex-col items-center">
                <input type="file" onChange={handleFileChange} className="mb-2" />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Upload</button>
            </form>
            {renderReviewSections()}
            <Footer />
        </div>
    );
}

export default NewPage;