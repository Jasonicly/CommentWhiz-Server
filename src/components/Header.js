import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="header-container">
            <header className="bg-custom-green text-white flex items-center justify-between px-8 py-4">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
                        Comment Whiz
                    </h1>
                </div>
                <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8 justify-center mx-auto">
                    <ul className="flex space-x-8">
                        <li><a href="#" className="text-white hover:text-gray-300">HOME</a></li>
                        <li><a href="#" className="text-white hover:text-gray-300">FEATURES</a></li>
                        <li><a href="#" className="text-white hover:text-gray-300">ABOUT</a></li>
                    </ul>
                </nav>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {menuOpen ? <FaTimes size="24" /> : <FaBars size="24" />}
                    </button>
                </div>
            </header>
            {menuOpen && (
                <nav className="md:hidden bg-custom-green text-white px-4 py-2">
                    <ul className="space-y-4">
                        <li><a href="#" className="block text-white hover:text-gray-300">HOME</a></li>
                        <li><a href="#" className="block text-white hover:text-gray-300">FEATURES</a></li>
                        <li><a href="#" className="block text-white hover:text-gray-300">ABOUT</a></li>
                    </ul>
                </nav>
            )}
            <div className="border-b-2 border-gray-300 mx-4"></div>
        </div>
    );
}

export default Header;
