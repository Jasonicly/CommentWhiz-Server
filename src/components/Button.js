import React from "react";

export function Button({ onClick, text, className }) {
    return (
        <button
            className={`relative px-4 py-2 text-sm font-medium text-black bg-gray-100 border-2 border-gray-700 rounded-lg transition hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-500 ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
