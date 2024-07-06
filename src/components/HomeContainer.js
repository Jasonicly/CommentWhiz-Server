import React from 'react';

const FeatureCard = ({ title, description, borderColor }) => {
    return (
        <div style={{ width: '400px', height: '150px' }} className={`p-4 rounded-full shadow-md m-2 text-center border-2 bg-custom-beige ml-10 mr-10 ${borderColor}`}>
            <h3 className="text-3xl font-bold mb-2">{title}</h3>
            <p className="text-lg font-bold mb-2">{description}</p>
        </div>
    );
};


function HomeContainer() {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <div className="border-2 border-blue-500 p-6 rounded-lg bg-custom-beige mt-20 mb-20" style={{maxWidth: '800px'}}>
                <p className="text-center text-xl mb-4">
                    With just one click, simplify comments and generate a report on pages such as Amazon.
                </p>
                <p className="text-center text-lg">
                    Summarizing, removing bot-generated comments, and detecting sarcasm for a clearer, more reliable review!
                </p>
            </div>

            <div className="w-full bg-custom-green flex flex-col items-center py-2 mt-20 pb-20">
            <div className="relative w-full flex justify-center">
                <div className="bg-custom-blue text-center p-4 rounded-lg absolute -mt-10" style={{maxWidth: "700px",  width: '100%' }}>
                    <h1 className="text-white text-4xl font-bold">Open Source. No Tracking</h1>
                </div>
            </div>
            <div className="flex flex-col items-center mt-20">
                <FeatureCard
                    title="Safe"
                    description="Doesn't collect your data. Doesn't track you"
                    borderColor="border-black"
                />
                <div className="flex flex-wrap justify-center mt-20">
                    <FeatureCard
                        title="Accurate"
                        description="Bot checker and sarcasm detector"
                        borderColor="border-black"
                    />
                    <FeatureCard
                        title="Fast"
                        description="Uses advanced algorithms to provide concise reviews"
                        borderColor="border-black"
                    />
                </div>
            </div>
        </div>

        </div>
    );
}

export default HomeContainer;
