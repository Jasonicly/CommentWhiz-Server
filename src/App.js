// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewPage from './pages/NewPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Update each Route with the element prop */}
                    <Route path="/newpage" element={<NewPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    {/* Add more routes here if needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

