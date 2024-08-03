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
import OverviewBlocks from '../components/OverviewBlocks';
import SentimentAnalysisPieChart from '../components/SentimentAnalysisPieChart';
import EmotionAnalysisGraph from '../components/EmotionAnalysisGraph';
import ProductImage from '../components/ProductImage';
import ProductInfo from '../components/ProductInfo';
import KeyTopics from '../components/KeyTopics';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import AveragePositivityRatings from '../components/AveragePositivityRatings'; // Import the new component
import SarcasmAnalysisPieChart from '../components/SarcasmAnalysisPieChart';
import LikeButton from '../components/LikeButton'; // Import the LikeButton component


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

    const isAmazonProductPage = /^https?:\/\/(www\.)?amazon\.[a-z\.]{2,6}(\/d\/|\/dp\/|\/gp\/product\/)/.test(reportId); // Check if URL is Amazon product page
    const encodedUrl = encodeURIComponent(reportId); // Encode URL for API request
    const [currentPhase, setCurrentPhase] = useState(0); // State for current phase of report
    const phases = ['View Analysis Report Dashboard', 'View Report Product Comments', 'View Report Key Topics']; // Phases of report
    const icons = ['bookcase.png', 'speechbubble.png', 'keytopics.png'];

    const handleNext = () => setCurrentPhase((prev) => (prev + 1) % phases.length);
    const handlePrev = () => setCurrentPhase((prev) => (prev - 1 + phases.length) % phases.length);

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

    const renderReviewSections = () => {
        if (!data) return null;
    
        const { summary, key_topics, monthlyRatings } = data;
    
        return (
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4" style={{ marginTop: '-140px' }}>
                {/* Right-side container for larger screens, moves above the main content on smaller screens */}
                <ProductInfo summary={summary} className="xl:col-span-1"/>
               
                {/* Main content container */}
                <div className="xl:col-span-4 container mx-auto p-4 rounded-lg">
                    {currentPhase === 0 && (
                        <>
                            <OverviewBlocks summary={summary} />
                            <LikeButton reportId={reportId} /> {/* Use the LikeButton component */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <div className="col-span-2 bg-white p-4 m-2 rounded-lg shadow-md text-center min-h-[150px] border-black border">
                                    <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>AI Generated Summary</h4>
                                    <p>{data.aiSummary.longSummary}</p>
                                </div>
                                <div className="col-span-3 bg-white m-2 rounded-lg shadow-md text-center min-h-[150px] border-black border">
                                <SentimentAnalysisPieChart summary={summary} />
                                </div>
                                <div className="col-span-3 bg-white p-4 m-2 rounded-lg shadow-md text-center min-h-[150px] border-black border"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <SentimentAnalysisPieChart summary={summary} />
                                <SarcasmAnalysisPieChart summary={summary} />
                                <SentimentAnalysisPieChart summary={summary} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-1">
                                <EmotionAnalysisGraph summary={summary} />
                                <TrendingCommentTopics keyTopics={data.key_topics} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1">
                                <AveragePositivityRatings monthlyRatings={monthlyRatings} />
                            </div>
                        </>
                    )}
                    {currentPhase === 1 && (
                        <div className="bg-white p-6 mb-6 mt-2 rounded-lg shadow-md border-black border overflow-auto" style={{ marginTop: '40px' }}>
                            <ReviewList reviews={data.reviews} />
                        </div>
                    )}
                    {currentPhase === 2 && (
                        <div className="bg-white p-6 mb-6 mt-2 rounded-lg shadow-md border-black border overflow-auto" style={{ marginTop: '40px' }}>
                            <KeyTopics
                                keyTopics={data.key_topics}
                                keyTopicsFilter={keyTopicsFilter}
                                showKeyTopicsFilterOptions={showKeyTopicsFilterOptions}
                                showAllKeyTopics={showAllKeyTopics}
                                expandedTopics={expandedTopics}
                                toggleKeyTopicsFilterOptions={toggleKeyTopicsFilterOptions}
                                setKeyTopicsFilter={setKeyTopicsFilter}
                                toggleShowMoreComments={toggleShowMoreComments}
                                toggleShowAllKeyTopics={toggleShowAllKeyTopics}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    };    

    if (data !== null) {
        return (
            <div className="bg-custom-gray  flex flex-col min-h-screen">
                <Header />
                <div className="bg-custom-darkgray" style={{ width: '100vw', height: '150px' }}>
                    <div className="bg-custom-darkgray flex items-center justify-between mx-auto mt-4 px-8" style={{ width: '90vw', maxWidth: '1580px' }}>
                        <button
                            onClick={handlePrev}
                            className="flex items-center bg-white text-black px-4 py-2 rounded-lg shadow-md focus:outline-none justify-start"
                            style={{ width: '200px', height: '60px' }}
                        >
                            <FaArrowLeft className="mr-2" />
                            <span className="hidden lg:block">
                                {currentPhase === 1 ? "View Analysis Report Dashboard" : currentPhase === 2 ? "View Product Reviews" : "View Report Key Topics"}
                            </span>
                        </button>
                        <div className="flex items-center space-x-4">
                            <h1 className="text-white text-3xl" style={{ fontFamily: 'Oswald, sans-serif' }}>{phases[currentPhase]}</h1>
                            <img src={process.env.PUBLIC_URL + `../images/${icons[currentPhase]}`} alt={phases[currentPhase]} className="w-10 h-10" />
                        </div>
                        <button
                            onClick={handleNext}
                            className="flex items-center bg-white text-black px-4 py-2 rounded-lg shadow-md focus:outline-none justify-end"
                            style={{ width: '200px', height: '60px' }}
                        >
                            <span className="hidden lg:block">
                                {currentPhase === 0 ? "View Product Reviews" : currentPhase === 1 ? "View Report Key Topics" : "View Analysis Report Dashboard"}
                            </span>
                            <FaArrowRight className="ml-2" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center flex-grow mt-4 relative">
                    <Container.Outer className="w-full max-w-[1580px] absolute-center" showIcon={false} showHeader={false}>
                        <Container.Inner className="w-full">
                            {isLoading ? renderLoading() : renderReviewSections()}
                        </Container.Inner>
                    </Container.Outer>
                </div>
                <Footer />
            </div>
        );
    }
    
    
    
    
    else if (data === null) {
        <div>
            <Header />
            <SearchBar />
            <Container.Outer className="absolute left-1/2 transform -translate-x-1/2" customStyles={{ padding: '20px', margin: '20px', width: '100%', maxWidth: '1580px' }} showIcon={false} showHeader={false}>
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
            <Container.Outer className="absolute left-1/2 transform -translate-x-1/2" customStyles={{ padding: '20px', margin: '20px', width: '100%', maxWidth: '1580px' }} showIcon={false} showHeader={false}>
                <Container.Inner className="w-full mx-auto">
                    {data ? renderReviewSections() : <p>Our server had not responded</p>}
                </Container.Inner>
            </Container.Outer>
        </div>
    }
}
    
    
    export default NewPage;
