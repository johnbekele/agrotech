import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';

// test for commit 

function Login() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResendButton, setShowResendButton] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setShowResendButton(false); 
  };

  const handleResendVerification = async () => {
    if (!formData.email) {
      toast.error('Please enter your email address');
      return;
    }

    setResendLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/user/resend-verification`, {
        email: formData.email
      });
      toast.success('Verification email sent! Please check your inbox.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send verification email');
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${BASE_URL}/api/user/login`, formData);
      console.log(response.data);
      const { message, user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      console.log('message', message, 'user', user, 'token', token);
      toast.success('Login successful!');
      navigate('/products');
    } catch (error) {
      console.error('Login failed:', error.response?.data);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      
      // Show resend button if email verification is required
      if (errorMessage.includes('verify your email')) {
        setShowResendButton(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Login Section */}
      <div className='flex items-center justify-center min-h-screen pt-20'>
        <div className='w-full max-w-6xl mx-auto px-4'>
          <div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
            <div className='md:flex'>
              {/* Left Side - Form */}
              <div className='md:w-1/2 p-12'>
                <div className='max-w-md mx-auto'>
                  {/* Header */}
                  <div className='text-center mb-8'>
                    <div className='flex items-center justify-center gap-3 mb-4'>
                      <div className='w-12 h-12 bg-gradient-to-br from-[#2a7f62] to-[#41676a] rounded-full flex items-center justify-center'>
                        <span className='text-2xl text-white'>🌱</span>
                      </div>
                      <h1 className='text-3xl font-bold bg-gradient-to-r from-[#2a7f62] to-[#41676a] bg-clip-text text-transparent'>
                        AgroTech
                      </h1>
                    </div>
                    <h2 className='text-4xl font-bold text-gray-800 mb-2'>Welcome Back!</h2>
                    <p className='text-gray-600'>Sign in to your account to continue</p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6'>
                      <p>{error}</p>
                      {showResendButton && (
                        <button
                          onClick={handleResendVerification}
                          disabled={resendLoading}
                          className="mt-2 text-sm underline hover:no-underline disabled:opacity-50"
                        >
                          {resendLoading ? 'Sending...' : 'Resend verification email'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-gray-50"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-gray-50"
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-600">Remember me</span>
                      </label>
                      <Link to="/forgot-password" className="text-sm text-[#2a7f62] hover:underline">
                        Forgot Password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </form>

                  {/* Footer */}
                  <div className='text-center mt-8'>
                    <p className='text-gray-600'>
                      Don't have an account?{' '}
                      <Link to="/register" className='text-[#2a7f62] hover:underline font-semibold'>
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className='md:w-1/2 bg-gradient-to-br from-[#2a7f62] to-[#41676a] p-12 flex items-center justify-center relative overflow-hidden'>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className='text-center text-white relative z-10'>
                  <img 
                    src="../src/assets/hero.png" 
                    alt="Agriculture Equipment" 
                    className="w-full max-w-md mx-auto mb-8 drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                  <h3 className='text-3xl font-bold mb-4'>Join AgroTech Today!</h3>
                  <p className='text-lg text-white/90'>
                    Access premium agricultural equipment and boost your farming productivity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;