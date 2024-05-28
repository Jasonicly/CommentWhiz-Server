import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
    return (
        <div className="bg-teal-600 text-white flex items-center justify-between p-4 m-4 rounded-lg">
            <h2 className="text-xl font-bold mr-4" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                Comment Whiz
            </h2>
            <div className="relative flex items-center flex-grow">
                <FaSearch className="absolute left-3 text-gray-500" />
                <input
                    type="text"
                    placeholder="Enter URL"
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
        </div>
    );
}

export default SearchBar;
