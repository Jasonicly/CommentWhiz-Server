import React from 'react';

const PopUp = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                {children}
                <button
                    className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-200 ease-in-out"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PopUp;
