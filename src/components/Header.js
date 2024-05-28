import React from "react";

function Header() {
    return (
        <header className="bg-green-700 text-white flex justify-between p-4 items-center">
            <h1 className="text-lg font-bold">Comment Whiz</h1>
            <nav className="flex space-x-4">
                <a href="#" className="text-white">Home</a>
                <a href="#" className="text-white">Features</a>
                <a href="#" className="text-white">About</a>
            </nav>
        </header>
    );
}

export default Header;
