import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/api';
import lemonPayLogo from '../../../src/assets/images/waveBlueBG.png';
import sideIMG from '../../../src/assets/images/loginBG.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError('');
    setIsLoading(true);

    try {
      const res = await loginUser({ email, password });

      const token = res.data.token;
      const userEmail = res.data.email;
      console.log(res.data)
      if (token) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('email', userEmail);
        console.log('Login successful, navigating...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (err) {
      const data = err.response?.data;
      if (Array.isArray(data?.errors)) {
        const errors = {};
        data.errors.forEach(({ param, msg }) => {
          errors[param] = msg;
        });
        setFieldErrors(errors);
      } else {
        setGlobalError(data?.error || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-10">
        <img src={lemonPayLogo} alt="lemonPay Logo" className="h-8 mb-10" />
        <h1 className="text-3xl font-bold mb-2">Log in</h1>
        <p className="text-gray-600 mb-6">Welcome back! Please enter your details.</p>

        {globalError && <p className="text-red-500 text-sm mb-4">{globalError}</p>}

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
            )}
          </div>
          <div className="flex items-center mb-2">
            <input type="checkbox" className="mr-2" id="remember" />
            <label htmlFor="remember" className="text-sm">Remember me</label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white py-2 rounded-md transition flex items-center justify-center gap-2`}
          >
            {isLoading && (
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            )}
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-sm">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>

        <footer className="mt-10 text-sm text-gray-400">© Lemon Pay 2025</footer>
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

export default LoginPage;
