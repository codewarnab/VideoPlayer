import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate(); 
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginuser = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setLoading(false);
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        toast.success("Logout Successfully");
        navigate("/authSignin"); // Use navigate to redirect

    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }

        setLoading(false); // Set loading to false once the user and token are initialized
    }, []);

    useEffect(() => {
        if (user && token) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        }
    }, [user, token]);

    return (
        <UserContext.Provider value={{ user, token, loginuser, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};
