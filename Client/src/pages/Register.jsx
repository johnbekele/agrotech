import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';

function Register() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    age: '',
    role: 'farmer',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      const response = await axios.post(`${BASE_URL}/api/user/`, formData);
      console.log(response.data);
      toast.success('Successfully Registered!');
      setIsRegistered(true);
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      toast.error('Registration failed!!');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h3>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-gray-50"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-gray-50"
                  placeholder="Enter your age"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-gray-50"
                placeholder="Enter your mobile number"
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
                placeholder="Create a strong password"
                required
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Address Information</h3>
              <p className="text-gray-600">Tell us where you're located</p>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-gray-50 h-24 resize-none"
                placeholder="Enter your complete address"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-gray-50"
                  placeholder="Enter your city"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-gray-50"
                  placeholder="Enter your state"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-gray-50"
                placeholder="Enter your zip code"
                required
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (isRegistered) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8] flex items-center justify-center' style={{ fontFamily: "'Exo 2', sans-serif" }}>
        <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md mx-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-8">Welcome to AgroTech! Your account has been created successfully.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Continue to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Registration Section */}
      <div className='flex items-center justify-center min-h-screen pt-20'>
        <div className='w-full max-w-7xl mx-auto px-4'>
          <div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
            <div className='lg:flex'>
              {/* Left Side - Form */}
              <div className='lg:w-3/5 p-8 lg:p-12'>
                <div className='max-w-2xl mx-auto'>
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
                    <h2 className='text-4xl font-bold text-gray-800 mb-2'>Create Account</h2>
                    <p className='text-gray-600'>Join thousands of farmers using AgroTech</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex items-center ${currentStep >= 1 ? 'text-[#2a7f62]' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#2a7f62] text-white' : 'bg-gray-200'}`}>
                          1
                        </div>
                        <span className="ml-2 text-sm font-medium">Personal</span>
                      </div>
                      <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-[#2a7f62]' : 'bg-gray-200'}`}></div>
                      <div className={`flex items-center ${currentStep >= 2 ? 'text-[#2a7f62]' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#2a7f62] text-white' : 'bg-gray-200'}`}>
                          2
                        </div>
                        <span className="ml-2 text-sm font-medium">Address</span>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit}>
                    {renderStepContent()}
                    
                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-3 border-2 border-[#2a7f62] text-[#2a7f62] rounded-xl hover:bg-[#2a7f62] hover:text-white transition-all duration-300"
                        >
                          Previous
                        </button>
                      )}
                      
                      <div className="ml-auto">
                        {currentStep < 2 ? (
                          <button
                            type="button"
                            onClick={nextStep}
                            className="px-8 py-3 bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                          >
                            Next Step
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                          >
                            {loading ? 'Creating Account...' : 'Create Account'}
                          </button>
                        )}
                      </div>
                    </div>
                  </form>

                  {/* Footer */}
                  <div className='text-center mt-8'>
                    <p className='text-gray-600'>
                      Already have an account?{' '}
                      <Link to="/login" className='text-[#2a7f62] hover:underline font-semibold'>
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Image and Info */}
              <div className='lg:w-2/5 bg-gradient-to-br from-[#2a7f62] to-[#41676a] p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden'>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className='text-center text-white relative z-10'>
                  <img 
                    src="../src/assets/hero.png" 
                    alt="Agriculture Equipment" 
                    className="w-full max-w-sm mx-auto mb-8 drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                  <h3 className='text-3xl font-bold mb-4'>Start Your Journey</h3>
                  <p className='text-lg text-white/90 mb-8'>
                    Join AgroTech and get access to premium agricultural equipment that will revolutionize your farming experience.
                  </p>
                  
                  {/* Benefits */}
                  <div className='space-y-4 text-left'>
                    <div className='flex items-center gap-3'>
                      <div className='w-6 h-6 bg-white/20 rounded-full flex items-center justify-center'>
                        <span className='text-sm'>✓</span>
                      </div>
                      <span>Access to 500+ farming equipment</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-6 h-6 bg-white/20 rounded-full flex items-center justify-center'>
                        <span className='text-sm'>✓</span>
                      </div>
                      <span>24/7 customer support</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-6 h-6 bg-white/20 rounded-full flex items-center justify-center'>
                        <span className='text-sm'>✓</span>
                      </div>
                      <span>Affordable rental rates</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-6 h-6 bg-white/20 rounded-full flex items-center justify-center'>
                        <span className='text-sm'>✓</span>
                      </div>
                      <span>Nationwide delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;