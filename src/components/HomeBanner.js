import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const slides = [
    {
        title: "The one stop solution for all your E-commerce needs!",
        description: "Our Team of 5 will demostrate our ingenuity in developing web applications your interest, allowing you to condense your time and effort reading online reviews into a single platform.",
        image: process.env.PUBLIC_URL + '../images/logoBlack.png',
        link: "https://www.swagsoft.com/mobile-app-development",
        width: "300px",
        height: "300px"
    },
    {
        title: "Slide 2 Title",
        description: "Slide 2 Description",
        image: process.env.PUBLIC_URL + '../images/logoWhite.png',        link: "#",
        width: "300px",
        height: "300px"
    },
    {
        title: "Slide 3 Title",
        description: "Slide 3 Description",
        image: process.env.PUBLIC_URL + '../images/logo.png',        link: "#",
        width: "300px",
        height: "300px"
    }
];

const HomeBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [transitionClass, setTransitionClass] = useState("");

    const handleNext = () => {
        setTransitionClass("fade-out");
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setTransitionClass("fade-in");
        }, 300);
    };

    const handlePrev = () => {
        setTransitionClass("fade-out");
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
            setTransitionClass("fade-in");
        }, 300);
    };

    useEffect(() => {
        setTransitionClass("fade-in");
    }, [currentSlide]);

    return (
        <div className="relative w-full h-screen bg-custom-lightgray flex items-center justify-center">
            <div className="flex items-center justify-between w-full h-full max-w-7xl">
                <div className="w-1/2 p-8">
                    <h1 className="text-black text-4xl mb-4">{slides[0].title}</h1>
                    <p className="text-black mb-4">{slides[0].description}</p>
                    <a href={slides[0].link} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                        Learn more about us
                    </a>
                </div>
                <div className="w-1/2 flex justify-center items-center relative">
                    <button onClick={handlePrev} className="absolute left-0 z-10 text-black p-2">
                        <FaArrowLeft size={30} />
                    </button>
                    <img 
                        src={slides[currentSlide].image} 
                        alt={slides[currentSlide].title} 
                        className={`transition-opacity duration-300 ease-in-out ${transitionClass}`}
                        style={{ width: slides[currentSlide].width, height: slides[currentSlide].height }} 
                    />
                    <button onClick={handleNext} className="absolute right-0 z-10 text-black p-2">
                        <FaArrowRight size={30} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;
