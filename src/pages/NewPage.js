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
    const [selectedPhrase, setSelectedPhrase] = useState(null);

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

    useEffect(() => {
        if (data && data.key_topics && Object.keys(data.key_topics).length > 0) {
            const firstKey = Object.keys(data.key_topics)[0];
            setSelectedPhrase(firstKey);
        }
    }, [data]);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const toggleShowAllReviews = () => {
        setShowAllReviews(!showAllReviews);
    };

    const toggleShowAllKeyTopics = () => {
        setShowAllKeyTopics(!showAllKeyTopics);
    };

    const handlePhraseClick = (phrase) => {
        setSelectedPhrase(phrase);
    };

    const COLORS = ['#87c187', '#F08080', '#ffd966'];

    const filteredReviews = data?.reviews?.filter(review => {
        if (filter === 'All') return true;
        return review.sentiment === filter;
    }) || [];

    const renderLoading = () => {
        return (
            <div className="flex justify-center mt-20">
                <div className="loading-icon-container justify-self-center" customStyles={{width: '100%'}}>
                    <div role="status" className="loading-icon">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                <div className="fixed bottom-0">
                <Footer />
                </div>
            </div>
        );
    };

    const renderReviewSections = () => {
        if (!data) return null;

        const { summary, key_topics } = data;

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

        const sortedKeyTopics = Object.keys(key_topics)
    .sort((a, b) => key_topics[b].unique_comment_count - key_topics[a].unique_comment_count)
    .slice(0, 5);


        return (
            <div>
                <div>
                    <div className="flex items-center justify-center mb-8">
                        <div className="text-4xl font-bold text-black">
                        {summary["Product Name"]}
                        </div>
                        {!showDetails && (
                        <Button
                            onClick={toggleDetails}
                            text="View Details"
                            className="w-auto ml-4"
                        />
                        )}
                    </div>
                    {showDetails && (
                        <div className="w-full bg-white p-4 mb-8 rounded-lg shadow-md mx-auto" style={{ maxWidth: '900px' }}>
                            <ul className="list-disc list-inside">
                                {summary["Product Details"].split(', ').map((detail, index) => (
                                    <li key={index} className="text-1xl mb-1">
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                onClick={toggleDetails}
                                text="View Less"
                                className="mt-4 w-auto"
                            />
                        </div>
)}

                    </div>
                <div className="bg-custom-gray container mx-auto border border-black p-4" style={{ maxWidth: '1400px', margin: '32px 0' }}>
                    <div className="bg-custom-gray p-0 rounded-lg mb-6">
                        <div className="bg-custom-gray flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold pl-10 pr-10 text-center">Analysis Overview</h3>
                            <div className="flex">
                                <div className="bg-gray-100 pt-4 pb-4 p-2 mt-5 mb-5 flex flex-col items-center justify-center border border-black">
                                    <h4 className="mb-2 text-center">Number of Reviews</h4>
                                    <span>{summary["Number of Reviews"]}</span>
                                </div>
                                <div className="bg-gray-100 pt-4 pb-4 p-2 mt-5 mb-5 flex flex-col items-center justify-center border border-black">
                                    <h4 className="mb-2 text-center">Number of Positive Reviews</h4>
                                    <span>{summary["Number of Positive Reviews"]}</span>
                                </div>
                                <div className="bg-gray-100 pt-4 pb-4 p-2 mt-5 mb-5 flex flex-col items-center justify-center border border-black">
                                    <h4 className="mb-2 text-center">Number of Negative Reviews</h4>
                                    <span>{summary["Number of Negative Reviews"]}</span>
                                </div>
                                <div className="bg-gray-100 pt-4 pb-4 p-2 mt-5 mb-5 mr-5 flex flex-col items-center justify-center border border-black">
                                    <h4 className="mb-2 text-center">Number of Neutral Reviews</h4>
                                    <span>{summary["Number of Neutral Reviews"]}</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                            <div className="bg-custom-beige p-4 m-2 rounded-lg shadow-md text-center">
                                <h4 className="text-xl font-semibold mb-2">Summary</h4>
                                <p>Here is a summary of key points. Here is a summary of key points...</p>
                            </div>
                            <div className="bg-custom-beige p-4 m-2 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
                                <h4 className="text-xl font-semibold mb-2">Enhanced Rating</h4>
                                <div className="text-4xl font-bold">
                                    {summary["Enhanced Rating"]}
                                </div>
                            </div>
                            <div className="bg-custom-beige p-4 m-2 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
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
                            <div className="bg-custom-beige p-4 m-2 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1">
                            <div className="bg-custom-beige p-4 m-2 rounded-lg shadow-md text-center border-1 border-black flex flex-col items-center justify-center">
                                <h4 className="text-xl font-semibold mb-2">Emotion Analysis</h4>
                                <BarChart width={550} height={300} data={barData} style={{ display: 'flex', justifyContent: 'center' }}>
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

                            <div className="bg-custom-beige p-4 m-2 rounded-lg shadow-md text-center border-1 border-black flex flex-col items-center justify-center">
                                <h4 className="text-xl font-semibold mb-2">Key Topics</h4>
                                <div className="grid grid-cols-2" style={{ width: '100%' }}>
                                    <div className="w-full flex flex-col justify-around" style={{ minHeight: '400px' }}>
                                        {sortedKeyTopics.map((phrase, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handlePhraseClick(phrase)}
                                                className={`mb-2 w-10/12 mx-auto py-4 text-center ${selectedPhrase === phrase ? 'bg-custom-gray text-black' : 'bg-gray-500 text-white'}`}
                                            >
                                                {phrase}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="w-full overflow-auto" style={{ maxHeight: '400px' }}>
                                        {selectedPhrase && (
                                            <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-11/12 mx-auto" style={{ minHeight: '400px' }}>
                                                <h4 className="text-xl font-semibold">{selectedPhrase}</h4>
                                                <p><strong>Comment Count:</strong> {key_topics[selectedPhrase].unique_comment_count}</p>
                                                <ul className="list-disc list-inside">
                                                    {key_topics[selectedPhrase].comments.map((comment, idx) => (
                                                        <li key={idx}>
                                                            <p>{comment.body}</p>
                                                            {/* <p><strong>Sentiment:</strong> {comment.sentiment}</p> */}
                                                            {/* <p><strong>AI Rating:</strong> {comment["AI-rating"]}</p> */}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="bg-custom-beige p-6 mb-6 m-2 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold mb-4">Reviews</h3>
                            <div className="flex items-center mb-4">
                                <button onClick={() => setFilter('Positive')} className={`ml-2 p-2 rounded ${filter === 'Positive' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Positive</button>
                                <button onClick={() => setFilter('Negative')} className={`ml-2 p-2 rounded ${filter === 'Negative' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Negative</button>
                                <button onClick={() => setFilter('Neutral')} className={`ml-2 p-2 rounded ${filter === 'Neutral' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>Neutral</button>
                                <button onClick={() => setFilter('All')} className={`ml-2 p-2 rounded ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredReviews.slice(0, showAllReviews ? filteredReviews.length : 4).map((review, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                        <p>{review.title}</p>
                                        <p>{review.body}</p>
                                        <p><strong>Emotion:</strong> {review.emotions}</p>
                                        <p><strong>Sentiment:</strong> {review.sentiment}</p>
                                        <p><strong>AI Rating:</strong> {review["AI-rating"]}</p>
                                    </div>
                                ))}
                            </div>
                            {filteredReviews.length > 4 && (
                                <Button
                                    onClick={toggleShowAllReviews}
                                    text={showAllReviews ? 'Show Less' : 'Show More'}
                                    className="mt-4"
                                />
                            )}
                        </div>
                        <div className="bg-custom-beige p-6 mb-6 m-2 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold mb-4">Key Topics</h3>
                            {Object.keys(key_topics).slice(0, showAllKeyTopics ? Object.keys(key_topics).length : 4).map((topic, index) => (
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
                            {Object.keys(key_topics).length > 4 && (
                                <Button
                                    onClick={toggleShowAllKeyTopics}
                                    text={showAllKeyTopics ? 'Show Less' : 'Show More'}
                                    className="mt-4"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <Footer/>
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
                {isLoading ? renderLoading() : renderReviewSections()}
            </Container.Inner>
        </Container.Outer>
        </div>
    );
}

export default NewPage;
