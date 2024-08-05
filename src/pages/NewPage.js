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
import PhraseCloud from '../components/PhraseCloud';
import OverviewBlocks from '../components/OverviewBlocks';
import SentimentAnalysisPieChart from '../components/SentimentAnalysisPieChart';
import EmotionAnalysisGraph from '../components/EmotionAnalysisGraph';
import ProductImage from '../components/ProductImage';
import ProductInfo from '../components/ProductInfo';
import KeyTopics from '../components/KeyTopics';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import AveragePositivityRatings from '../components/AveragePositivityRatings';
import SarcasmAnalysisPieChart from '../components/SarcasmAnalysisPieChart';
import LikeButton from '../components/LikeButton';
import CommentCategories from '../components/CommentCategories';
import TopicsVisual from '../components/TopicsVisual';

function NewPage() {
    const [showDetails, setShowDetails] = useState(false);
    const [data, setData] = useState(null);
    const [showAllKeyTopics, setShowAllKeyTopics] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [keyTopicsFilter, setKeyTopicsFilter] = useState('All Sentiments');
    const [showKeyTopicsFilterOptions, setShowKeyTopicsFilterOptions] = useState(false);
    const [expandedTopics, setExpandedTopics] = useState({});
    const { reportId } = useParams();
    console.log(reportId);

    const isAmazonProductPage = /^https?:\/\/(www\.)?amazon\.[a-z\.]{2,6}(\/d\/|\/dp\/|\/gp\/product\/)/.test(reportId);
    const encodedUrl = encodeURIComponent(reportId);
    const [currentPhase, setCurrentPhase] = useState(0);
    const phases = ['Analysis Report Dashboard', 'Report Product Comments'];
    const icons = ['bookcase.png', 'speechbubble.png'];

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

    const toggleKeyTopicsFilterOptions = () => {
        setShowKeyTopicsFilterOptions(!showKeyTopicsFilterOptions);
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const toggleShowAllKeyTopics = () => {
        setShowAllKeyTopics(!showAllKeyTopics);
    };

    const toggleShowMoreComments = (topic) => {
        setExpandedTopics(prev => ({
            ...prev,
            [topic]: !prev[topic]
        }));
    };

    const COLORS = ['#87c187', '#F08080', '#ffd966'];

    const renderLoading = () => {
        return (
            <div className="flex justify-center mt-20">
                <div className="loading-icon-container justify-self-center" customStyles={{ width: '100%' }}>
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

        const { summary, monthlyRatings, topics_with_sentiments, comment_category_sentiments } = data;

        return (
            <div className="grid grid-cols-1 xl:grid-cols-5" style={{ marginTop: '-150px' }}>
                <ProductInfo summary={summary} className="xl:col-span-1" />

                <div className="xl:col-span-4 container mx-auto p-4 rounded-lg">
                    {currentPhase === 0 && (
                        <>
                            <OverviewBlocks summary={summary} />
                            <div className="grid grid-cols-1 lg:grid-cols-10 md:grid-cols-1 gap-2">
                                <div className="col-span-10 lg:col-span-4 bg-white p-4 m-2 rounded-lg shadow-md text-left min-h-[150px]">
                                    <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>AI Generated Summary</h4>
                                    <p>{data.aiSummary.longSummary}</p>
                                </div>
                                <div className="col-span-5 lg:col-span-3 bg-white m-2 rounded-lg shadow-md text-center min-h-[150px]">
                                    <SentimentAnalysisPieChart summary={summary} />
                                </div>
                                <div className="col-span-5 lg:col-span-3 bg-white p-4 m-2 rounded-lg shadow-md text-left min-h-[150px]">
                                    <SarcasmAnalysisPieChart summary={summary} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2" style={{ gridTemplateColumns: '60% 40%' }}>
                                <CommentCategories data={comment_category_sentiments} style={{ width: '100%' }} />
                                <TopicsVisual topicsWithSentiments={topics_with_sentiments} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-1">
                                <EmotionAnalysisGraph summary={summary} />
                                <PhraseCloud keyTopics={data.key_phrases} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1 bg-white rounded-lg shadow-md m-2" style={{ maxHeight: '450px', minHeight: '300px' }}>
                                <AveragePositivityRatings monthlyRatings={monthlyRatings} />
                            </div>
                        </>
                    )}
                    {currentPhase === 1 && (
                        <div className="bg-white mb-6 mt-2 rounded-lg shadow-md overflow-auto" style={{ marginTop: '45px' }}>
                            <ReviewList reviews={data.reviews} />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (data !== null) {
        return (
            <div className="bg-custom-gray flex flex-col min-h-screen">
                <Header />
                <div className="bg-custom-darkgray" style={{ width: '100vw', height: '150px' }}>
                    <div className="bg-custom-darkgray flex items-center justify-between mx-auto mt-4 px-8" style={{ width: '90vw', maxWidth: '1580px' }}>
                        {currentPhase === 1 ? (
                            <button
                                onClick={handlePrev}
                                className="flex items-center bg-white text-black px-4 py-2 rounded-lg shadow-md focus:outline-none justify-start"
                                style={{ width: '200px', height: '60px' }}
                            >
                                <FaArrowLeft className="mr-2" />
                                <span className="">
                                    View Analysis Report Dashboard
                                </span>
                            </button>
                        ) : (
                            <div style={{ width: '200px', height: '60px' }}></div>
                        )}
                        <div className="flex items-center space-x-4">
                            <h1 className="text-white text-3xl" style={{ fontFamily: 'Oswald, sans-serif' }}>{phases[currentPhase]}</h1>
                            <img src={process.env.PUBLIC_URL + `../images/${icons[currentPhase]}`} alt={phases[currentPhase]} className="w-10 h-10" />
                        </div>
                        {currentPhase === 0 ? (
                            <button
                                onClick={handleNext}
                                className="flex items-center bg-white text-black px-4 py-2 rounded-lg shadow-md focus:outline-none justify-end"
                                style={{ width: '200px', height: '60px' }}
                            >
                                <span className="">
                                    View Product Reviews
                                </span>
                                <FaArrowRight className="ml-2" />
                            </button>
                        ) : (
                            <div style={{ width: '200px', height: '60px' }}></div>
                        )}
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
        return (
            <div>
                <Header />
                <SearchBar />
                <Container.Outer className="absolute left-1/2 transform -translate-x-1/2" customStyles={{ padding: '20px', margin: '20px', width: '100%', maxWidth: '1580px' }} showIcon={false} showHeader={false}>
                    <Container.Inner className="w-full mx-auto">
                        {data ? renderReviewSections() : <p>No report was found</p>}
                    </Container.Inner>
                </Container.Outer>
            </div>
        );
    }
    else {
        return (
            <div>
                <Header />
                <SearchBar />
                <Container.Outer className="absolute left-1/2 transform -translate-x-1/2" customStyles={{ padding: '20px', margin: '20px', width: '100%', maxWidth: '1580px' }} showIcon={false} showHeader={false}>
                    <Container.Inner className="w-full mx-auto">
                        {data ? renderReviewSections() : <p>Our server had not responded</p>}
                    </Container.Inner>
                </Container.Outer>
            </div>
        );
    }
}

export default NewPage;
