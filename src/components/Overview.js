import React from "react";

function Overview() {
    return (
        <div className="w-4/5 bg-gray-100 p-8 rounded-lg mb-8 mx-auto">
            <div className="mb-8">
                <h3 className="text-lg mb-2">Summary</h3>
                <p>
                    The M170 Wireless Mouse offers a strong, consistent
                    connection up to 10 meters with minimal delays. It boasts
                    a year-long battery life, plug-and-play setup with no
                    software needed, and an ambidextrous design for
                    comfortable use. The mouse includes an On/Off switch to
                    extend battery life, making it ideal for both right and
                    left-handed users.
                </p>
            </div>
            <div className="flex justify-between">
                <div className="bg-yellow-300 rounded-full p-8 text-center">
                    <span className="block">Enhanced Rating:</span>
                    <span className="block text-2xl">4.5/5</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="mb-2">Positive: 78.9%</span>
                    <span className="mb-2">Neutral: 15.8%</span>
                    <span>Negative: 5.3%</span>
                </div>
            </div>
        </div>
    );
}

export default Overview;
