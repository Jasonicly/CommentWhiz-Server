import React from 'react';
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
    return (
        <div className="bg-white p-6 mb-6 m-2 rounded-lg shadow-md border-black border">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>Key Topics</h3>

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

            {Object.keys(keyTopics)
                .sort((a, b) => keyTopics[b].unique_comment_count - keyTopics[a].unique_comment_count)
                .filter(topic => {
                    if (keyTopicsFilter === 'All Sentiments') return true;

                    return keyTopics[topic].comments.some(comment => comment.sentiment === keyTopicsFilter);
                })
                .slice(0, showAllKeyTopics ? Object.keys(keyTopics).length : 4)
                .map((topic, index) => (
                    <div key={index} className="bg-white border-black border p-4 rounded-lg shadow-md mb-4">
                        <h4 className="text-xl font-semibold">{topic}</h4>
                        <p><strong>Unique Comment Count:</strong> {keyTopics[topic].unique_comment_count}</p>
                        <ul className="list-disc list-inside">
                            {keyTopics[topic].comments.slice(0, expandedTopics[topic] ? keyTopics[topic].comments.length : 3).map((comment, idx) => (
                                <li key={idx}>
                                    <p>{comment.body}</p>
                                    <p><strong>Sentiment:</strong> {comment.sentiment}</p>
                                    <p><strong>AI Rating:</strong> {comment["AI-rating"]}</p>
                                </li>
                            ))}
                        </ul>
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
