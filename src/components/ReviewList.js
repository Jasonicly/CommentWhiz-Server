import React, { useState } from 'react';
import { Button } from './Button';

const ReviewList = ({ reviews }) => {
    const [selectedSentiment, setSelectedSentiment] = useState('All Sentiments');
    const [selectedEmotion, setSelectedEmotion] = useState('All Emotions');
    const [selectedRating, setSelectedRating] = useState('All Ratings');
    const [showAllReviews, setShowAllReviews] = useState(false);

    const handleSentimentChange = (e) => setSelectedSentiment(e.target.value);
    const handleEmotionChange = (e) => setSelectedEmotion(e.target.value);
    const handleRatingChange = (e) => setSelectedRating(e.target.value);

    const resetFilters = () => {
        setSelectedSentiment('All Sentiments');
        setSelectedEmotion('All Emotions');
        setSelectedRating('All Ratings');
    };

    const filteredReviews = reviews.filter(review => {
        const sentimentMatch = selectedSentiment === 'All Sentiments' || selectedSentiment === review.sentiment;
        const emotionMatch = selectedEmotion === 'All Emotions' || selectedEmotion.toLowerCase() === review.emotions.toLowerCase();
        const ratingMatch = selectedRating === 'All Ratings' || review['AI-rating'] === parseInt(selectedRating);
        return sentimentMatch && emotionMatch && ratingMatch;
    });

    const toggleShowAllReviews = () => setShowAllReviews(!showAllReviews);

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {Array(fullStars).fill().map((_, i) => <span key={`full-${i}`}>&#9733;</span>)}
                {halfStar && <span>&#9733;</span>}
                {Array(emptyStars).fill().map((_, i) => <span key={`empty-${i}`}>&#9734;</span>)}
            </>
        );
    };

    const sentimentColors = {
        Positive: 'text-green-500',
        Negative: 'text-red-500',
        Neutral: 'text-yellow-500'
    };

    const sentimentEmojis = {
        Positive: '👍',
        Negative: '👎',
        Neutral: '😐'
    };

    const emotionEmojis = {
        joy: '😊',
        anger: '😠',
        neutral: '😐',
        sadness: '😢',
        disgust: '🤢',
        surprise: '😮'
    };

    const categories = ['Price', 'Performance', 'Overall Satisfaction']; // Add more categories as needed

    return (
        <div>
            <div className="bg-custom-green mb-4 rounded relative pb-5">
                <button onClick={resetFilters} className="absolute top-2 left-2 p-2 bg-custom-gray border border-black rounded">
                    Reset Filters
                </button>
                <div className="text-center mb-4">
                    <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
                    <div className="flex items-center justify-center mb-4 space-x-4">
                        <label className="font-semibold text-white">Filter by:</label>
                        <select value={selectedSentiment} onChange={handleSentimentChange} className="p-2 rounded border border-black">
                            <option value="All Sentiments">All Sentiments</option>
                            <option value="Positive">Positive</option>
                            <option value="Negative">Negative</option>
                            <option value="Neutral">Neutral</option>
                        </select>
                        <select value={selectedEmotion} onChange={handleEmotionChange} className="p-2 rounded border border-black">
                            <option value="All Emotions">All Emotions</option>
                            <option value="Joy">Joy</option>
                            <option value="Anger">Anger</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Sadness">Sadness</option>
                            <option value="Disgust">Disgust</option>
                            <option value="Surprise">Surprise</option>
                        </select>
                        <select value={selectedRating} onChange={handleRatingChange} className="p-2 rounded border border-black">
                            <option value="All Ratings">All Ratings</option>
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 px-6">
                {filteredReviews.slice(0, showAllReviews ? filteredReviews.length : 4).map((review, index) => (
                    <div key={index} className="p-4 border-black border-t mb-4">
                        <p><strong>Ratings: {review['AI-rating']} out of 5 stars </strong>{renderStars(review['AI-rating'])}</p>
                        <p><strong>Categories:</strong> {categories.map(category => <span key={category} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full mx-1">{category}</span>)}</p>
                        <p><strong>Emotion: {review.emotions} {emotionEmojis[review.emotions.toLowerCase()]}</strong></p>
                        <p><strong>Sentiment: <span className={sentimentColors[review.sentiment]}>{review.sentiment} {sentimentEmojis[review.sentiment]}</span></strong></p>
                        <br />
                        <strong>{review.title.slice(19)}</strong>
                        <p>{review.body}</p>
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
