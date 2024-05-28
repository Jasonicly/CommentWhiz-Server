import React from "react";

function Feedback() {
    return (
        <div className="w-4/5 flex justify-between mx-auto">
            <div className="w-1/2 bg-gray-100 p-8 rounded-lg mr-4">
                <h3 className="text-lg mb-4">Positives</h3>
                <div className="mb-4">
                    <span className="block font-bold">Fast</span>
                    <p>"Extremely fast and responsive, no lag at all!"</p>
                </div>
                <div className="mb-4">
                    <span className="block font-bold">Nice</span>
                    <p>"Quick connection, works perfectly within seconds."</p>
                </div>
                <div>
                    <span className="block font-bold">Cheap</span>
                    <p>"Fast setup, immediately ready to use."</p>
                </div>
            </div>
            <div className="w-1/2 bg-gray-100 p-8 rounded-lg">
                <h3 className="text-lg mb-4">Negatives</h3>
                <div className="mb-4">
                    <span className="block font-bold">Battery</span>
                    <p>"The build quality feels flimsy and cheap."</p>
                </div>
                <div className="mb-4">
                    <span className="block font-bold">Flimsy</span>
                    <p>"Buttons feel loose and unreliable."</p>
                </div>
                <div>
                    <span className="block font-bold">Heavy</span>
                    <p>"Not durable, broke within a few weeks."</p>
                </div>
            </div>
        </div>
    );
}

export default Feedback;
