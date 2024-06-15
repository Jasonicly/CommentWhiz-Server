import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
    return (
        <div className="search-bar-container bg-custom-darkgreen text-white flex items-center justify-between p-4 m-4 rounded-lg border-1 border-brown">
            <h2 className="text-xl font-bold mr-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Comment Whiz
            </h2>
            <div className="relative flex items-center flex-grow">
                <FaSearch className="absolute left-3 text-gray-500" />
                <input
                    type="text"
                    placeholder="Enter URL"
                    className="w-full pl-10 pr-4 py-2 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                    style={{
                        backgroundColor: '#e0e0e0',
                        fontFamily: 'Poppins, sans-serif',
                    }}
                />
            </div>
        </div>
    );
}

export default SearchBar;
