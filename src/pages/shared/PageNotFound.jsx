import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white">
            <h1 className="text-9xl font-bold">404</h1>
            <h2 className="text-4xl font-medium mb-4">Page Not Found</h2>
            <p className="mb-8">The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="px-6 py-3 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out shadow-md"
            >
                Go Back Home
            </Link>
        </div>
    );
}

export default PageNotFound