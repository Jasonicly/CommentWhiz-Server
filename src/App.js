import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewPage from "./pages/NewPage";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/newpage" element={<NewPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
