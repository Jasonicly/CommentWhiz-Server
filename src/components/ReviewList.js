import React, { useState } from 'react';
import { Button } from './Button';

const ReviewList = ({ reviews }) => {
    const [showFilterOptions, setShowFilterOptions] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);
    const [selectedSentiments, setSelectedSentiments] = useState(['All Sentiments']);
    const [selectedEmotions, setSelectedEmotions] = useState(['All Emotions']);
    const [selectedRating, setSelectedRating] = useState(null);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const toggleFilterOptions = () => setShowFilterOptions(!showFilterOptions);
    const setFilterType = (filterType) => setActiveFilter(activeFilter === filterType ? null : filterType);

    const toggleShowAllReviews = () => setShowAllReviews(!showAllReviews);

    const handleSentimentClick = (sentiment) => {
        if (sentiment === 'All Sentiments') {
            setSelectedSentiments(['All Sentiments']);
        } else {
            if (selectedSentiments.includes('All Sentiments')) {
                setSelectedSentiments([sentiment]);
            } else if (selectedSentiments.includes(sentiment)) {
                setSelectedSentiments(selectedSentiments.filter(item => item !== sentiment));
            } else {
                setSelectedSentiments([...selectedSentiments, sentiment]);
            }
        }
    };

    const handleEmotionClick = (emotion) => {
        if (emotion === 'All Emotions') {
            setSelectedEmotions(['All Emotions']);
        } else {
            if (selectedEmotions.includes('All Emotions')) {
                setSelectedEmotions([emotion]);
            } else if (selectedEmotions.includes(emotion)) {
                setSelectedEmotions(selectedEmotions.filter(item => item !== emotion));
            } else {
                setSelectedEmotions([...selectedEmotions, emotion]);
            }
        }
    };

    const resetFilters = () => {
        setSelectedSentiments(['All Sentiments']);
        setSelectedEmotions(['All Emotions']);
        setSelectedRating(null);
    };

    const filteredReviews = reviews.filter(review => {
        const sentimentMatch = selectedSentiments.includes('All Sentiments') || selectedSentiments.includes(review.sentiment);
        const emotionMatch = selectedEmotions.includes('All Emotions') || selectedEmotions.includes(review.emotions);
        const ratingMatch = selectedRating === null || review['AI-rating'] === selectedRating;
        return sentimentMatch && emotionMatch && ratingMatch;
    });

    return (
        <div>
            <button onClick={toggleFilterOptions} className="mb-4 p-2 bg-custom-gray border border-black rounded" style={{ minWidth: '125px' }}>
                {showFilterOptions ? 'Hide Filters' : 'Show Filters'}
            </button>
            {showFilterOptions && (
                <div className="bg-gray-100 p-4 border border-black mb-4 rounded">
                <button onClick={resetFilters} className="absolute top-2 left-2 p-2 bg-custom-gray border border-black rounded">
                    Reset Filters
                </button>
                <div className="text-center mb-4">
                    <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
                    <div className="flex items-center justify-center mb-4 relative">
                        <button onClick={() => setFilterType('Sentiment')} className={`mx-2 p-2 rounded border-2 border-black ${activeFilter === 'Sentiment' ? 'bg-blue-500 text-white' : 'bg-custom-gray'}`}>Sentiment</button>
                        <button onClick={() => setFilterType('Emotion')} className={`mx-2 p-2 rounded border-2 border-black ${activeFilter === 'Emotion' ? 'bg-blue-500 text-white' : 'bg-custom-gray'}`}>Emotion</button>
                        <button onClick={() => setFilterType('AI Rating')} className={`mx-2 p-2 rounded border-2 border-black ${activeFilter === 'AI Rating' ? 'bg-blue-500 text-white' : 'bg-custom-gray'}`}>AI Rating</button>
                    </div>
                </div>

                {activeFilter === 'Sentiment' && (
                    <div className="flex justify-center">
                        <div className="inline-flex items-center justify-center mb-4 border-2 border-black p-5">
                            <button onClick={() => handleSentimentClick('Positive')} className={`mx-2 p-2 rounded border border-black ${selectedSentiments.includes('Positive') ? 'bg-green-500 text-white' : 'bg-custom-gray'}`}>Positive</button>
                            <button onClick={() => handleSentimentClick('Negative')} className={`mx-2 p-2 rounded border border-black ${selectedSentiments.includes('Negative') ? 'bg-red-500 text-white' : 'bg-custom-gray'}`}>Negative</button>
                            <button onClick={() => handleSentimentClick('Neutral')} className={`mx-2 p-2 rounded border border-black ${selectedSentiments.includes('Neutral') ? 'bg-yellow-500 text-white' : 'bg-custom-gray'}`}>Neutral</button>
                            <button onClick={() => handleSentimentClick('All Sentiments')} className={`mx-2 p-2 rounded border border-black ${selectedSentiments.includes('All Sentiments') ? 'bg-blue-500 text-white' : 'bg-custom-gray'}`}>All Sentiments</button>
                        </div>
                    </div>
                )}

                {activeFilter === 'Emotion' && (
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-4 justify-center mb-4 border-2 border-black p-5">
                            {['Joy', 'Anger', 'Neutral', 'Sadness', 'Disgust', 'Surprise'].map((emotion, index) => {
                                let bgColor = 'bg-gray-200';
                                if (selectedEmotions.includes(emotion.toLowerCase())) {
                                    switch (emotion.toLowerCase()) {
                                        case 'anger':
                                            bgColor = 'bg-red-500';
                                            break;
                                        case 'disgust':
                                            bgColor = 'bg-green-500';
                                            break;
                                        case 'joy':
                                            bgColor = 'bg-yellow-500';
                                            break;
                                        case 'neutral':
                                            bgColor = 'bg-gray-500';
                                            break;
                                        case 'sadness':
                                            bgColor = 'bg-blue-300';
                                            break;
                                        case 'surprise':
                                            bgColor = 'bg-purple-300';
                                            break;
                                        default:
                                            bgColor = 'bg-gray-100';
                                    }
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleEmotionClick(emotion.toLowerCase())}
                                        className={`mx-2 p-2 rounded border border-black ${bgColor} text-black`}
                                    >
                                        {emotion}
                                    </button>
                                );
                            })}
                            <button onClick={() => handleEmotionClick('All Emotions')} className={`mx-2 p-2 rounded border border-black ${selectedEmotions.includes('All Emotions') ? 'bg-blue-500 text-white' : 'bg-custom-gray'}`}>All Emotions</button>
                        </div>
                    </div>
                )}

                {activeFilter === 'AI Rating' && (
                    <div className="flex justify-center">
                        <div className="inline-flex items-center justify-center mb-4 border-2 border-black p-5">
                            {[1, 2, 3, 4, 5].map(star => (
                                <svg
                                    key={star}
                                    onClick={() => setSelectedRating(star)}
                                    className={`mx-2 w-8 h-8 ${selectedRating >= star ? 'text-yellow-500' : 'text-gray-500'} cursor-pointer`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M9.049.927C9.433.292 10.567.292 10.951.927l2.364 4.787 5.288.768c.663.097.93.912.448 1.379L15.949 11.5l.898 5.24c.113.657-.578 1.154-1.157.846L10 15.347l-4.69 2.46c-.579.308-1.27-.189-1.157-.846l.898-5.24-3.843-3.64c-.483-.467-.215-1.282.448-1.38l5.288-.767L9.049.927z" />
                                </svg>
                            ))}
                            <button onClick={() => setSelectedRating(null)} className={`mx-2 p-2 rounded border border-black ${selectedRating === null ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>All AI Ratings</button>
                        </div>
                    </div>
                )}
            </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredReviews.slice(0, showAllReviews ? filteredReviews.length : 4).map((review, index) => (
                    <div key={index} className="p-4 rounded-lg border-black border shadow-md mb-4">
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
    );
};

export default ReviewList;
