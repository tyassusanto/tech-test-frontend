import { useEffect, useState } from 'react'
import { login } from '../app/features/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Show / Hide Password
    const [showPassword, setShowPassword] = useState(false);
    const handleMouseDown = () => setShowPassword(true);
    const handleMouseUp = () => setShowPassword(false);

    // Login State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { loading, error, user } = useSelector((state) => state.authentication);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    useEffect(() => {
        if (user && user.token) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        console.log("Error state:", error);
    }, [error]);


    return (
        <form onSubmit={handleSubmit} className="max-w-sm m-auto w-full">
            <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                <div className="mt-2">
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        name="username"
                        id="username"
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoFocus
                    />
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                </div>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <span
                            className="text-gray-500 sm:text-sm pe-4 cursor-pointer"
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            title={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? `<View />` : `<ViewOff />`}
                        </span>
                    </div>
                </div>
            </div>
            {/* Error Message */}
            {error && error.message && (
                <span className="text-red-500 text-sm text-center">
                    <p className='pt-2'>{error.message}</p>
                </span>
            )}
            <div className='m-0 text-end'>
                <button
                    type="submit"
                    className="text-white px-6 py-2 mt-4 w-fit bg cursor-pointer bg-primary-600 font-medium bg-gray-600 rounded-sm text-center"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            Loading...
                        </div>
                    ) : (
                        'Login'
                    )}
                </button>
            </div>
        </form>
    )
}

export default LoginForm
