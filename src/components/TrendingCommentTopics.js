import React, { useState, useEffect } from 'react';

const TrendingCommentTopics = ({ keyTopics }) => {
    const sortedKeyTopics = Object.keys(keyTopics)
        .sort((a, b) => keyTopics[b].unique_comment_count - keyTopics[a].unique_comment_count)
        .slice(0, 5); // Limit to the first 5 topics
    const [selectedPhrase, setSelectedPhrase] = useState(sortedKeyTopics[0]);

    const handlePhraseClick = (phrase) => {
        setSelectedPhrase(phrase);
    };

    return (
        <div className="bg-white p-4 m-2 rounded-lg shadow-md text-center flex flex-col items-center justify-center">
            <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Top Trending Comment Topics</h4>
            <div className="grid grid-cols-5" style={{ width: '100%' }}>
                <div className="col-span-2 flex flex-col justify-around" style={{ minHeight: '400px' }}>
                    {sortedKeyTopics.map((phrase, index) => (
                        <button
                            key={index}
                            onClick={() => handlePhraseClick(phrase)}
                            className={`mb-2 w-10/12 mx-auto py-4 text-center ${selectedPhrase === phrase ? 'bg-gray-500 text-white' : 'bg-custom-gray text-black'}`}
                        >
                            {phrase}
                        </button>
                    ))}
                </div>
                <div className="col-span-3 overflow-auto custom-scrollbar" style={{ maxHeight: '400px' }}>
                    {selectedPhrase && (
                        <div className="bg-white border-black border p-4 rounded-lg shadow-md mb-4 w-11/12 mx-auto" style={{ minHeight: '400px' }}>
                            <h4 className="text-xl font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>{selectedPhrase}</h4>
                            <p><strong>Comment Count:</strong> {keyTopics[selectedPhrase].unique_comment_count}</p>
                            <ul className="list-none space-y-4 mt-2">
                                {keyTopics[selectedPhrase].comments.map((comment, idx) => (
                                    <li key={idx} className="mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        <p style={{ fontFamily: "'Poppins', sans-serif" }}>"{comment.body}"</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrendingCommentTopics;
