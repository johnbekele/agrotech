import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(5);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. Please check your email and try again.');
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/user/verify-email?token=${token}`);
        setStatus('success');
        setMessage(response.data.message);
        toast.success('Email verified successfully!');
        
        // Start countdown to redirect
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/login');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Email verification failed. Please try again.');
        toast.error('Email verification failed!');
      }
    };

    verifyEmail();
  }, [searchParams, navigate, BASE_URL]);

  const handleResendVerification = async () => {
    const email = prompt('Please enter your email address to resend verification:');
    
    if (!email) return;

    try {
      await axios.post(`${BASE_URL}/api/user/resend-verification`, { email });
      toast.success('Verification email sent! Please check your inbox.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send verification email');
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Verifying Your Email...</h2>
            <p className="text-gray-600">Please wait while we verify your email address.</p>
            <div className="mt-4">
              <div className="animate-pulse bg-gray-200 h-2 rounded-full w-3/4 mx-auto"></div>
            </div>
          </div>
        );
      
      case 'success':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Email Verified Successfully!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-green-700 font-medium">🎉 Welcome to AgroTech!</p>
              <p className="text-green-600 text-sm mt-1">
                Your account is now active. You can start exploring our agricultural equipment and services.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-gray-700 font-medium">
                  Redirecting to login page in {countdown} seconds...
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-[#2a7f62] h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Continue to Login Now
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Go to Home
              </button>
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">❌</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-700 font-medium">⚠️ Common Issues:</p>
              <ul className="text-red-600 text-sm mt-2 text-left space-y-1">
                <li>• Verification link may have expired (24 hours limit)</li>
                <li>• Link may have been used already</li>
                <li>• Email may have been forwarded or modified</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={handleResendVerification}
                className="w-full bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Resend Verification Email
              </button>
              
              <button
                onClick={() => navigate('/register')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Create New Account
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors"
              >
                Go to Home
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className='flex items-center justify-center min-h-screen pt-20'>
        <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-md mx-4 w-full">
          <div className="text-center mb-8">
            <div className='flex items-center justify-center gap-3 mb-4'>
              <div className='w-12 h-12 bg-gradient-to-br from-[#2a7f62] to-[#41676a] rounded-full flex items-center justify-center'>
                <span className='text-2xl text-white'>🌱</span>
              </div>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-[#2a7f62] to-[#41676a] bg-clip-text text-transparent'>
                AgroTech
              </h1>
            </div>
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;