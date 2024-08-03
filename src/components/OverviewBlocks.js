import React from 'react';

const OverviewBlocks = ({ summary }) => {
    return (
        <div>
            <div className="flex justify-center mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <div className="bg-custom-green px-2 my-5 mx-2 min-w-[250px] rounded-lg flex flex-col justify-center border border-black text-white">
                        <h4 className="mb-2 text-left font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Total Comments</h4>
                        <span className="text-3xl font-bold text-left ml-2">{summary["Number of Reviews"]}</span>
                        <p className="text-left mt-2" style={{ fontSize: '8px' }}>Number of all total global comments found</p>
                    </div>
                    <div className="bg-custom-green px-2 my-5 mx-2 min-w-[250px] rounded-lg flex flex-col justify-center border border-black text-white">
                        <h4 className="mb-2 text-left font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Average Rating</h4>
                        <span className="text-3xl font-bold text-left ml-2">{summary["Enhanced Rating"]} / 5 <span className="text-lg">stars</span></span>
                        <p className="text-left mt-2" style={{ fontSize: '8px' }}>Original rating obtained from product website</p>
                    </div>
                    <div className="bg-custom-green px-2 my-5 mx-2 min-w-[250px] rounded-lg flex flex-col justify-center border border-black text-white">
                        <h4 className="mb-2 text-left font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Positive Comments</h4>
                        <span className="text-3xl font-bold text-left ml-2">{summary["Percentage of Positive Reviews"]}%</span>
                        <p className="text-left mt-2" style={{ fontSize: '8px' }}>Percentage of comments that were detected as positive</p>
                    </div>
                    <div className="bg-custom-green px-2 my-5 mx-2 min-w-[250px] rounded-lg flex flex-col justify-center border border-black text-white">
                        <h4 className="mb-2 text-left font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>Comments analysed</h4>
                        <span className="text-3xl font-bold text-left ml-2">{summary["Percentage of Positive Reviews"]}</span>
                        <p className="text-left mt-2" style={{ fontSize: '8px' }}>How many comments analysised from the total</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewBlocks;
