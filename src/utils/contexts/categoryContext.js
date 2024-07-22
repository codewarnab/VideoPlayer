import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await axios.get('/category/getallCategory');
            setCategories(res?.data?.categories);
            setLoading(false);
        } catch (err) {
            console.error(`Failed to fetch categories: ${err}`);
            setError(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, categoryLoading, error }}>
            {children}
        </CategoryContext.Provider>
    );
};