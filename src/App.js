// src/App.js /
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewPage from './pages/NewPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import ReportList from './pages/ReportList';

import NotFoundPage from './pages/NotFoundPage';
import ReportList from './pages/ReportList'; 

function App() {
    return (
        <Router>

            <div className="App">
                <Routes>
                    {/* Update each Route with the element prop */}
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/report" element={<ReportList />} />
                    <Route path="/report/:reportID" element={<NewPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    {/* Add more routes here if needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

