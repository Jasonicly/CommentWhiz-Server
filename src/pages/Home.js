// src/pages/Home.js
import React from 'react';
import Header from '../components/Header'; // Adjust the path if necessary
import HomeBanner from '../components/HomeBanner';
import Download from '../components/Download';
import HomeContent from '../components/HomeContent';
import HomeTestimonials from '../components/HomeTestimonials';
import HomeDetails from '../components/HomeDetails';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="bg-custom-gray overflow-x-hidden">
            <Header />
            <HomeBanner />
            <HomeContent />
            <HomeTestimonials />
            <HomeDetails /> {/* Add the new component here */}
            <Download />
            <Footer />  
        </div>
    );
};

export default Home;
