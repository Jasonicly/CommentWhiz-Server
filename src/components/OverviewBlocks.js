import React from 'react';

const OverviewBlocks = ({ summary }) => {
    return (
        <div>
            <div className="bg-custom-lightgray flex justify-between items-center">
                <div className="flex flex-wrap justify-center mx-auto">
                    <div className="bg-gray-100 pt-4 pb-4 p-2 my-5 mx-2 min-w-[250px] flex flex-col items-center justify-center border border-black rounded-full">
                        <h4 className="mb-2 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>Number of Reviews</h4>
                        <span>{summary["Number of Reviews"]}</span>
                    </div>
                    <div className="bg-gray-100 pt-4 pb-4 p-2 my-5 mx-2 min-w-[250px] flex flex-col items-center justify-center border border-black rounded-full">
                        <h4 className="mb-2 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>Number of Positive Reviews</h4>
                        <span>{summary["Number of Positive Reviews"]}</span>
                    </div>
                    <div className="bg-gray-100 pt-4 pb-4 p-2 my-5 mx-2 min-w-[250px] flex flex-col items-center justify-center border border-black rounded-full">
                        <h4 className="mb-2 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>Number of Negative Reviews</h4>
                        <span>{summary["Number of Negative Reviews"]}</span>
                    </div>
                    <div className="bg-gray-100 pt-4 pb-4 p-2 my-5 mx-2 min-w-[250px] flex flex-col items-center justify-center border border-black rounded-full">
                        <h4 className="mb-2 text-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>Number of Neutral Reviews</h4>
                        <span>{summary["Number of Neutral Reviews"]}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewBlocks;
