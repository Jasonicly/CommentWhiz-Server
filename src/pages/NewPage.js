import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import Footer from "../components/Footer";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import axios from 'axios';
import EnhancedRating from '../components/EnhancedRating';
import ReviewList from '../components/ReviewList';
import TrendingCommentTopics from '../components/TrendingCommentTopics';
import AveragePositivityRatings from '../components/AveragePositivityRatings'; // Import the new component

function NewPage() {
    const [showDetails, setShowDetails] = useState(false); // State for showing product details
    const [data, setData] = useState(null); // State for data from WebSocket
    const [showAllKeyTopics, setShowAllKeyTopics] = useState(false); // State for showing all key topics
    const [isLoading, setIsLoading] = useState(false); // State for loading circle
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




    const toggleKeyTopicsFilterOptions = () => { // Toggle show collapsible key topics filter options
        setShowKeyTopicsFilterOptions(!showKeyTopicsFilterOptions);
    };
    

    const toggleDetails = () => { // Toggle show details of product
        setShowDetails(!showDetails);
    };

    const toggleShowAllKeyTopics = () => { // Toggle show all key topics of product
        setShowAllKeyTopics(!showAllKeyTopics);
    };


    const toggleShowMoreComments = (topic) => { // Toggle show more comments for key topic
        setExpandedTopics(prev => ({
            ...prev,
            [topic]: !prev[topic]
        }));
    };

    const COLORS = ['#87c187', '#F08080', '#ffd966']; // Colors for PieChart 



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

        const { summary, key_topics, monthlyRatings } = data; // Destructure data

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
                    <div className="flex items-center justify-center p-8 mb-4 rounded-lg bg-custom-gray border-t border-l border-r border-black">
                        <div className="flex text-4xl font-bold text-black max-w-6xl">
                            {summary["Product Name"]}
                        </div>
                        <Button
                            onClick={toggleDetails}
                            text={!showDetails ? "View Details" : "View Less"}
                            className="w-auto ml-4 min-w-[125px]"
                        />
                    </div>
                    {showDetails && (
                        <div className="flex items-center justify-center -mt-6 mb-4 pt-2 bg-custom-gray border-b border-l border-r border-black rounded-b-lg">
                            <div className="w-full bg-custom-beige p-4 mb-8 rounded-xl shadow-md mx-auto" style={{ maxWidth: '900px' }}>
                                <ul className="list-disc list-inside">
                                    {summary["Product Details"].split(', ').map((detail, index) => (
                                        <li key={index} className="text-1xl mb-1">
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-custom-gray container mx-auto border border-black p-4 rounded-lg">
                    <div className="bg-gray-100 p-2 rounded border-2 border-black">
                        <h3 className="text-2xl font-bold text-center">Analysis Overview</h3>
                    </div>
                    <div className="bg-custom-gray flex justify-between items-center">
                        <div className="flex flex-wrap justify-center mx-auto">
                            <div className="bg-gray-100 pt-4 pb-4 p-2 my-5 mx-2 min-w-[250px] flex flex-col items-center justify-center border border-black rounded-full">
                                <h4 className="mb-2 text-center">Number of Reviews</h4>
                                <span>{summary["Number of Reviews"]}</span>
                            </div>
                            <div className="bg-gray-100 pt-4 pb-4 p-2 my-5 mx-2 min-w-[250px] flex flex-col items-center justify-center border border-black rounded-full">
                                <h4 className="mb-2 text-center">Number of Positive Reviews</h4>
                                <span>{summary["Number of Positive Reviews"]}</span>
                            </div>
                            <div className="bg-gray-100 pt-4 pb-4 p-2 my-5 mx-2 min-w-[250px] flex flex-col items-center justify-center border border-black rounded-full">
                                <h4 className="mb-2 text-center">Number of Negative Reviews</h4>
                                <span>{summary["Number of Negative Reviews"]}</span>
                            </div>
                            <div className="bg-gray-100 pt-4 pb-4 p-2 my-5 mx-2 min-w-[250px] flex flex-col items-center justify-center border border-black rounded-full">
                                <h4 className="mb-2 text-center">Number of Neutral Reviews</h4>
                                <span>{summary["Number of Neutral Reviews"]}</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="col-span-2 bg-custom-beige p-4 m-2 rounded-lg shadow-md text-center min-h-[150px]">
                            <h4 className="text-xl font-semibold mb-2">AI Generated Summary</h4>
                            <p>Here is a summary of key points. Here is a summary of key points...</p>
                        </div>
                        <EnhancedRating originalRating={2.1} enhancedRating={summary["Enhanced Rating"]} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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
                        <div className="bg-custom-beige p-4 m-2 rounded-lg shadow-md text-center flex flex-col justify-center items-center">
                            <h4 className="text-xl font-semibold mb-2">Bots Detected</h4>
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

                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-1">
                        <div className="bg-custom-beige p-4 m-2 rounded-lg shadow-md text-center border-1 border-black flex flex-col items-center justify-center min-w-[550px]">
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

                        <TrendingCommentTopics keyTopics={data.key_topics} />


                    </div>

                    <div className="bg-custom-beige p-6 mb-6 m-2 rounded-lg shadow-md">
                        <AveragePositivityRatings monthlyRatings={monthlyRatings} />
                    </div>

                    <div className="bg-custom-beige p-6 mb-6 m-2 rounded-lg shadow-md">
                        <ReviewList reviews={data.reviews} />
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
                <Container.Outer className="absolute left-1/2 transform -translate-x-1/2" customStyles={{width: '100%', maxWidth: '1400px'}} showIcon={false} showHeader={false}>
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
