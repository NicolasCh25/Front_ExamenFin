import { createContext, useState, useEffect, useContext } from 'react';
import api from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // LOGIN
    const login = async (email, password) => {
        try {
            const { data } = await api.post('/usuario/login', { email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            
            return { success: true };

        } catch (error) {
            console.error("Error en login:", error);
            return { 
                success: false, 
                message: error.response?.data?.message || 
                'Credenciales incorrectas o error de servidor.' 
            };
        }
    };

    // REGISTro
    const register = async (userData) => {
        try {
           
            const { data } = await api.post('/auth/register', userData);

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
            }

            return { success: true };

        } catch (error) {
            console.error("Error en register:", error);
            return {
                success: false,
                message: error.response?.data?.message || 
                'Error al registrar usuario.'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                login, 
                register, 
                logout, 
                loading 
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);