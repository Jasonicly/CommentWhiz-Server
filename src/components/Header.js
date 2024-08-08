import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; // Correct import
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";
import SearchBar from "./SearchBar"; // Import the SearchBar component

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const user = useUser();
    const [token, setToken] = useToken(); // Correct destructuring

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserEmail(decodedToken.id);
        }
    }, [token]);

    const isAuthenticated = () => {
        return token !== null;
    };

    const handleLogout = () => {
        setToken(null); // Clear the token from the state
        localStorage.removeItem('token'); // Remove the token from local storage
        // You can add any other logout logic here if needed
        window.location.reload(); // Refresh the page
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
                    {isAuthenticated() ? (
                        <>
                            <Link to="/home" className="hidden xl:inline-block text-black hover:text-white">Home</Link>
                            <Link to="/features" className="hidden xl:inline-block text-black hover:text-white">Features</Link>
                            <Link to="/about" className="hidden xl:inline-block text-black hover:text-white">About</Link>
                            <Link to="/report" className="hidden xl:inline-block text-black hover:text-white">Reports</Link>

                            <Link to="/user" className="hidden md:inline-block text-black hover:text-blue-500">
                                <h2>{userEmail.split('@')[0]}</h2>
                            </Link>
                            <button onClick={handleLogout} className="hidden md:inline-block bg-custom-blue text-white px-4 py-2 rounded hover:bg-black hover:text-custom-lightblue">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/home" className="hidden xl:inline-block text-black hover:text-white">Home</Link>
                            <Link to="/features" className="hidden xl:inline-block text-black hover:text-white">Features</Link>
                            <Link to="/about" className="hidden xl:inline-block text-black hover:text-white">About</Link>
                            <Link to="/report" className="hidden xl:inline-block text-black hover:text-white">Reports</Link>
                            <Link to="/login" className="hidden xl:inline-block bg-custom-blue text-white px-4 py-2 rounded hover:bg-black hover:text-custom-lightblue">Login</Link>
                        </>
                    )}
                    <button onClick={toggleMenu} className="xl:hidden text-black focus:outline-none">
                        {menuOpen ? <FaTimes size="24" /> : <FaBars size="24" />}
                    </button>
                </div>
            </header>
            <div className="border-b-2 border-black mx-0"></div>
            {menuOpen && (
                <nav className="lg:hidden bg-custom-gray text-white px-4 py-2 border-b-2 border-black">
                    <ul className="space-y-4">
                        <li><SearchBar /></li>
                        <Link to="/home" className="hidden xl:inline-block text-black hover:text-white">Home</Link>
                            <Link to="/features" className="hidden xl:inline-block text-black hover:text-white">Features</Link>
                            <Link to="/about" className="hidden xl:inline-block text-black hover:text-white">About</Link>
                            <Link to="/report" className="hidden xl:inline-block text-black hover:text-white">Reports</Link>
                        {isAuthenticated() ? (
                            <>
                                <Link to="/user" className="block text-black hover:text-blue-500">
                                    <h2>{userEmail.split('@')[0]}</h2>
                                </Link>
                                <button onClick={handleLogout} className="block text-black hover:text-gray-500">Log Out</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block text-black hover:text-gray-500">Log In</Link>
                                <Link to="/signup" className="block text-black hover:text-gray-500">Sign Up</Link>
                            </>
                        )}
                    </ul>
                </nav>
            )}
        </div>
    );
}
export default Header;
