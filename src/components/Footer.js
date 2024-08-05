import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-custom-gray text-black py-8 w-full">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold">Comment Whiz</h3>
                    <p className="text-sm">© 2024 | The Comment Whiz team</p>
                </div>
                <div className="mb-4 md:mb-0">
                    <ul className="flex flex-col md:flex-row md:space-x-6">
                        <li><a href="/home" className="hover:text-gray-400">Home</a></li>
                        <li><a href="#" className="hover:text-gray-400">Features</a></li>
                        <li><a href="/about" className="hover:text-gray-400">About</a></li>
                        <li><a href="/login" className="hover:text-gray-400">Log In</a></li>
                        <li><a href="/signup" className="hover:text-gray-400">Sign Up</a></li>
                    </ul>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-400"><FaFacebook size="24" /></a>
                    <a href="#" className="hover:text-gray-400"><FaTwitter size="24" /></a>
                    <a href="#" className="hover:text-gray-400"><FaInstagram size="24" /></a>
                    <a href="#" className="hover:text-gray-400"><FaLinkedin size="24" /></a>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-4 pt-4 w-full">
                <div className="container mx-auto text-center">
                    <p className="text-sm">Privacy Policy | Terms of Service | Contact Us</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
