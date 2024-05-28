import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Overview from "../components/Overview";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import Details from "../components/Details";

function NewPage() {
    return (
        <div>
            <Header />
            <SearchBar />
            <Details />
            <Overview />
            <Feedback />
            <Footer />
        </div>
    );
}

export default NewPage;
