import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    let pathParts = urlObj.pathname.split('/');
    let asinIndex = pathParts.indexOf('dp');
    if (asinIndex === -1 || asinIndex + 1 >= pathParts.length) {
        throw new Error("ASIN not found");
    }
    let asin = pathParts[asinIndex + 1];
    let cleanUrl = `${urlObj.origin}/dp/${asin}`;
    return cleanUrl;
}

function cleanShopeeUrl(urlObj) {
    let pathname = urlObj.pathname;
    let match = pathname.match(/i\.(\d+)\.(\d+)/);
    if (match) {
        let shopId = match[1];
        let itemId = match[2];
        return `${urlObj.origin}/product/${shopId}/${itemId}`;
    }
    return urlObj.href;
}

function SearchBar() {
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setUrl(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (url) {
            setIsLoading(true);
            try {
                const cleanUrl = cleanProductUrl(url);
                const response = await axios.post("https://localhost:3001/scrape", { url: cleanUrl });
                console.log("Response from server:", response.data);
                
                setTimeout(() => {
                    navigate(`/report/${encodeURIComponent(cleanUrl)}`);
                }, 100);
            } catch (error) {
                console.error("Error sending URL to server:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative flex items-center mx-4" style={{ width: '400px' }}>
            <input
                type="text"
                placeholder="Enter product Url..."
                value={url}
                onChange={handleInputChange}
                className="flex-grow bg-custom-searchbar text-white px-4 py-2 rounded-l-full focus:outline-none"
                style={{
                    backgroundColor: '#86BFB0',
                    fontFamily: 'Poppins, sans-serif',
                    height: '40px',
                }}
            />
            <button
                type="submit"
                className="bg-custom-searchbar text-gray-400 px-4 py-3 rounded-r-full focus:outline-none flex items-center justify-center"
                style={{ height: '40px' }}
            >
                {isLoading ? (
                    <div
                        style={{
                            border: '4px solid bg-gray-400',
                            borderTop: '4px solid white',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            animation: 'spin 2s linear infinite',
                        }}
                    />
                ) : (
                    <FaSearch />
                )}
            </button>
            <style>
                {`
                    .bg-custom-searchbar::placeholder {
                        color: lightgray;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </form>
    );
}

export default SearchBar;
