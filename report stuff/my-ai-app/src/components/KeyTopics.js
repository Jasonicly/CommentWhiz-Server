import React from 'react';
import './KeyTopics.css';

function KeyTopics({ keyTopics }) {
    return (
        <div className="key-topics">
            <h2>Key Topics</h2>
            {Object.keys(keyTopics).map((topic, index) => (
                <div key={index} className="topic-card">
                    <h3>{topic}</h3>
                    <p>Unique Comment Count: {keyTopics[topic].unique_comment_count}</p>
                    <ul>
                        {keyTopics[topic].comments.map((comment, idx) => (
                            <li key={idx} className="comment">
                                <p>{comment.body}</p>
                                <p>Sentiment: {comment.sentiment}</p>
                                <p>AI Rating: {comment["AI-rating"]}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default KeyTopics;
