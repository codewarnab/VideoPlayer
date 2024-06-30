// CustomLink.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = ({ to, children, external = false }) => {
    if (external) {
        return (
            <a
                href={to}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300"
            >
                {children}
                <svg
                    className="w-5 h-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
            </a>
        );
    }

    return (
        <Link
            to={to}
            className="relative inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300"
        >
            {children}
            <svg
                className="w-5 h-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
        </Link>
    );
};

export default CustomLink;
