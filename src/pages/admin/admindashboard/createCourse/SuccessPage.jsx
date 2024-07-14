import React from 'react';
import { CheckCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/dashboard');
    };

    return (
        <div className='flex justify-center items-center  p-4'>
            <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-md text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Success!</h1>
                <p className="text-gray-600">
                    Course has been created successfully.
                </p>
                <p className="text-gray-600 mt-2 mb-6">
                    View it in Courses Section 
                </p>
                <button
                    onClick={handleGoHome}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
                >
                    <Home className="w-5 h-5 mr-2" />
                    Go to All courses
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;