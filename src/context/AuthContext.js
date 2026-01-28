'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        // Check for persisted user
        const storedUser = localStorage.getItem('resetBoxUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('resetBoxUser', JSON.stringify(userData));
        setShowLoginModal(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('resetBoxUser');
    };

    const openLogin = () => setShowLoginModal(true);
    const closeLogin = () => setShowLoginModal(false);

    return (
        <AuthContext.Provider value={{ user, login, logout, showLoginModal, openLogin, closeLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
