import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-9xl font-bold text-gray-800">404</h1>
                <p className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page Not Found</p>
                <p className="text-gray-500 mt-2">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link
                    to={"/"}
                    className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
}