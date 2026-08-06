import React, { createContext, useState } from 'react';
import type { LoginRequest } from '../Types/LoginRequest';
import {loginAdmin, logoutAdmin} from "../api/authApi.ts";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginRequest) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    /*useEffect(() => {
        const controller = new AbortController();

            const checkSession = async () => {
            try {
                const response = await refreshAdminToken(controller.signal);

                if (response.success) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch  {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkSession();

        return () => {
            controller.abort();
        };
    }, []);*/

    const login = async (credentials: LoginRequest) => {
        setIsLoading(true);
        try {
            const response = await loginAdmin(credentials);

            if (response.success) {
                setIsAuthenticated(true);
                setIsLoading(false);
                return { success: true };
            }

            setIsLoading(false);
            return { success: false, message: response.message || 'Login failed' };
        } catch  {
            setIsLoading(false);
            return {
                success: false,
                message: 'An error occurred during login.'
            };
        }
    };

    const logout = async () => {
        try {
            await logoutAdmin();
        } catch (err) {
            console.error('Logout failed on server, cleaning up client state anyway.', err);
        } finally {
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/*
 export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};*/
