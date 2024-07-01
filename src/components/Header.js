import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="header-container">
            <header className="bg-custom-green text-custom-gray flex items-center justify-between px-8 py-4">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold tracking-wide" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Comment Whiz
                    </h1>
                </div>
                <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8 justify-center mx-auto">
                    <ul className="flex space-x-8">
                        <li><a href="/home" className="text-custom-gray hover:text-gray-500">HOME</a></li>
                        <li><a href="#" className="text-custom-gray hover:text-gray-500">FEATURES</a></li>
                        <li><a href="#" className="text-custom-gray hover:text-gray-500">ABOUT</a></li>
                    </ul>
                </nav>
                <div className="flex items-center space-x-4">
                    <a href="/login" className="hidden md:inline-block text-custom-gray hover:text-gray-500">
                        Log In
                    </a>
                    <a href="/signup" className="hidden md:inline-block bg-custom-blue text-white px-4 py-2 rounded hover:bg-custom-gray hover:text-custom-lightblue">
                        Sign Up
                    </a>
                    <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
                        {menuOpen ? <FaTimes size="24" /> : <FaBars size="24" />}
                    </button>
                </div>
            </header>
            {menuOpen && (
                <nav className="md:hidden bg-custom-green text-white px-4 py-2">
                    <ul className="space-y-4">
                        <li><a href="#" className="block text-custom-gray hover:text-gray-500">HOME</a></li>
                        <li><a href="#" className="block text-custom-gray hover:text-gray-500">FEATURES</a></li>
                        <li><a href="#" className="block text-custom-gray hover:text-gray-500">ABOUT</a></li>
                        <li><a href="/login" className="block text-custom-gray hover:text-gray-500">Log In</a></li>
                        <li><a href="/register" className="block text-custom-gray hover:text-gray-500">Sign Up</a></li>
                    </ul>
                </nav>
            )}
            <div className="border-b-2 border-custom-gray mx-4"></div>
        </div>
    );
}

export default Header;
