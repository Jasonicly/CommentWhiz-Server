import React from 'react';
import './Reviews.css';

function Reviews({ reviews }) {
    return (
        <div className="reviews">
            <h2>Reviews</h2>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index} className="review-card">
                        <p>{review.body}</p>
                        <p>Sentiment: {review.sentiment}</p>
                        <p>AI Rating: {review["AI-rating"]}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Reviews;
