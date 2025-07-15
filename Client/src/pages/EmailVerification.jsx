import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function EmailVerificationSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link');
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/user/verify-email?token=${token}`);
        setStatus('success');
        setMessage(response.data.message);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Verification failed');
      }
    };

    verifyEmail();
  }, [searchParams]);

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
          </div>
        );
      
      case 'success':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Email Verified Successfully!</h2>
            <p className="text-gray-600 mb-8">{message}</p>
            
            <div className="space-y-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Continue to Login
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
            <p className="text-gray-600 mb-8">{message}</p>
            
            <div className="space-y-4">
              <button
                onClick={() => navigate('/register')}
                className="w-full bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Try Again
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
      
      <div className='flex items-center justify-center min-h-screen pt-20'>
        <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-md mx-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default EmailVerificationSuccess;