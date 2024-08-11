import React from 'react';

const FeaturesSection = () => {
    return (
        <div className="mt-8 flex flex-col md:flex-row">
            <div className="md:w-3/5 md:pr-8">
                <p className="text-gray-700 text-lg mb-6">
                    Discover the unique features that make our AI-powered solution stand out. Each feature is designed to enhance your experience and provide unparalleled value.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Feature 1 */}
                    <div className="flex items-start">
                        <div className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-lime-600 text-gray-700 text-base font-bold p-4">
                            1
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">Cutting-Edge Tech</h3>
                            <p className="text-gray-600">We utilize the latest in AI and data science to offer state-of-the-art comment analysis, ensuring users benefit from the most advanced and reliable insights available.</p>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="flex items-start">
                        <div className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-lime-600 text-gray-700 text-base font-bold p-4">
                            2
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">NLP</h3>
                            <p className="text-gray-600">Using cutting-edge NLP, our tool understands and processes natural language reviews, delivering concise summaries and highlighting key points that matter most to users.</p>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="flex items-start">
                        <div className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-lime-600 text-gray-700 text-base font-bold p-4">
                            3
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">Deep Learning</h3>
                            <p className="text-gray-600">Our platform leverages advanced deep learning techniques to accurately analyze and interpret customer comments, providing users with insightful sentiment analysis and product feedback.</p>
                        </div>
                    </div>
                    {/* Feature 4 */}
                    <div className="flex items-start">
                        <div className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-lime-600 text-gray-700 text-base font-bold p-4">
                            4
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">Gen AI</h3>
                            <p className="text-gray-600">By integrating generative AI, our tool not only analyzes but can also generate helpful summaries or alternative viewpoints based on user reviews, enhancing the decision-making process for users.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-2/5">
                <iframe
                    className="w-full h-64 md:h-full rounded-lg"
                    src="https://www.youtube.com/embed/5LkUtBlaW18"
                    title="Video"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default FeaturesSection;
