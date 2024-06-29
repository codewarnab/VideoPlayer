// AuthLinks.js
import React from 'react';
import { Link } from 'react-router-dom';

const AuthLinks = ({ isActive, isSearchExpanded }) => {
    return (
        <div className={`flex space-x-4 ${isSearchExpanded ? 'hidden' : ''} ${isSearchExpanded && 'sm:hidden'}`}>
            <Link to="/authSignin" className={`px-3 py-2 text-sm  font-bold border border-black rounded hover:bg-gray-200 text-gray-900 ${isActive === 'authSignin' ? 'bg-slate-100' : ''}`}>
                Sign In
            </Link>
            <Link to="/authSignup" className="px-3   py-2 text-sm font-bold bg-black text-white rounded hover:bg-gray-800">
                Sign Up
            </Link>
        </div>
    );
};

export default AuthLinks;
// space - x - 4 