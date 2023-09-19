// LoginProvider.js

import { useState } from "react";
import { LoginContext } from "./LoginContext";

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <LoginContext.Provider value={{ login, logout, isLoggedIn, setIsLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};
