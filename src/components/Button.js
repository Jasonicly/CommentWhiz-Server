import React from "react";

export function Button({ onClick, text, className }) {
    return (
        <button
            className={`relative px-4 py-2 text-sm font-medium text-gray-700 bg-transparent border-2 border-gray-700 rounded-lg transition hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
