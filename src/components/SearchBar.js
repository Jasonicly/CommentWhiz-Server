import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Loader } from "./Loader"; // Import the Loader component


function cleanProductUrl(url) {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;

        if (hostname.includes('amazon')) {
            return cleanAmazonUrl(urlObj);
        } else if (hostname.includes('shopee')) {
            return cleanShopeeUrl(urlObj);
        }

        return url;
    } catch (error) {
        console.error(error.message);
        return url;
    }
}

function cleanAmazonUrl(urlObj) {
    // Extract the path parts
    let pathParts = urlObj.pathname.split('/');

    // Find the ASIN (usually after "/dp/")
    let asinIndex = pathParts.indexOf('dp');
    if (asinIndex === -1 || asinIndex + 1 >= pathParts.length) {
        throw new Error("ASIN not found");
    }

    let asin = pathParts[asinIndex + 1];

    // Construct the clean URL
    let cleanUrl = `${urlObj.origin}/dp/${asin}`;

    return cleanUrl;
}

function cleanShopeeUrl(urlObj) {
    // Extract the pathname
    let pathname = urlObj.pathname;

    // Extract the 'i.shopId.itemId' part
    let match = pathname.match(/i\.(\d+)\.(\d+)/);
    if (match) {
        let shopId = match[1];
        let itemId = match[2];
        return `${urlObj.origin}/product/${shopId}/${itemId}`;
    }

    return urlObj.href; // Return the original URL if pattern not matched
}

function SearchBar() {
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false); // State for loading

    const handleInputChange = (e) => {
        setUrl(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (url) {
            setIsLoading(true); // Set loading state to true
            try {
                const cleanUrl = cleanProductUrl(url);
                const response = await axios.post("https://localhost:3001/scrape", { url: cleanUrl });
                console.log("Response from server:", response.data);
                
                setTimeout(() => {
                    navigate(`/report/${encodeURIComponent(cleanUrl)}`);
                }, 100); // 1000 milliseconds = 1 second
            } catch (error) {
                console.error("Error sending URL to server:", error);
            } finally {
                setIsLoading(false); // Set loading state to false
            }
        }
    };

    return (
<div className="search-bar-container bg-custom-blue text-white flex flex-col items-center justify-center mt-5 border-1 border-brown mx-auto rounded-lg px-5" style={{ width: '80%', height: 'auto', minHeight: '200px' }}>
            <h2 className="text-2xl font-bold mb-4">
                Search using URL
            </h2>
            <div className="flex items-center justify-center w-full">
                <div className="relative flex items-center" style={{ width: '600px' }}>
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Enter Amazon URL"
                        value={url}
                        onChange={handleInputChange}
                        className="pl-10 pr-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-black w-full rounded-l-xl"
                        style={{
                            backgroundColor: '#e0e0e0',
                            fontFamily: 'Poppins, sans-serif',
                            height: '70px',
                        }}
                    />
                </div>
                {isLoading ? (
                    <div>
                        <Loader /> {/* Render Loader when loading */}
                    </div>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="ml-4 bg-custom-lightblue text-white py-2 px-6  rounded-r-xl"
                        style={{ height: '70px' }}
                    >
                        Send
                    </button>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
