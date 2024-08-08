import { useState, useEffect } from "react";

export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        try {
            return localStorage.getItem("token");
        } catch (error) {
            console.error("Error accessing local storage:", error);
            return null;
        }
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");
        if (tokenFromUrl) {
            try {
                localStorage.setItem("token", tokenFromUrl);
                setTokenInternal(tokenFromUrl);
                window.history.replaceState({}, document.title, window.location.pathname); // Clean up the URL
                window.location.reload(); // Refresh the page
            } catch (error) {
                console.error("Error setting token in local storage:", error);
            }
        }
    }, []);

    const setToken = (newToken) => {
        try {
            localStorage.setItem("token", newToken);
            setTokenInternal(newToken);
        } catch (error) {
            console.error("Error setting token in local storage:", error);
        }
    };

    return [token, setToken];
};
