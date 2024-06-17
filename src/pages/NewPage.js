import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import Footer from "../components/Footer";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

function NewPage() {
    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState(null);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [showAllKeyTopics, setShowAllKeyTopics] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            setIsLoading(true);
        };

        ws.onmessage = (event) => {
            const receivedData = JSON.parse(event.data);
            setData(receivedData);
            setIsLoading(false);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setIsLoading(false);
        };

        return () => {
            ws.close();
        };
    }, []);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const toggleShowAllReviews = () => {
        setShowAllReviews(!showAllReviews);
    };

    const toggleShowAllKeyTopics = () => {
        setShowAllKeyTopics(!showAllKeyTopics);
    };

    const COLORS = ['#87c187', '#F08080', '#ffd966'];

    const filteredReviews = data?.reviews?.filter(review => {
        if (filter === 'All') return true;
        return review.sentiment === filter;
    }) || [];

    const renderLoading = () => {
        return (
            <div className="flex items-center justify-center">
                <div className="loading-icon-container mt-20 justify-self-center" customStyles={{width: '100%'}}>
                    <div role="status" className="loading-icon">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        );
    };

    const renderReviewSections = () => {
        if (!data) return null;

        const { summary, reviews, key_topics } = data;

        const pieData = [
            { name: 'Positive', value: summary["Percentage of Positive Reviews"] },
            { name: 'Negative', value: summary["Percentage of Negative Reviews"] },
            { name: 'Neutral', value: summary["Percentage of Neutral Reviews"] },
        ];

        const barData = [
            { name: 'Joy', value: summary["Number of Joy Emotions"], color: '#FFD700' },
            { name: 'Anger', value: summary["Number of Anger Emotions"], color: '#FF4500' },
            { name: 'Neutral', value: summary["Number of Neutral Emotions"], color: '#808080' },
            { name: 'Sadness', value: summary["Number of Sadness Emotions"], color: '#1E90FF' },
            { name: 'Disgust', value: summary["Number of Disgust Emotions"], color: '#32CD32' },
            { name: 'Surprise', value: summary["Number of Surprise Emotions"], color: '#FFA500' }
        ];

        const topEmotion = barData.reduce((prev, current) => (prev.value > current.value) ? prev : current);

        return (
            <div className="bg-gray-200 container mx-auto" style={{ maxWidth: '1400px', margin: '32px 0' }}>
                <div className="bg-gray-300 p-0 rounded-lg mb-6">
                    <div className="bg-white flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold pl-10 pr-10 text-center">Analysis Overview</h3>
                        <div className="flex">
                            <div className="bg-gray-200 pt-4 pb-4 p-2 flex flex-col items-center justify-center">
                                <h4 className="mb-2 text-center">Number of Reviews</h4>
                                <span>{summary["Number of Reviews"]}</span>
                            </div>
                            <div className="bg-gray-300 pt-4 pb-4 p-2 flex flex-col items-center justify-center">
                                <h4 className="mb-2 text-center">Number of Positive Reviews</h4>
                                <span>{summary["Number of Positive Reviews"]}</span>
                            </div>
                            <div className="bg-gray-200 pt-4 pb-4 p-2 flex flex-col items-center justify-center">
                                <h4 className="mb-2 text-center">Number of Negative Reviews</h4>
                                <span>{summary["Number of Negative Reviews"]}</span>
                            </div>
                            <div className="bg-gray-100 pt-4 pb-4 p-2 flex flex-col items-center justify-center">
                                <h4 className="mb-2 text-center">Number of Neutral Reviews</h4>
                                <span>{summary["Number of Neutral Reviews"]}</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-custom-white p-4 m-2 rounded-lg shadow-md text-center border-1 border-black">
                            <h4 className="text-xl font-semibold mb-2">Summary</h4>
                            <p>Here is a summary of key points. Here is a summary of key points...</p>
                        </div>
                        <div className="bg-custom-white p-4 m-2 rounded-lg shadow-md text-center flex flex-col justify-center items-center border-1 border-black">
                            <h4 className="text-xl font-semibold mb-2">Enhanced Rating</h4>
                            <div className="text-4xl font-bold">
                                {summary["Enhanced Rating"]}
                            </div>
                        </div>
                        <div className="bg-custom-white p-4 m-2 rounded-lg shadow-md text-center flex flex-col justify-center items-center border-1 border-black">
                            <h4 className="text-xl font-semibold mb-2">Sentiment Analysis</h4>
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
                                <Tooltip />
                                <Legend
                                    wrapperStyle={{
                                        paddingTop: '20px'
                                    }}
                                />
                            </PieChart>
                        </div>
                        <div className="bg-custom-white p-4 m-2 rounded-lg shadow-md text-center flex flex-col justify-center items-center border-1 border-black">
                            <h4 className="text-xl font-semibold mb-2">Sarcasm Analysis</h4>
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
                                <Tooltip />
                                <Legend
                                    wrapperStyle={{
                                        paddingTop: '20px'
                                    }}
                                />
                            </PieChart>
                        </div>
                    </div>
                    <div className="bg-custom-white p-4 m-2 rounded-lg shadow-md text-center border-1 border-black flex flex-col items-center justify-center">
                        <h4 className="text-xl font-semibold mb-2">Emotion Analysis</h4>
                        <BarChart width={600} height={300} data={barData} style={{ display: 'flex', justifyContent: 'center' }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#82ca9d">
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                        <h5 className="text-lg font-semibold mt-4">Top Emotion: {topEmotion.name}</h5>
                    </div>
                </div>

                <div className="bg-custom-white p-6 mb-6 m-2 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-4">Reviews</h3>
                    <div className="flex items-center mb-4">
                        <button onClick={() => setFilter('Positive')} className={`ml-4 p-2 rounded ${filter === 'Positive' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Positive</button>
                        <button onClick={() => setFilter('Negative')} className={`ml-2 p-2 rounded ${filter === 'Negative' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Negative</button>
                        <button onClick={() => setFilter('Neutral')} className={`ml-2 p-2 rounded ${filter === 'Neutral' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>Neutral</button>
                        <button onClick={() => setFilter('All')} className={`ml-2 p-2 rounded ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredReviews.slice(0, showAllReviews ? filteredReviews.length : 3).map((review, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                <p>{review.title}</p>
                                <p>{review.body}</p>
                                <p><strong>Sentiment:</strong> {review.sentiment}</p>
                                <p><strong>AI Rating:</strong> {review["AI-rating"]}</p>
                            </div>
                        ))}
                    </div>
                    {filteredReviews.length > 3 && (
                        <Button
                            onClick={toggleShowAllReviews}
                            text={showAllReviews ? 'Show Less' : 'Show More'}
                            className="mt-4"
                        />
                    )}
                </div>
                <div className="bg-custom-white p-6 mb-6 m-2 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold mb-4">Key Topics</h3>
                    {Object.keys(key_topics).slice(0, showAllKeyTopics ? Object.keys(key_topics).length : 3).map((topic, index) => (
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
                    {Object.keys(key_topics).length > 3 && (
                        <Button
                            onClick={toggleShowAllKeyTopics}
                            text={showAllKeyTopics ? 'Show Less' : 'Show More'}
                            className="mt-4"
                        />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div>
            <style>{`
                .loading-icon-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transform: translateY(-10%);
                }

                .loading-icon {
                    text-align: center;
                }
            `}</style>
            <Header />
            <SearchBar />
            <Container.Outer className="absolute left-1/2 transform -translate-x-1/2" customStyles={{ padding: '20px', margin: '20px', width: '100%', maxWidth: '1400px'}} showIcon={false} showHeader={false}>
                <Container.Inner className="w-full mx-auto">
                    <div className="flex items-center justify-center mb-8">
                        <h1 className="text-xl font-bold text-white mr-2 text-custom-blue"><strong>Kleenex Ultra Soft Bath Tissue, 200ct ,(Pack of 20) (packaging may vary)</strong></h1>
                        {!showDetails && (
                            <Button
                                onClick={toggleDetails}
                                text="View Details"
                                className="w-auto"
                            />
                        )}
                    </div>
                    {showDetails && (
                        <div className="w-full bg-white p-4 mb-8 rounded-lg shadow-md mx-auto" style={{ maxWidth: '700px' }}>
                            <p><strong>Brand:</strong> .....</p>
                            <p><strong>Description:</strong> Description of product......</p>
                            <Button
                                onClick={toggleDetails}
                                text="View Less"
                                className="mt-4 w-auto"
                            />
                        </div>
                    )}
                    {isLoading ? renderLoading() : renderReviewSections()}
            </Container.Inner>
        </Container.Outer>
        <Footer />
        </div>
    );
}

export default NewPage;
