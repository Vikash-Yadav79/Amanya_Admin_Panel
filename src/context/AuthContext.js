import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);

    const login = (userType, accessToken) => {
        setRole(userType);
        setToken(accessToken);
        localStorage.setItem('role', userType);
        localStorage.setItem('token', accessToken);
    };

    const logout = () => {
        setRole(null);
        setToken(null);
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ role, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
