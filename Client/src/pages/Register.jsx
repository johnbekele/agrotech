import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showResendButton, setShowResendButton] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const cleanMobile = mobile.replace(/\D/g, '');
    return cleanMobile.length >= 10 && cleanMobile.length <= 15 && /^\d+$/.test(cleanMobile);
  };

  const validateStep1 = () => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();
    const trimmedMobile = formData.mobile.trim();
    const age = parseInt(formData.age);

    if (!trimmedName || !trimmedEmail || !trimmedPassword || !formData.age || !trimmedMobile) {
      toast.error('Please fill in all required fields');
      return false;
    }

    if (!validateEmail(trimmedEmail)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (!validateMobile(trimmedMobile)) {
      toast.error('Please enter a valid mobile number (10-15 digits)');
      return false;
    }

    if (isNaN(age) || age <= 0 || age > 120) {
      toast.error('Please enter a valid age (1-120)');
      return false;
    }

    if (trimmedPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep === 1) {
      if (!validateStep1()) {
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Form submission
// Form submission with detailed debugging
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const cleanedFormData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password.trim(),
      age: parseInt(formData.age),
      mobile: formData.mobile.trim(),
      address: formData.address.trim() || undefined,
      city: formData.city.trim() || undefined,
      state: formData.state.trim() || undefined,
      zipCode: formData.zipCode.trim() ? parseInt(formData.zipCode.trim()) : undefined,
      role: 'farmer'
    };

    console.log('=== FORM SUBMISSION DEBUG ===');
    console.log('Original form data:', formData);
    console.log('Cleaned form data:', cleanedFormData);
    console.log('API URL:', `${BASE_URL}/api/user/signup`);
    console.log('Mobile length:', cleanedFormData.mobile.length);
    console.log('Mobile validation:', validateMobile(cleanedFormData.mobile));
    console.log('===============================');

    const response = await axios.post(`${BASE_URL}/api/user/signup`, cleanedFormData);

    toast.success('Registration successful! Please check your email to verify your account.');
    setIsRegistered(true);
    setShowResendButton(true);

  } catch (error) {
    console.error('=== ERROR DEBUG ===');
    console.error('Full error:', error);
    console.error('Error response:', error.response);
    console.error('Error response data:', error.response?.data);
    console.error('Error response status:', error.response?.status);
    console.error('Error message:', error.response?.data?.message);
    console.error('==================');

    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.response?.data?.error) {
      toast.error(error.response.data.error);
    } else if (error.response?.status === 400) {
      toast.error('Invalid form data. Please check your inputs.');
    } else if (error.response?.status === 409) {
      toast.error('Email or mobile number already exists. Please use different credentials.');
    } else {
      toast.error('Registration failed. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

  // Resend verification email
  const handleResendVerification = async () => {
    try {
      await axios.post(`${BASE_URL}/api/user/resend-verification`, {
        email: formData.email.trim()
      });
      toast.success('Verification email sent!');
    } catch (error) {
      toast.error('Failed to resend verification email');
    }
  };

  // Show success message if registered
  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2a7f62] to-[#1a5c47] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Please check your email to verify your account.
          </p>
          {showResendButton && (
            <button
              onClick={handleResendVerification}
              className="bg-[#2a7f62] text-white px-6 py-3 rounded-xl hover:bg-[#1f5a47] transition-colors font-medium"
            >
              Resend Verification Email
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a7f62] to-[#1a5c47] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-600">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-[#2a7f62] to-[#1f5a47] h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className={`text-xs ${currentStep >= 1 ? 'text-[#2a7f62] font-semibold' : 'text-gray-400'}`}>
              Personal
            </span>
            <span className={`text-xs ${currentStep >= 2 ? 'text-[#2a7f62] font-semibold' : 'text-gray-400'}`}>
              Address
            </span>
            <span className={`text-xs ${currentStep >= 3 ? 'text-[#2a7f62] font-semibold' : 'text-gray-400'}`}>
              Review
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Create Account</h2>
              <p className="text-gray-600 text-center mb-8">Enter your personal information</p>
              
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2a7f62] transition-colors bg-gray-50"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2a7f62] transition-colors bg-gray-50"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2a7f62] transition-colors bg-gray-50"
                    placeholder="Enter mobile number (10-15 digits)"
                    minLength="10"
                    maxLength="15"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2a7f62] transition-colors bg-gray-50"
                    placeholder="Enter your password (min 6 characters)"
                    minLength="6"
                    required
                  />
                </div>

                <div>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2a7f62] transition-colors bg-gray-50"
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-[#2a7f62] text-white py-3 rounded-xl hover:bg-[#1f5a47] transition-colors font-semibold text-lg"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Address Information */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Address Details</h2>
              <p className="text-gray-600 text-center mb-8">Enter your address information (optional)</p>
              
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2a7f62] transition-colors bg-gray-50"
                    placeholder="Enter your address"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2a7f62] transition-colors bg-gray-50"
                    placeholder="Enter your city"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2a7f62] transition-colors bg-gray-50"
                    placeholder="Enter your state"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2a7f62] transition-colors bg-gray-50"
                    placeholder="Enter your ZIP code"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-colors font-semibold"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 bg-[#2a7f62] text-white py-3 rounded-xl hover:bg-[#1f5a47] transition-colors font-semibold"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review and Submit */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Review & Submit</h2>
              <p className="text-gray-600 text-center mb-8">Please review your information</p>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">Personal Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mobile:</span>
                      <span className="font-medium">{formData.mobile}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">{formData.age}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">Address Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Address:</span>
                      <span className="font-medium">{formData.address || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">City:</span>
                      <span className="font-medium">{formData.city || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">State:</span>
                      <span className="font-medium">{formData.state || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ZIP Code:</span>
                      <span className="font-medium">{formData.zipCode || 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-colors font-semibold"
                  >
                    ← Previous
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#2a7f62] text-white py-3 rounded-xl hover:bg-[#1f5a47] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Submit Registration ✓'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;