import React from "react";

function SearchBar() {
    return (
        <div className="bg-green-800 text-white text-center p-8">
            <h2 className="mb-4">Comment Whiz</h2>
            <input
                type="text"
                placeholder="Enter URL"
                className="p-2 w-80 mr-2"
            />
            <button className="p-2 bg-green-600 hover:bg-green-700 text-white">
                View Details
            </button>
        </div>
    );
}

export default SearchBar;
