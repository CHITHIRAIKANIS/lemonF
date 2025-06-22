import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/api'; // ✅ import from central api
import lemonPayLogo from '../../../src/assets/images/waveBlueBG.png';
import sideIMG from '../../../src/assets/images/loginBG.png';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await registerUser({ email, password });

      if (res.data.message) {
        setMessage('Successfully signed up!');
        setEmail('');
        setPassword('');
        setTimeout(() => {
          navigate('/login'); // redirect to login page
        }, 2000);
      }
    } catch (err) {
      const data = err.response?.data;

      if (Array.isArray(data?.errors) && data.errors.length > 0) {
        setError(data.errors[0].msg); // express-validator error
      } else if (data?.error) {
        setError(data.error); // controller error
      } else {
        setError('Signup failed');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center">
      {/* Left Side - Signup Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-10">
        <img src={lemonPayLogo} alt="lemonPay Logo" className="h-8 mb-10" />
        <h1 className="text-3xl font-bold mb-4">Sign up</h1>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create account
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
        <footer className="mt-10 text-sm text-gray-400">© LemonPay 2025</footer>
      </div>

      {/* Right Side - Preview Screenshot */}
      <div className="hidden md:block w-1/2 bg-blue-500 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={sideIMG}
            alt="Preview"
            className="w-4/5 rounded-xl shadow-2xl border"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
