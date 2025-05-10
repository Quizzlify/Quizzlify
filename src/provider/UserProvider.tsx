"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ObjectId } from 'mongodb';

type UserContextType = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const userContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/check', { method: 'GET' });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.error || 'Login failed');
            }

            const data = await response.json();
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const signup = async (username: string, email: string, password: string) => {
        try {
            const response = await fetch('/api/auth/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) throw new Error('Signup failed');

            const data = await response.json();
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Signup error:', error);
        }
    };
    const logout = async () => {
        try {
            const response = await fetch('/api/auth/logout', { method: 'POST' });

            if (!response.ok) throw new Error('Logout failed');

            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <userContext.Provider
            value={{ user, isLoading, isAuthenticated, login, signup, logout }}
        >
            {children}
        </userContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(userContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};