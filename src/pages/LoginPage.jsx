import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            <div className="flex items-center justify-center bg-gray-50 px-6 py-12">
                <LoginForm />
            </div>

            <div className="hidden md:flex items-center justify-center bg-primary-600">
                <div className="text-center px-8">
                    <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                    <p className="text-lg">Silakan login untuk melanjutkan ke dashboard.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
