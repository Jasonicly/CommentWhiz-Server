import React from "react";

export function Button({ onClick, text, className }) {
    return (
        <button
            className={`relative px-4 py-2 text-sm font-medium text-white bg-gray-500 border-1 border-gray-700 rounded-lg transition hover:bg-custom-gray hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-500 ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}
