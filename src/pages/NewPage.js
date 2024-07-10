import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import Footer from "../components/Footer";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import axios from 'axios';

function NewPage() {
    const [showDetails, setShowDetails] = useState(false); // State for showing product details
    const [data, setData] = useState(null); // State for data from WebSocket
    const [showAllReviews, setShowAllReviews] = useState(false); // State for showing all reviews
    const [showAllKeyTopics, setShowAllKeyTopics] = useState(false); // State for showing all key topics
    const [isLoading, setIsLoading] = useState(false); // State for loading circle
    const [selectedPhrase, setSelectedPhrase] = useState(null); // State for selected key topic for key topics section
    const [filter, setFilter] = useState('All Sentiments'); // State for filtering reviews by sentiment
    const [selectedRating, setSelectedRating] = useState(null); // State for selected AI rating
    const [selectedEmotion, setSelectedEmotion] = useState(null); // State for selected emotion
    const [showFilterOptions, setShowFilterOptions] = useState(false); // State for showing filter options
    const [keyTopicsFilter, setKeyTopicsFilter] = useState('All Sentiments'); // State for filtering key topics by sentiment
    const [showKeyTopicsFilterOptions, setShowKeyTopicsFilterOptions] = useState(false); // State for showing key topics filter options
    const [expandedTopics, setExpandedTopics] = useState({}); // State for expanded key topics for more comments
    //when they enter url from the website, ie they type: https://localhost:3000/report/1234

    const { reportId } = useParams(); // Get unique link for report  
    console.log(reportId);

    const isAmazonProductPage = /^https?:\/\/(www\.)?amazon\.[a-z\.]{2,6}(\/d\/|\/dp\/|\/gp\/product\/)/.test(reportId);


    const encodedUrl = encodeURIComponent(reportId);

    useEffect(() => {
        if (isAmazonProductPage) {
            setIsLoading(true);
            axios.get(`https://localhost:3001/checkDatabase/${encodedUrl}`)
                .then((response) => {
                    setData(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setIsLoading(false);
                });
        }

    }, [encodedUrl, isAmazonProductPage]);


    useEffect(() => { // Set selected phrase to first key topic phrase
        if (data && data.key_topics && Object.keys(data.key_topics).length > 0) {
            const firstKey = Object.keys(data.key_topics)[0];
            setSelectedPhrase(firstKey);
        }
    }, [data]);

    const toggleFilterOptions = () => { // Toggle show collapsible filter options for reviews
        setShowFilterOptions(!showFilterOptions);
    };
    
    const toggleKeyTopicsFilterOptions = () => { // Toggle show collapsible key topics filter options
        setShowKeyTopicsFilterOptions(!showKeyTopicsFilterOptions);
    };
    

    const toggleDetails = () => { // Toggle show details of product
        setShowDetails(!showDetails);
    };

    const toggleShowAllReviews = () => { // Toggle show all reviews of product
        setShowAllReviews(!showAllReviews);
    };

    const toggleShowAllKeyTopics = () => { // Toggle show all key topics of product
        setShowAllKeyTopics(!showAllKeyTopics);
    };

    const handlePhraseClick = (phrase) => { // Handle click on key topic phrase
        setSelectedPhrase(phrase);
    };

    const toggleShowMoreComments = (topic) => { // Toggle show more comments for key topic
         setExpandedTopics(prev => ({
            ...prev,
            [topic]: !prev[topic]
        }));
    };

    const COLORS = ['#87c187', '#F08080', '#ffd966']; // Colors for PieChart 


    const filteredReviews = data?.reviews?.filter(review => { // Filter reviews based on sentiment, rating, and emotion
        const sentimentMatch = filter === 'All Sentiments' || review.sentiment === filter;
        const ratingMatch = selectedRating === null || review["AI-rating"] === selectedRating;
        const emotionMatch = selectedEmotion === 'All Emotions' || selectedEmotion === null || review.emotions === selectedEmotion.toLowerCase();
        return sentimentMatch && ratingMatch && emotionMatch;
    }) || [];
    
    
    
    
    
    

    const renderLoading = () => { // Render loading icon
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

    const renderReviewSections = () => { // Render review section
        if (!data) return null;

        const { summary, key_topics } = data; // Destructure data

        const pieData = [ // Data for PieChart
            { name: 'Positive', value: summary["Percentage of Positive Reviews"] },
            { name: 'Negative', value: summary["Percentage of Negative Reviews"] },
            { name: 'Neutral', value: summary["Percentage of Neutral Reviews"] },
        ];

        const barData = [ // Data for BarChart
            { name: 'Joy', value: summary["Number of Joy Emotions"], color: '#FFD700' },
            { name: 'Anger', value: summary["Number of Anger Emotions"], color: '#FF4500' },
            { name: 'Neutral', value: summary["Number of Neutral Emotions"], color: '#808080' },
            { name: 'Sadness', value: summary["Number of Sadness Emotions"], color: '#1E90FF' },
            { name: 'Disgust', value: summary["Number of Disgust Emotions"], color: '#32CD32' },
            { name: 'Surprise', value: summary["Number of Surprise Emotions"], color: '#FFA500' }
        ];

        const topEmotion = barData.reduce((prev, current) => (prev.value > current.value) ? prev : current); // Culculation for emotion based on count

        const emotions = ['Joy', 'Anger', 'Neutral', 'Sadness', 'Disgust', 'Surprise']; // Emotions array for filtering

        const sortedKeyTopics = Object.keys(key_topics) // Sort key topics based on unique comment count
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

                            <button onClick={toggleFilterOptions} className="mb-4 p-2 bg-custom-gray border border-black rounded">
                                {showFilterOptions ? 'Close Options' : 'Filter Options'}
                            </button>

                            {showFilterOptions && (
                                <div className="bg-custom-gray p-4 border border-black mb-4 rounded">
                                    <div className="flex items-center mb-4">
                                        <button onClick={() => setFilter('Positive')} className={`ml-2 p-2 rounded ${filter === 'Positive' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Positive</button>
                                        <button onClick={() => setFilter('Negative')} className={`ml-2 p-2 rounded ${filter === 'Negative' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Negative</button>
                                        <button onClick={() => setFilter('Neutral')} className={`ml-2 p-2 rounded ${filter === 'Neutral' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>Neutral</button>
                                        <button onClick={() => setFilter('All Sentiments')} className={`ml-2 p-2 rounded ${filter === 'All Sentiments' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All Sentiments</button>
                                    </div>

                                    <div className="flex items-center mb-4">
                                        {['Anger', 'Disgust', 'Fear', 'Joy', 'Neutral', 'Sadness', 'Surprise'].map((emotion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedEmotion(emotion.toLowerCase())}
                                                className={`ml-2 p-2 rounded ${selectedEmotion === emotion.toLowerCase() ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
                                            >
                                                {emotion}
                                            </button>
                                        ))}
                                        <button onClick={() => setSelectedEmotion('All Emotions')} className={`ml-2 p-2 rounded ${selectedEmotion === 'All Emotions' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All Emotions</button>
                                    </div>

                                    <div className="flex items-center mb-4">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <svg
                                                key={star}
                                                onClick={() => setSelectedRating(star)}
                                                className={`w-8 h-8 ${selectedRating >= star ? 'text-yellow-500' : 'text-gray-200'} cursor-pointer`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M9.049.927C9.433.292 10.567.292 10.951.927l2.364 4.787 5.288.768c.663.097.93.912.448 1.379L15.949 11.5l.898 5.24c.113.657-.578 1.154-1.157.846L10 15.347l-4.69 2.46c-.579.308-1.27-.189-1.157-.846l.898-5.24-3.843-3.64c-.483-.467-.215-1.282.448-1.38l5.288-.767L9.049.927z" />
                                            </svg>
                                        ))}
                                        <button onClick={() => setSelectedRating(null)} className={`ml-2 p-2 rounded ${selectedRating === null ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All AI Ratings</button>
                                    </div>
                                </div>
                            )}

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

                            <button onClick={toggleKeyTopicsFilterOptions} className="mb-4 p-2 bg-custom-gray border border-black rounded">
                                {showKeyTopicsFilterOptions ? 'Close Options' : 'Filter Options'}
                            </button>

                            {showKeyTopicsFilterOptions && (
                                <div className="bg-custom-gray p-4 border border-black mb-4 rounded">
                                    <div className="flex items-center mb-4">
                                        <button onClick={() => setKeyTopicsFilter('Positive')} className={`ml-2 p-2 rounded ${keyTopicsFilter === 'Positive' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Positive</button>
                                        <button onClick={() => setKeyTopicsFilter('Negative')} className={`ml-2 p-2 rounded ${keyTopicsFilter === 'Negative' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Negative</button>
                                        <button onClick={() => setKeyTopicsFilter('Neutral')} className={`ml-2 p-2 rounded ${keyTopicsFilter === 'Neutral' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>Neutral</button>
                                        <button onClick={() => setKeyTopicsFilter('All Sentiments')} className={`ml-2 p-2 rounded ${keyTopicsFilter === 'All Sentiments' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All Sentiments</button>
                                    </div>
                                </div>
                            )}

                            {Object.keys(key_topics)
                                .sort((a, b) => key_topics[b].unique_comment_count - key_topics[a].unique_comment_count)
                                .filter(topic => {
                                    if (keyTopicsFilter === 'All Sentiments') return true;

                                    return key_topics[topic].comments.some(comment => comment.sentiment === keyTopicsFilter);
                                })
                                .slice(0, showAllKeyTopics ? Object.keys(key_topics).length : 4)
                                .map((topic, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                        <h4 className="text-xl font-semibold">{topic}</h4>
                                        <p><strong>Unique Comment Count:</strong> {key_topics[topic].unique_comment_count}</p>
                                        <ul className="list-disc list-inside">
                                            {key_topics[topic].comments.slice(0, expandedTopics[topic] ? key_topics[topic].comments.length : 3).map((comment, idx) => (
                                                <li key={idx}>
                                                    <p>{comment.body}</p>
                                                    <p><strong>Sentiment:</strong> {comment.sentiment}</p>
                                                    <p><strong>AI Rating:</strong> {comment["AI-rating"]}</p>
                                                </li>
                                            ))}
                                        </ul>
                                        {key_topics[topic].comments.length > 3 && (
                                            <Button
                                                onClick={() => toggleShowMoreComments(topic)}
                                                text={expandedTopics[topic] ? 'Collapse' : 'Expand'}
                                                className="mt-2 p-2 text-sm"
                                            />
                                        )}

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
    if (data !== null) {
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
    else if (data === null) {
        <div>
            <Header />
            <SearchBar />
            <Container.Outer className="absolute left-1/2 transform -translate-x-1/2" customStyles={{ padding: '20px', margin: '20px', width: '100%', maxWidth: '1400px' }} showIcon={false} showHeader={false}>
                <Container.Inner className="w-full mx-auto">
                    {data ? renderReviewSections() : <p>No report was found</p>}
                </Container.Inner>
            </Container.Outer>
        </div>
    }
    else {
        <div>
            <Header />
            <SearchBar />
            <Container.Outer className="absolute left-1/2 transform -translate-x-1/2" customStyles={{ padding: '20px', margin: '20px', width: '100%', maxWidth: '1400px' }} showIcon={false} showHeader={false}>
                <Container.Inner className="w-full mx-auto">
                    {data ? renderReviewSections() : <p>Our server had not responded</p>}
                </Container.Inner>
            </Container.Outer>
        </div>
    }
}
    
    
    export default NewPage;
