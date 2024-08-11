import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../components/Header";
import { useToken } from '../auth/useToken';
import Footer from '../components/Footer';
import PopUp from '../components/PopUp';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const [token, setToken] = useToken();
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const validateForm = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setSuccessMessage(''); // Clear success message if there's an error
            setErrorMessage('Passwords do not match');
        } else {
            setErrorMessage(''); // Clear error message if registration is successful
            try {
                const response = await axios.post('https://localhost:3001/register', {
                    email,
                    password
                });
                if (response.status === 201) {
                    setErrorMessage(''); // Clear error message on success
                    setSuccessMessage('User registered successfully');
                    setIsOpen(true);

                    const { token } = response.data;
                    setToken(token);
                }
            } catch (error) {
                setSuccessMessage(''); // Clear success message if there's an error
                setErrorMessage('An error occurred during registration, maybe the email already have been used or the email used is not valid');
                console.error('Error:', error);
            }
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleGoogleLogin = () => {
        window.location.href = 'https://localhost:3001/auth/google';
    };

    // Define styles
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
        errorMessage: {
            color: 'red',
            display: 'block',
        },
        successMessage: {
            color: 'green',
            display: 'block',
        },
    };

    return (
        <div>
            <Header />
            <div className="flex flex-col justify-center items-center h-screen relative">
                <div className="flex bg-white rounded-2xl shadow-2xl overflow-visible max-w-4xl w-full relative mt-6">
                    <div className="hidden md:flex flex-col items-center justify-center text-white p-10 rounded-l-2xl" style={styles.customGradient}>
                        <h1 className="text-3xl font-bold mb-2">Welcome to</h1>
                        <h2 className="text-5xl font-bold">Comment Whiz</h2>
                        <img src="/images/logoWhite.png" alt="CommentSense Logo" className="w-64 mt-6" />
                    </div>
                    <div className="flex-1 p-8 bg-gray-100 rounded-r-2xl" style={styles.formContainer}>
                        <h2 className="text-4xl font-semibold text-center mb-6 text-green-800">Register</h2>
                        <form id="registerForm" onSubmit={validateForm} className="space-y-6">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 hover:border-green-500 transition duration-200 ease-in-out"
                                value={email}
                                onChange={handleEmailChange}
                            />

                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 hover:border-green-500 transition duration-200 ease-in-out"
                                value={password}
                                onChange={handlePasswordChange}
                            />

                            <label htmlFor="confirm_password" className="sr-only">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 hover:border-green-500 transition duration-200 ease-in-out"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />

                            {errorMessage && <div id="error-message" style={styles.errorMessage}>{errorMessage}</div>}
                            {successMessage && <div id="success-message" style={styles.successMessage}>{successMessage}</div>}

                            <div className="flex justify-end space-x-4 mt-6">
                                <button type="button" aria-label="Cancel registration" className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-200 ease-in-out" onClick={resetForm}>
                                    Cancel
                                </button>
                                <input type="submit" value="Register" className="px-5 py-2 bg-green-700 text-white rounded-lg cursor-pointer hover:bg-green-800 transition duration-200 ease-in-out" />
                            </div>
                        </form>
                        <p className="text-center mt-6">Already have an account? <a href="/login" className="text-green-700 hover:underline">Log in</a></p>
                        <div className="flex items-center justify-center mt-6">
                            <button aria-label="Register with Google" className="bg-gray-300 p-3 rounded-full mx-2 hover:bg-gray-400 transition duration-200 ease-in-out" onClick={handleGoogleLogin}>
                                <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="Google" className="w-6 h-6" />
                            </button>
                            <button aria-label="Register with Facebook" className="bg-gray-300 p-3 rounded-full mx-2 hover:bg-gray-400 transition duration-200 ease-in-out">
                                <img src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" alt="Facebook" className="w-6 h-6" />
                            </button>
                        </div>
                        <img src="/images/text.png" alt="Comment Image" style={styles.commentImage} />
                    </div>
                </div>
            </div>
            <Footer />
            <PopUp isOpen={isOpen} onClose={() => { setIsOpen(false); navigate('/home'); }}>
                <h2 className="text-2xl font-semibold mb-4">Verify Your Email</h2>
                <p className="text-gray-700">Please check your email to verify your account.</p>
            </PopUp>
        </div>
    );
};

export default Register;
