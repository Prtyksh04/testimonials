'use client'
import React from 'react'
import SignIn from '../auth/signin/page';
const NotAuthenticated = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-buttoColor to-purple-300 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full text-center flex flex-col">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome Back!</h1>
                <p className="text-gray-600 mb-6">
                    Please authenticate to continue to your dashboard.
                </p>
                <button
                    onClick={()=>{window.location.href="/auth/signin"}}
                    className="bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
                >
                    Sign In
                </button>
                <a href="/" className='mt-2'>Home</a>
            </div>
        </div>
    );
}

export default NotAuthenticated