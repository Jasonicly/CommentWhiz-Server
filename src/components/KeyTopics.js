import React, { useState } from 'react';
import { Button } from './Button';

const KeyTopics = ({
    keyTopics,
    keyTopicsFilter,
    showKeyTopicsFilterOptions,
    showAllKeyTopics,
    expandedTopics,
    toggleKeyTopicsFilterOptions,
    setKeyTopicsFilter,
    toggleShowMoreComments,
    toggleShowAllKeyTopics,
}) => {
    const [selectedSentiments, setSelectedSentiments] = useState(['All Sentiments']);
    const [selectedRating, setSelectedRating] = useState(null);

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

    const resetFilters = () => {
        setSelectedSentiments(['All Sentiments']);
        setSelectedRating(null);
    };

    const handleFilterToggle = (filterType) => {
        if (keyTopicsFilter === filterType) {
            setKeyTopicsFilter(null); // Close the filter options if the same button is clicked again
        } else {
            setKeyTopicsFilter(filterType);
        }
    };

    const filteredKeyTopics = Object.keys(keyTopics)
        .filter(topic => {
            const sentimentMatch = selectedSentiments.includes('All Sentiments') || keyTopics[topic].comments.some(comment => selectedSentiments.includes(comment.sentiment));
            const ratingMatch = selectedRating === null || keyTopics[topic].comments.some(comment => comment['AI-rating'] === selectedRating);
            return sentimentMatch && ratingMatch;
        })
        .sort((a, b) => keyTopics[b].unique_comment_count - keyTopics[a].unique_comment_count)
        .slice(0, showAllKeyTopics ? Object.keys(keyTopics).length : 4);

    return (
        <div className="bg-white">
            <button onClick={toggleKeyTopicsFilterOptions} className="mb-4 p-2 bg-custom-gray border border-black rounded">
                {showKeyTopicsFilterOptions ? 'Close Options' : 'Filter Options'}
            </button>

            {showKeyTopicsFilterOptions && (
                <div className="bg-gray-100 p-4 border border-black mb-4 rounded relative">
                    <button onClick={resetFilters} className="absolute top-2 left-2 p-2 bg-custom-gray border border-black rounded">
                        Reset Filters
                    </button>
                    <div className="text-center mb-4">
                        <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
                        <div className="flex items-center justify-center mb-4">
                            <button onClick={() => handleFilterToggle('Sentiment')} className={`mx-2 p-2 rounded border-2 border-black ${keyTopicsFilter === 'Sentiment' ? 'bg-blue-500 text-white' : 'bg-custom-gray'}`}>Sentiment</button>
                            <button onClick={() => handleFilterToggle('AI Rating')} className={`mx-2 p-2 rounded border-2 border-black ${keyTopicsFilter === 'AI Rating' ? 'bg-blue-500 text-white' : 'bg-custom-gray'}`}>AI Rating</button>
                        </div>
                    </div>

                    {keyTopicsFilter === 'Sentiment' && (
                        <div className="flex justify-center">
                            <div className="inline-flex items-center justify-center mb-4 border-2 border-black p-5">
                                <button onClick={() => handleSentimentClick('Positive')} className={`mx-2 p-2 rounded border border-black ${selectedSentiments.includes('Positive') ? 'bg-green-500 text-white' : 'bg-custom-gray'}`}>Positive</button>
                                <button onClick={() => handleSentimentClick('Negative')} className={`mx-2 p-2 rounded border border-black ${selectedSentiments.includes('Negative') ? 'bg-red-500 text-white' : 'bg-custom-gray'}`}>Negative</button>
                                <button onClick={() => handleSentimentClick('Neutral')} className={`mx-2 p-2 rounded border border-black ${selectedSentiments.includes('Neutral') ? 'bg-yellow-500 text-white' : 'bg-custom-gray'}`}>Neutral</button>
                                <button onClick={() => handleSentimentClick('All Sentiments')} className={`mx-2 p-2 rounded border border-black ${selectedSentiments.includes('All Sentiments') ? 'bg-blue-500 text-white' : 'bg-custom-gray'}`}>All Sentiments</button>
                            </div>
                        </div>
                    )}

                    {keyTopicsFilter === 'AI Rating' && (
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

            {filteredKeyTopics.map((topic, index) => (
                <div key={index} className="bg-white border-black border p-4 rounded-lg shadow-md mb-4">
                    <h4 className="text-xl font-semibold">{topic}</h4>
                    <p><strong>Unique Comment Count:</strong> {keyTopics[topic].unique_comment_count}</p>
                    <div className="h-4" />
                    <div className="mb-4">
                        {keyTopics[topic].comments
                            .filter(comment => {
                                const sentimentMatch = selectedSentiments.includes('All Sentiments') || selectedSentiments.includes(comment.sentiment);
                                const ratingMatch = selectedRating === null || comment['AI-rating'] === selectedRating;
                                return sentimentMatch && ratingMatch;
                            })
                            .slice(0, expandedTopics[topic] ? keyTopics[topic].comments.length : 3)
                            .map((comment, idx) => (
                                <div key={idx} className="mb-4">
                                    <p className="mb-1">"{comment.body}"</p>
                                    <p><strong>Sentiment:</strong> {comment.sentiment}</p>
                                    <p><strong>AI Rating:</strong> {comment['AI-rating']}</p>
                                    <div className="h-4" /> {/* Adding empty line */}
                                </div>
                            ))}
                    </div>
                    {keyTopics[topic].comments.length > 3 && (
                        <Button
                            onClick={() => toggleShowMoreComments(topic)}
                            text={expandedTopics[topic] ? 'Collapse' : 'Expand'}
                            className="mt-2 p-2 text-sm"
                        />
                    )}
                </div>
            ))}
            {Object.keys(keyTopics).length > 4 && (
                <Button
                    onClick={toggleShowAllKeyTopics}
                    text={showAllKeyTopics ? 'Show Less' : 'Show More'}
                    className="mt-4"
                />
            )}
        </div>
    );
};

export default KeyTopics;
