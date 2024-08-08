import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const ReviewList = ({ reviews }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSentiment, setSelectedSentiment] = useState('All Sentiments');
  const [selectedEmotion, setSelectedEmotion] = useState('All Emotions');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [selectedSarcasm, setSelectedSarcasm] = useState('View All');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useState({ up: false, down: true });
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true);
  const chartRef = useRef(null);

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleSentimentChange = (e) => setSelectedSentiment(e.target.value);
  const handleEmotionChange = (e) => setSelectedEmotion(e.target.value);
  const handleRatingChange = (e) => setSelectedRating(e.target.value);
  const handleSarcasmChange = (e) => setSelectedSarcasm(e.target.value);

  const resetFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedSentiment('All Sentiments');
    setSelectedEmotion('All Emotions');
    setSelectedRating('All Ratings');
    setSelectedSarcasm('View All');
  };

  const filteredReviews = reviews.filter(review => {
    const sentimentMatch = selectedSentiment === 'All Sentiments' || selectedSentiment.toLowerCase() === review.sentiment.toLowerCase();
    const emotionMatch = selectedEmotion === 'All Emotions' || selectedEmotion.toLowerCase() === review.emotions.toLowerCase();
    const ratingMatch = selectedRating === 'All Ratings' || review['AI-rating'] === parseInt(selectedRating);
    const categoryMatch = selectedCategory === 'All Categories' || review.comment_category.includes(selectedCategory);
    const sarcasmMatch = selectedSarcasm === 'View All' ||
      (selectedSarcasm === 'Sarcastic' && review.sarcasm_label === 1) ||
      (selectedSarcasm === 'Not Sarcastic' && review.sarcasm_label === 0);

    return sentimentMatch && emotionMatch && ratingMatch && categoryMatch && sarcasmMatch;
  });

  const toggleShowAllReviews = () => setShowAllReviews(!showAllReviews);

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    setShowScrollButtons({
      up: scrollPosition > 100,
      down: scrollPosition + windowHeight < documentHeight - 100
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const starStyle = {
      color: 'yellow',
      textShadow: '0 0 2px #000'
    };

    return (
      <>
        {Array(fullStars).fill().map((_, i) => <span key={`full-${i}`} style={starStyle}>&#9733;</span>)}
        {halfStar && <span style={starStyle}>&#9733;</span>}
        {Array(emptyStars).fill().map((_, i) => <span key={`empty-${i}`} style={{ textShadow: '0 0 2px #000' }}>&#9734;</span>)}
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

  const categoryColors = {
    delivery: 'bg-purple-300 text-black',
    service: 'bg-yellow-300 text-black',
    price: 'bg-green-500 text-black',
    value: 'bg-green-300 text-black',
    quality: 'bg-rose-300 text-black',
    usage_performance: 'bg-blue-300 text-black',
    overall_satisfaction: 'bg-yellow-300 text-black'
  };

  const categoryDescriptions = {
    delivery: 'Focuses on how the product arrived and the time it took.',
    service: 'Describes interactions with customer support.',
    price: 'Specifically mentions cost or pricing aspects.',
    value: 'Talks about the balance between cost and benefits.',
    quality: 'Mentions the materials, durability, or construction of the product.',
    usage_performance: 'Discusses how the product works and its ease of use.',
    overall_satisfaction: 'Provides an overarching tone or summary of the user’s experience.'
  };

  const categoryName = {
    delivery: 'Delivery📦',
    service: 'Service🫱🏽',
    price: 'Price💵',
    value: 'Value💎',
    quality: 'Quality🪧',
    usage_performance: 'Usage Performance⚡',
    overall_satisfaction: 'Overall Satisfaction😀'
  };

  const renderCategories = (categories) => {
    return categories.map(category => (
      <span 
        key={category} 
        data-category={category} 
        className={`px-2 py-1 rounded-full mx-1 ${categoryColors[category]}`} 
      >
        {categoryName[category]}
      </span>
    ));
  };

  return (
    <div>
      <div className="bg-custom-green mb-4 rounded relative pb-5 pr-4">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
          <button 
            className="md:hidden bg-white p-2 rounded mb-4" 
            onClick={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
          >
            {isFiltersCollapsed ? 'Show Filters' : 'Hide Filters'}
          </button>
          <div className={`flex flex-col md:flex-row items-center justify-center mb-4 space-y-4 md:space-y-0 md:space-x-4 ${isFiltersCollapsed ? 'hidden' : ''}`}>
            <label className="font-semibold text-white">Filter by:</label>
            <select value={selectedCategory} onChange={handleCategoryChange} className="p-2 rounded">
              <option value="All Categories">All Categories</option>
              {Object.keys(categoryName).map(category => (
                <option key={category} value={category}>{categoryName[category]}</option>
              ))}
            </select>
            <select value={selectedSentiment} onChange={handleSentimentChange} className="p-2 rounded">
              <option value="All Sentiments">All Sentiments</option>
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
              <option value="Neutral">Neutral</option>
            </select>
            <select value={selectedEmotion} onChange={handleEmotionChange} className="p-2 rounded">
              <option value="All Emotions">All Emotions</option>
              <option value="joy">Joy</option>
              <option value="anger">Anger</option>
              <option value="neutral">Neutral</option>
              <option value="sadness">Sadness</option>
              <option value="disgust">Disgust</option>
              <option value="surprise">Surprise</option>
            </select>
            <select value={selectedRating} onChange={handleRatingChange} className="p-2 rounded">
              <option value="All Ratings">All Ratings</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
            <select value={selectedSarcasm} onChange={handleSarcasmChange} className="p-2 rounded">
              <option value="View All">View All</option>
              <option value="Sarcastic">Sarcastic</option>
              <option value="Not Sarcastic">Not Sarcastic</option>
            </select>
            <button onClick={resetFilters} className="p-2 bg-white border rounded">
              <FontAwesomeIcon icon={faSyncAlt} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-6">
        {filteredReviews.slice(0, showAllReviews ? filteredReviews.length : 4).map((review, index) => (
          <div key={index} className="p-4 border-black border-t mb-4">
            <p className="mb-2"><strong>Ratings: {review['AI-rating']} out of 5 stars </strong>{renderStars(review['AI-rating'])}</p>
            <p className="mb-2"><strong>Categories:</strong> {renderCategories(review.comment_category)}</p>
            <p className="mb-2"><strong>Emotion: {review.emotions} {emotionEmojis[review.emotions.toLowerCase()]}</strong></p>
            <p className="mb-2"><strong>Sentiment: <span className={sentimentColors[review.sentiment]}>{review.sentiment} {sentimentEmojis[review.sentiment]}</span></strong></p>
            {review.sarcasm_label === 1 && (
              <p className="mb-2">
                <strong>Sarcasm:</strong>
                <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 ml-2" title="This review is flagged as sarcastic or satirical" />
              </p>
            )}
            <br />
            <strong>{review.title}</strong>
            <p className="mb-2">{review.body}</p>
          </div>
        ))}
      </div>
      {filteredReviews.length > 4 && (
        <Button
          onClick={toggleShowAllReviews}
          text={showAllReviews ? 'Show Less' : 'Show More'}
          className="m-4"
        />
      )}
      {showAllReviews && (
        <>
          {showScrollButtons.down && (
            <button
              onClick={scrollToBottom}
              className="fixed bottom-10 left-10 p-4 text-black rounded-full text-3xl"
            >
              &#x2193;
            </button>
          )}
          {showScrollButtons.up && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-10 right-10 p-4 text-black rounded-full text-3xl"
            >
              &#x2191;
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewList;
