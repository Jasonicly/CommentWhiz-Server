import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const UserProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const email = decoded.id;
                const username = email.split('@')[0];

                setUser({ email, username, isVerified: decoded.isVerified, favouriteReport: decoded.favouriteReport });

                // Fetch the latest user data from the server
                axios.get(`https://localhost:3001/user/${email}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then(response => {
                        setUser(prevUser => ({
                            ...prevUser,
                            ...response.data
                        }));
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
            } catch (error) {
                console.error('Error decoding token:', error);
                navigate('/login'); // Redirect to login if there's an error decoding the token
            }
        } else {
            navigate('/login'); // Redirect to login if there's no token
        }
    }, [navigate]);

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoFav = () => {
        navigate('/user/favorite');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex justify-center items-center flex-grow py-12">
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full mx-auto flex flex-row h-[520px]">
                    <div className="flex flex-col items-center justify-start p-8 bg-gray-100 w-1/3">
                        <div className="w-30 h-30 mb-4 mt-4 overflow-hidden">
                            <img src="/images/userIcon.png" alt="User" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors mt-4" onClick={handleGoFav}>View My Favourites</button>
                    </div>
                    <div className="flex-1 p-8 bg-white flex flex-col justify-between">
                        <div className="flex flex-col items-center">
                            <h2 className="text-5xl font-bold text-green-800 mb-8">My Profile</h2>
                            <div className="mb-6 w-full px-8">
                                <label className="block text-gray-700 text-lg mb-2">Username</label>
                                <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 text-lg">
                                    {user.username}
                                </div>
                            </div>
                            <div className="mb-6 w-full px-8">
                                <label className="block text-gray-700 text-lg mb-2">Email Address</label>
                                <div className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 text-lg flex justify-between items-center">
                                    <span>{user.email}</span>
                                    <span className={`text-${user.isVerified ? 'green' : 'red'}-500`}>
                                        {user.isVerified ? 'Verified' : 'Unverified'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 px-8">
                            <button
                                className="px-8 py-3 bg-green-400 text-white rounded-full hover:bg-green-500 transition-colors"
                                onClick={handleGoHome}
                            >
                                Go Homepage
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;
