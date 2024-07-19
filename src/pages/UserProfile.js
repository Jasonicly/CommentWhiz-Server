import React from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';

const UserProfile = () => {
    return (
        <div className="bg-custom-green flex flex-col min-h-screen">
            <Header />
            <div className="flex justify-center items-center flex-grow py-12">
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full mx-auto flex flex-row h-[540px]">
                    <div className="flex flex-col items-center justify-start p-8 bg-gray-100 w-1/3">
                        <div className="w-30 h-30 mb-4 mt-4 overflow-hidden">
                            <img src="/images/userIcon.png" alt="User" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors mt-4">View My Favourites</button>
                    </div>
                    <div className="flex-1 p-8 bg-white flex flex-col justify-between">
                        <div className="flex flex-col items-center">
                            <h2 className="text-5xl font-bold text-green-800 mb-8">My Profile</h2>
                            <div className="mb-6 w-full px-8">
                                <label className="block text-gray-700 text-lg mb-2">Name</label>
                                <input type="text" value="Donald Trump" className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 text-lg" disabled />
                            </div>
                            <div className="mb-6 w-full px-8">
                                <label className="block text-gray-700 text-lg mb-2">Username</label>
                                <input type="text" value="Donaldduck123" className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 text-lg" disabled />
                            </div>
                            <div className="mb-6 w-full px-8">
                                <label className="block text-gray-700 text-lg mb-2">Email Address</label>
                                <input type="email" value="test@gmail.com" className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 text-lg" disabled />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 px-8">
                            <button className="px-8 py-3 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition-colors">Cancel</button>
                            <button className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;
