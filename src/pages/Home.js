// src/pages/Home.js
import React from 'react';
import Header from '../components/Header'; // Adjust the path if necessary

const Home = () => {
    return (
        <div className="bg-custom-green min-h-screen">
            <Header />
            <main className="flex flex-col items-center justify-center h-full">
                <h1 className="text-3xl font-bold text-white">Welcome to the Home Page</h1>
            </main>
        </div>
    );
};

export default Home;
