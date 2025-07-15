import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';

function Register() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showResendButton, setShowResendButton] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Handles the final form submission.
   *
   * FIX:
   * 1. Added comprehensive validation for all required fields before making an API call.
   * 2. Moved `setLoading(true)` to after the validation checks for a better user experience.
   * 3. Removed the `finally` block and now only call `setLoading(false)` in the `catch` block.
   *    This prevents trying to update state on an unmounted component after a successful registration,
   *    which was the likely cause of the unpredictable behavior.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- Step 1: Comprehensive Validation ---
    if (!formData.name || !formData.email || !formData.password || !formData.age) {
      toast.error('Missing required fields from Personal Information step.');
      // Force user back to the first step if they somehow skipped it
      setCurrentStep(1);
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // --- Step 2: Set Loading and Make API Call ---
    setLoading(true);

    try {
      console.log('Submitting form data:', formData);
      await axios.post(`${BASE_URL}/api/user/`, formData);
      toast.success('Registration successful! Please check your email to verify your account.');

      // On success, update state to show the verification message.
      // The component will unmount, so we do NOT update the loading state here.
      setIsRegistered(true);
      setShowResendButton(true);

    } catch (error) {
      console.error('Registration failed:', error.response?.data);
      toast.error(error.response?.data?.message || 'Registration failed!');
      
      // On failure, the component remains mounted, so we must reset the loading state
      // to allow the user to try submitting again.
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
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

const nextStep = () => {
  // Validate current step before proceeding
  if (currentStep === 1) {
    // Trim whitespace and check for empty values
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();
    const trimmedAge = formData.age.toString().trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedAge) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (trimmedAge <= 0) {
      toast.error('Please enter a valid age');
      return;
    }
  }
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
                  Full Name *
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
                  Age *
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
                Email Address *
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
                Password *
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

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-gray-50"
              >
                <option value="farmer">Farmer</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admin</option>
              </select>
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
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📧</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Check Your Email!</h2>
          <p className="text-gray-600 mb-6">
            We've sent a verification email to <strong>{formData.email}</strong>. 
            Please check your inbox and click the verification link to activate your account.
          </p>
          
          <div className="space-y-4">
            {showResendButton && (
              <button
                onClick={handleResendVerification}
                disabled={resendLoading}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
              >
                {resendLoading ? 'Sending...' : 'Resend Verification Email'}
              </button>
            )}
            
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Go to Login
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Didn't receive the email? Check your spam folder or click resend above.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className='flex items-center justify-center min-h-screen pt-20'>
        <div className='w-full max-w-7xl mx-auto px-4'>
          <div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
            <div className='lg:flex'>
              <div className='lg:w-3/5 p-8 lg:p-12'>
                <div className='max-w-2xl mx-auto'>
                  <div className='text-center mb-8'>
                    {/* ... Header ... */}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-8">
                    {/* ... Progress Bar JSX ... */}
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
                {/* ... Image and Info JSX ... */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;