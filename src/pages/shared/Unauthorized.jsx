// src/components/Unauthorized.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md text-center">
                <h1 className="text-3xl font-semibold text-red-500 mb-4">Unauthorized Access</h1>
                <p className="text-gray-700 mb-4">You do not have permission to view this page.</p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => navigate('/')}
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;
