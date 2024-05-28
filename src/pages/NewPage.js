import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import Footer from "../components/Footer";

function NewPage() {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedPositive, setSelectedPositive] = useState("Fast");
    const [selectedNegative, setSelectedNegative] = useState("Battery");

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    const positiveComments = {
        Fast: [
            "Extremely fast and responsive, no lag at all!",
            "Quick connection, works perfectly within seconds.",
            "Fast setup, immediately ready to use."
        ],
        Nice: [
            "Very nice design and comfortable to hold.",
            "Looks great on my desk.",
            "Ergonomic and easy to use."
        ],
        Cheap: [
            "Affordable price for its quality.",
            "Great value for money.",
            "Cheap but performs well."
        ]
    };

    const negativeComments = {
        Battery: [
            "The build quality feels flimsy and cheap.",
            "Buttons feel loose and unreliable.",
            "Not durable, broke within a few weeks."
        ],
        Flimsy: [
            "Feels very flimsy in hand.",
            "Not sturdy, might break easily.",
            "Build quality is not good."
        ],
        Heavy: [
            "A bit heavy to carry around.",
            "Could be lighter for better portability.",
            "Feels bulky in hand."
        ]
    };

    const togglePositive = (type) => {
        setSelectedPositive(type);
    };

    const toggleNegative = (type) => {
        setSelectedNegative(type);
    };


    return (
        <div>
            <Header />
            <SearchBar />
            <Container.Outer customStyles={{ backgroundColor: '#53a079', padding: '20px 20px 20px 0', margin: '20px' }} showIcon={false} showHeader={false}>
                <Container.Inner>
                    <div className="flex items-center mb-8">
                        <h2 className="text-xl font-bold text-white mr-2">Logitech M170 Wireless Mouse</h2>
                        {!showDetails && (
                            <Button
                                onClick={toggleDetails}
                                text="View Details"
                                className="w-auto"
                            />
                        )}
                    </div>
                    {showDetails && (
                        <div className="w-full">
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
                            <Button
                                onClick={toggleDetails}
                                text="View Less"
                                className="mt-4 w-auto"
                            />
                        </div>
                    )}
                </Container.Inner>
            </Container.Outer>
            <Container.Outer customStyles={{ backgroundColor: '#e0e0e0', padding: '20px', margin: '20px', position: 'relative' }} showIcon={false} showHeader={false}>
                <div className="text-xl font-bold absolute top-0 left-0 text-black px-4 py-1 -mt-9" style={{ backgroundColor: '#e0e0e0' }}>Overview</div>
                <Container.Inner className="space-x-4" flexDirection="flex-row">
                    <div className="w-1/2 p-4 rounded-md shadow" style={{ backgroundColor: '#e0e0e0' }}>
                        <h3 className="text-lg mb-2 underline  font-semibold">Summary</h3>
                        <p>
                            The M170 Wireless Mouse offers a strong, consistent connection up to 10 meters with minimal delays. It boasts a year-long battery life, plug-and-play setup with no software needed, and an ambidextrous design for comfortable use. The mouse includes an On/Off switch to extend battery life, making it ideal for both right and left-handed users.
                        </p>
                    </div>
                    <div className="w-1/4 p-4 flex justify-center items-center rounded-md shadow" style={{ marginTop: 0, backgroundColor: '#e0e0e0' }}>
                        <div className="text-center">
                            <span className="block text-xl font-bold">Enhanced Rating:</span>
                            <span className="block text-2xl">4.5/5</span>
                        </div>
                    </div>
                    <div className="w-1/4 p-4 rounded-md shadow flex justify-center items-center" style={{ marginTop: 0, backgroundColor: '#e0e0e0' }}>
                        <img src={process.env.PUBLIC_URL + '/path-to-your-pie-chart-image.png'} alt="Pie Chart" className="h-24 w-24"/>
                    </div>
                </Container.Inner>

                <Container.Inner className="space-x-4" flexDirection="flex-row">
    <div className="w-1/2">
        <h3 className="text-lg mb-2 font-bold underline">Positives</h3>
        <div className="flex">
            <div className="flex flex-col">
                <Button
                    onClick={() => togglePositive("Fast")}
                    text="Fast"
                    className={`px-10 py-3 text-base font-semibold ${selectedPositive === "Fast" ? "bg-teal-500 text-white rounded-none" : "rounded-none"}`}
                />
                <Button
                    onClick={() => togglePositive("Nice")}
                    text="Nice"
                    className={`px-10 py-3 text-base font-semibold ${selectedPositive === "Nice" ? "bg-teal-500 text-white rounded-none" : "rounded-none"}`}
                />
                <Button
                    onClick={() => togglePositive("Cheap")}
                    text="Cheap"
                    className={`px-10 py-3 text-base font-semibold ${selectedPositive === "Cheap" ? "bg-teal-500 text-white rounded-none" : "rounded-none"}`}
                />
            </div>
            <div className="p-4 bg-white shadow rounded-none w-full min-h-[200px]">
                {positiveComments[selectedPositive].map((comment, index) => (
                    <p key={index}>{comment}</p>
                ))}
            </div>
        </div>
    </div>
    <div className="w-1/2" style={{ marginTop: 0}}>
        <h3 className="text-lg mb-2 font-bold underline">Negatives</h3>
        <div className="flex">
            <div className="flex flex-col">
                <Button
                    onClick={() => toggleNegative("Battery")}
                    text="Battery"
                    className={`px-10 py-3 text-base font-semibold ${selectedNegative === "Battery" ? "bg-teal-500 text-white rounded-none" : "rounded-none"}`}
                />
                <Button
                    onClick={() => toggleNegative("Flimsy")}
                    text="Flimsy"
                    className={`px-10 py-3 text-base font-semibold ${selectedNegative === "Flimsy" ? "bg-teal-500 text-white rounded-none" : "rounded-none"}`}
                />
                <Button
                    onClick={() => toggleNegative("Heavy")}
                    text="Heavy"
                    className={`px-10 py-3 text-base font-semibold ${selectedNegative === "Heavy" ? "bg-teal-500 text-white rounded-none" : "rounded-none"}`}
                />
            </div>
            <div className="p-4 bg-white shadow rounded-none w-full min-h-[200px]">
                {negativeComments[selectedNegative].map((comment, index) => (
                    <p key={index}>{comment}</p>
                ))}
            </div>
        </div>
    </div>
</Container.Inner>

            </Container.Outer>

            <Footer />
        </div>
    );
}

export default NewPage;
