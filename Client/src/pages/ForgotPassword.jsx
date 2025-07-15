import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';

function ForgotPassword() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${BASE_URL}/api/user/forgot-password`, { email });
      setEmailSent(true);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
        <Navbar />
        <div className='flex items-center justify-center min-h-screen pt-20'>
          <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md mx-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📧</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Check Your Email!</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your inbox and follow the instructions.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Send Another Email
              </button>
              
              <Link
                to="/login"
                className="block w-full bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className='flex items-center justify-center min-h-screen pt-20'>
        <div className='w-full max-w-md mx-auto px-4'>
          <div className='bg-white rounded-3xl shadow-2xl p-8'>
            <div className='text-center mb-8'>
              <div className='flex items-center justify-center gap-3 mb-4'>
                <div className='w-12 h-12 bg-gradient-to-br from-[#2a7f62] to-[#41676a] rounded-full flex items-center justify-center'>
                  <span className='text-2xl text-white'>🔒</span>
                </div>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-[#2a7f62] to-[#41676a] bg-clip-text text-transparent'>
                  AgroTech
                </h1>
              </div>
              <h2 className='text-3xl font-bold text-gray-800 mb-2'>Forgot Password?</h2>
              <p className='text-gray-600'>Enter your email to receive a reset link</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-gray-50"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <div className='text-center mt-8'>
              <p className='text-gray-600'>
                Remember your password?{' '}
                <Link to="/login" className='text-[#2a7f62] hover:underline font-semibold'>
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;