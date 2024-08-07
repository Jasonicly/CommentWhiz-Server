import React from "react";

function Download() {
    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full bg-custom-green" style={{ height: '800px' }}>
            <section className="bg-gradient-to-r from-custom-1 to-custom-2 py-16 px-4 border-2 border-black">
                <div className="max-w-7xl mx-auto text-white">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold mb-4">Download Our Browser Extension</h2>
                        <p className="text-lg">Get instant insights with our browser extension that generates summarized reports of product reviews, including sentiment analysis and bot detection. Available for free download.</p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center lg:items-start">
                        <div className="lg:w-1/2 p-4">
                        <img src={process.env.PUBLIC_URL + '../images/logoWhite.png'} alt="Download Extension" className="w-80 h-90 mx-auto mr-4 rounded-lg" />
                        </div>
                        <div className="lg:w-1/2 p-4 lg:pl-12">
                            <h3 className="text-3xl font-semibold mb-4">What You Will Get</h3>
                            <ul className="text-lg space-y-4 mb-6">
                                <li className="flex items-start">
                                    <span className="bg-white text-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">1</span>
                                    <div>Instant Summarized Product Reviews</div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-white text-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">2</span>
                                    <div>Comprehensive Sentiment Analysis</div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-white text-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">3</span>
                                    <div>Bot Detection and Filtering</div>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-white text-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 font-bold">4</span>
                                    <div>And Much More!</div>
                                </li>
                            </ul>
                            <div className="flex space-x-4">
                                <button className="bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition">Download Now</button>
                                <a href="/features" target="_blank" rel="noopener noreferrer" className="flex items-center text-white underline font-semibold">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Download;
