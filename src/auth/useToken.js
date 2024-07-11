import { useState } from "react";

export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        try {
            return localStorage.getItem("token");
        } catch (error) {
            console.error("Error accessing local storage:", error);
            return null;
        }
    });

    const setToken = newToken => {
        try {
            localStorage.setItem("token", newToken);
            setTokenInternal(newToken);
        } catch (error) {
            console.error("Error setting token in local storage:", error);
        }
    }

    return [token, setToken];
};