// LoginProvider.js

import { useState } from "react";
import { LoginContext } from "./LoginContext";

export const LoginProvider = ({ children }) => {

    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const [isLoggedIn, setIsLoggedIn] = useState(loggedIn)

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("userId")
        localStorage.removeItem("username")
    };

    return (
        <LoginContext.Provider value={{ login, logout, isLoggedIn, setIsLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};
