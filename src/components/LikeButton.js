// src/components/LikeButton.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LikeButton = ({ reportId }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);

                axios.get(`https://localhost:3001/user/${decoded.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then(response => {
                        if (response.data.favouriteReport.includes(reportId)) {
                            setIsFavorite(true);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });

            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [reportId]);

    const handleLikeButtonClick = () => {
        if (!user) {
            navigate('/login');
            return;
        }

        const token = localStorage.getItem('token');
        if (isFavorite) {
            axios.put(`https://localhost:3001/user/${user.id}/removeFavorite`, { reportId }, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(() => {
                    setIsFavorite(false);
                })
                .catch(error => {
                    console.error('Error removing favorite report:', error);
                });
        } else {
            axios.put(`https://localhost:3001/user/${user.id}/addFavorite`, { reportId }, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(() => {
                    setIsFavorite(true);
                })
                .catch(error => {
                    console.error('Error adding favorite report:', error);
                });
        }
    };

    return (
        <button
            onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                handleLikeButtonClick();
            }}
            className={`focus:outline-none ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
        >
            {isFavorite ? (
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            ) : (
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 16.55l-.1.1-.1-.1C7.14 15.24 4 12.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 3.89-3.14 6.74-7.4 11.05z" />
                </svg>
            )}
        </button>
    );
};

export default LikeButton;
