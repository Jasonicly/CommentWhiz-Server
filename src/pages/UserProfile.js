import React from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';

const UserProfile = () => {
    return (
        <div className="bg-custom-green flex flex-col min-h-screen">
            <Header />
            <div className="flex justify-center items-center flex-grow py-12">
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full mx-auto flex flex-row">
                    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#5da0b8] to-[#477a8e] text-white">
                        <h1 className="text-2xl font-bold mb-4">Hello, User!</h1>
                        <img src="/images/logo.png" alt="CommentSense Logo" className="w-40 mt-4" />
                    </div>
                    <div className="flex-1 p-6 bg-gray-100 flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Profile</h2>
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 overflow-hidden">
                                <img src="/images/userIcon.png" alt="User" className="w-full h-full object-cover rounded-full" />
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                                <p className="text-lg font-medium text-gray-700">Email: test@gmail.com</p>
                            </div>
                            <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;
