import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewPage from "./pages/NewPage";
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<NewPage />} />
            </Routes>
        </Router>
    );
}

export default App;
