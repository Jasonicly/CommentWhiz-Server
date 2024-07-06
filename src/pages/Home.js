// src/pages/Home.js
import React from 'react';
import Header from '../components/Header'; // Adjust the path if necessary
import HomeBanner from '../components/HomeBanner';
import HomeContainer from '../components/HomeContainer';
import Download from '../components/Download';

const Home = () => {
    return (
        <div className="bg-custom-gray min-h-screen">
            <Header />
            <HomeBanner />
            <HomeContainer />
            <Download />
        </div>
    );
};

export default Home;
