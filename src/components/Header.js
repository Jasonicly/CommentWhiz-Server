import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import SearchBar from "./SearchBar"; // Import the SearchBar component

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="header-container">
            <header className="bg-custom-green text-black flex items-center justify-between px-8 py-4">
                <div className="flex items-center space-x-4">
                    <img src={process.env.PUBLIC_URL + '../images/logoWhite.png'} alt="logo" className="w-12 h-12 mx-auto mr-4" />
                    <h1 className="text-4xl font-extrabold tracking-wide">
                        <span style={{ color: 'white', fontFamily: 'Oswald, sans-serif', fontWeight: 'bold' }}>Comment</span> <span style={{ color: 'black', fontFamily: 'Oswald, sans-serif', fontWeight: 'bold' }}>Whiz</span>
                    </h1>
                    <div className="hidden lg:flex items-center ml-4">
                        <SearchBar /> {/* Show the search bar only on large and larger screens */}
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="/home" className="hidden lg:inline-block text-white hover:text-gray-500">Home</a>
                    <a href="#" className="hidden lg:inline-block text-white hover:text-gray-500">Features</a>
                    <a href="#" className="hidden lg:inline-block text-white hover:text-gray-500">About</a>
                    <a href="#" className="hidden lg:inline-block text-white hover:text-gray-500">Reports</a>
                    <a href="/login" className="hidden lg:inline-block bg-white text-custom-green px-4 py-2 rounded hover:bg-gray-500 hover:text-white">
                        Login
                    </a>
                    <button onClick={toggleMenu} className="lg:hidden text-black focus:outline-none">
                        {menuOpen ? <FaTimes size="24" /> : <FaBars size="24" />}
                    </button>
                </div>
            </header>
            <div className="border-b-2 border-black mx-0"></div>
            {menuOpen && (
                <nav className="lg:hidden bg-custom-gray text-white px-4 py-2 border-b-2 border-black">
                    <ul className="space-y-4">
                        <li><SearchBar /></li>
                        <li><a href="/home" className="block text-black hover:text-gray-500">HOME</a></li>
                        <li><a href="#" className="block text-black hover:text-gray-500">FEATURES</a></li>
                        <li><a href="#" className="block text-black hover:text-gray-500">ABOUT</a></li>
                        <li><a href="#" className="block text-black hover:text-gray-500">REPORTS</a></li>
                        <li><a href="/login" className="block text-black hover:text-gray-500">Log In</a></li>
                        <li><a href="/register" className="block text-black hover:text-gray-500">Sign Up</a></li>
                    </ul>
                </nav>
            )}
        </div>
    );
}
export default Header;
