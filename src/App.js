// src/App.js /
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewPage from './pages/NewPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ReportList from './pages/ReportList';
import PrivateAuthRoute from './auth/PrivateAuthRoute'; // Ensure correct import without braces if default exported
import NotFoundPage from './pages/NotFoundPage';
import UserInfo from './pages/UserPages/UserInfo';
import UserProfile from './pages/UserPages/UserProfile';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/report" element={<ReportList />} />
                    <Route path="/report/:reportId" element={<NewPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/user" element={<UserProfile />} />
                    <Route element={<PrivateAuthRoute />}>
                        <Route path="/user/:userId" element={<UserProfile />} />
                        <Route path="/user/:userId/history" element={<NewPage />} />
                        {/* Some kinds of routes can be private content, data management like the pages, or dashboard, history */}
                        {/* Any other routes you want to protect would also go here as children */}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;

