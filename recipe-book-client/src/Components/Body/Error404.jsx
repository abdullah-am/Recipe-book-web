import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
            <img
                src="https://i.ibb.co/Z17z7h4X/2127696-254548-P7-B60-X-324.jpg"
                alt="404 Illustration"
                className="w-80 h-auto mb-6 rounded-lg"
            />
            <h1 className="text-5xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">
                The page you are looking for does not exist.
            </p>
            <button
                onClick={goToHome}
                className="btn btn-primary mt-6 text-white bg-purple-400 hover:bg-purple-700"
            >
                Go to Home Page
            </button>
        </div>
    );
};

export default Error404;