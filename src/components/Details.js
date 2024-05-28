import React, { useState } from "react";

function Details() {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="w-5/5 mb-8 my-10">
            <div className="flex justify-between items-center pl-2">
                <h2 className="text-xl font-bold mx-5">Logitech M170 Wireless Mouse</h2>
                {!showDetails && (
                    <button
                        onClick={toggleDetails}
                        className="text-gray-700 border-2 border-transparent hover:border-gray-700 px-4 py-2 rounded transition mr-10"
                    >
                        View Details
                    </button>
                )}
            </div>
            {showDetails && (
                <div className="w-full bg-transparent text-right px-20">
                    <p><strong>Brand:</strong> Logitech</p>
                    <p><strong>Colour:</strong> Black</p>
                    <p><strong>Connectivity technology:</strong> USB, wireless</p>
                    <p><strong>Special features:</strong> Wireless</p>
                    <p><strong>Movement detection technology:</strong> Optical</p>
                    <p><strong>Number of buttons:</strong> 3</p>
                    <p><strong>Hand orientation:</strong> Ambidextrous</p>
                    <p><strong>Model name:</strong> Logitech</p>
                    <p><strong>Item weight:</strong> 95 Grams</p>
                    <ul className="list-disc list-inside">
                        <li><strong>Reliable 2.4ghz wireless</strong></li>
                        <li><strong>12 Month battery life</strong></li>
                        <li><strong>Plug-and-play connection</strong></li>
                        <li><strong>Comfortable and mobile</strong></li>
                    </ul>
                    <button
                        onClick={toggleDetails}
                        className="mt-4 text-gray-700 border-2 border-transparent hover:border-gray-700 px-4 py-2 rounded transition"
                    >
                        View Less
                    </button>
                </div>
            )}
        </div>
    );
}

export default Details;
