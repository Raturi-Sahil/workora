import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../../feature/auth/authSlice';
import type { AppDispatch } from '../../../store/store';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [authing, setAuthing] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setAuthing(true);
        setError('');
        try {
            const res = await dispatch(signInUser({ email, password })).unwrap();
            console.log('Login successful:', res);
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to login');
        } finally {
            setAuthing(false);
        }
    };

    const signInWithGoogle = () => {
        alert('Google login not implemented yet');
    };

    return (
        <div className='w-full h-screen flex'>
            {/* Left half of the screen - background styling */}
            <div className='w-1/2 h-full flex flex-col bg-[#282c34] items-center justify-center'></div>

            {/* Right half of the screen - login form */}
            <div className='w-1/2 h-full bg-[#1a1a1a] flex flex-col p-20 justify-center'>
                <div className='w-full flex flex-col max-w-[450px] mx-auto'>
                    {/* Header section */}
                    <div className='w-full flex flex-col mb-10 text-white'>
                        <h3 className='text-4xl font-bold mb-2'>Login</h3>
                        <p className='text-lg mb-4'>Welcome Back! Please enter your details.</p>
                    </div>

                    {/* Inputs */}
                    <div className='w-full flex flex-col mb-6'>
                        <input
                            type='email'
                            placeholder='Email'
                            className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Login Button */}
                    <div className='w-full flex flex-col mb-4'>
                        <button
                            className='w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer'
                            onClick={handleLogin}
                            disabled={authing}
                        >
                            Log In With Email and Password
                        </button>
                    </div>

                    {/* Error message */}
                    {error && <div className='text-red-500 mb-4'>{error}</div>}

                    {/* Divider */}
                    <div className='w-full flex items-center justify-center relative py-4'>
                        <div className='w-full h-[1px] bg-gray-500'></div>
                        <p className='text-lg absolute text-gray-500 bg-[#1a1a1a] px-2'>OR</p>
                    </div>

                    {/* Google Button */}
                    <button
                        className='w-full bg-white text-black font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer mt-7'
                        onClick={signInWithGoogle}
                        disabled={true}
                    >
                        Log In With Google
                    </button>
                </div>

                {/* Sign Up Link */}
                <div className='w-full flex items-center justify-center mt-10'>
                    <p className='text-sm font-normal text-gray-400'>
                        Don't have an account?{' '}
                        <span className='font-semibold text-white cursor-pointer underline'>
                            <a href='/signup'>Sign Up</a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
