// AuthLinks.js
import React from 'react';
import { Link } from 'react-router-dom';

const AuthLinks = ({ isActive, isSearchExpanded }) => {
    return (
        <div className={`flex space-x-4 ${isSearchExpanded && 'hidden sm:flex'}` }>
            <Link to="/authSignin" className={`px-3 py-2  text-base font-bold border border-blue-600  rounded hover:text-blue-500  text-blue-950   ${isActive === 'authSignin' ? 'bg-slate-100' : ''}`}>
                Sign In
            </Link>
            <Link to="/authSignup" className="px-3   py-2 text-base font-bold bg-blue-600  text-white  rounded hover:bg-blue-500 ">
                Sign Up
            </Link>
        </div>
    );
};

export default AuthLinks;
// space - x - 4 