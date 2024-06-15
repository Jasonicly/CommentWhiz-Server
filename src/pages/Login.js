// src/pages/Login.js
import React from 'react';
import Header from "../components/Header";

const Login = () => {
    // Define your styles as JavaScript objects
    const styles = {
        customGradient: {
            background: 'linear-gradient(to bottom, #5da0b8, #477a8e)',
        },
        commentImage: {
            position: 'absolute',
            top: '18%',
            right: '-50px',
            transform: 'translateY(-50%)',
            width: '100px',
        },
        formContainer: {
            position: 'relative',
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="bg-custom-green justify-center items-center h-screen relative">
            <Header />
            <div className="flex justify-center items-center h-screen relative">
                <div className="flex bg-white rounded-2xl shadow-2xl overflow-visible max-w-4xl w-full relative">
                    <div className="hidden md:flex flex-col items-center justify-center text-white p-10 rounded-l-2xl" style={styles.customGradient}>
                        <h1 className="text-3xl font-bold mb-2">Welcome to</h1>
                        <h2 className="text-5xl font-bold">Comment Whiz</h2>
                        <img src="/images/logo.png" alt="CommentSense Logo" className="w-64 mt-6" />
                    </div>
                    <div className="flex-1 p-8 bg-gray-100 rounded-r-2xl" style={styles.formContainer}>
                        <h2 className="text-4xl font-semibold text-center mb-6 text-green-800">Login</h2>
                        <form id="loginForm" onSubmit={handleSubmit} className="space-y-6">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 hover:border-green-500 transition duration-200 ease-in-out"
                            />

                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 hover:border-green-500 transition duration-200 ease-in-out"
                            />

                            <div className="flex justify-end space-x-4 mt-6">
                                <button type="button" aria-label="Cancel login" className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-200 ease-in-out">
                                    Cancel
                                </button>
                                <input type="submit" value="Login" className="px-5 py-2 bg-green-700 text-white rounded-lg cursor-pointer hover:bg-green-800 transition duration-200 ease-in-out" />
                            </div>
                        </form>
                        <p className="text-center mt-6">Don't have an account? <a href="/register" className="text-green-700 hover:underline">Register here</a></p>
                        <div className="flex items-center justify-center mt-6">
                            <button aria-label="Login with Google" className="bg-gray-300 p-3 rounded-full mx-2 hover:bg-gray-400 transition duration-200 ease-in-out">
                                <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="Google" className="w-6 h-6" />
                            </button>
                            <button aria-label="Login with Facebook" className="bg-gray-300 p-3 rounded-full mx-2 hover:bg-gray-400 transition duration-200 ease-in-out">
                                <img src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" alt="Facebook" className="w-6 h-6" />
                            </button>
                        </div>
                        <img src="/images/text.png" alt="Comment Image" style={styles.commentImage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;