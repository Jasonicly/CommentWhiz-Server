// src/auth/useUser.js
import { useState, useEffect } from "react";
import { useToken } from "./useToken";

export const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = (token) => {
        if (!token) return null;

        try {
            const encodedPayload = token.split(".")[1];
            if (!encodedPayload) {
                console.error("Token is not in the expected format.");
                return null;
            }
            return JSON.parse(atob(encodedPayload));
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    const [user, setUser] = useState(() => getPayloadFromToken(token));

    useEffect(() => {
        setUser(getPayloadFromToken(token));
    }, [token]);

    return user;
};
