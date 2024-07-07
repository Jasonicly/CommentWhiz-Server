import React from "react";

function Download() {
    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full bg-custom-green">
            <div className="w-full border-t-4 border-black relative flex items-center justify-center">
                <div className="absolute top-[-10px] left-0 w-full flex justify-between">
                    <div className="relative">
                        <div className="h-0.5 bg-black w-full absolute top-2"></div>
                        <div className="h-4 w-4 bg-black transform rotate-45 absolute top-0 left-0"></div>
                    </div>
                    <div className="relative">
                        <div className="h-0.5 bg-black w-full absolute top-2"></div>
                        <div className="h-4 w-4 bg-black transform rotate-45 absolute top-0 right-0"></div>
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 z-10 bg-custom-green px-2">
                    Download Now
                </h1>
            </div>
            <p className="text-lg text-gray-700 mt-4">
                Download the extension to get started with CommentWhiz
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center mt-8">
                <a
                    href="#"
                    className="relative px-4 py-2 text-sm font-medium text-white bg-gray-500 border-1 border-gray-700 rounded-lg transition hover:bg-custom-gray hover:text-black focus:ring-4 focus:outline-none focus:ring-gray-500 mt-4 md:mt-0"
                >
                    Download for Windows
                </a>
            </div>
        </div>
    );
}

export default Download;
