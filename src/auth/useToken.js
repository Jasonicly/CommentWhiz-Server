import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        try {
            return Cookies.get("token");
        } catch (error) {
            console.error("Error accessing cookies:", error);
            return null;
        }
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");
        if (tokenFromUrl) {
            try {
                Cookies.set("token", tokenFromUrl, { expires: 7 });
                setTokenInternal(tokenFromUrl);
                window.history.replaceState({}, document.title, window.location.pathname); // Clean up the URL
                window.location.reload(); // Refresh the page
            } catch (error) {
                console.error("Error setting token in cookies:", error);
            }
        }
    }, []);

    const setToken = (newToken) => {
        try {
            Cookies.set("token", newToken, { expires: 7 });
            setTokenInternal(newToken);
        } catch (error) {
            console.error("Error setting token in cookies:", error);
        }
    };

    return [token, setToken];
};
