import React from "react";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Contact = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/contact`, formData);
      console.log(response.data); 
      setMessage({ text: "Message Send Successfully.", error: false });
      setFormData({
        name: "",
        mobile: "",
        message: ""
      });
    } catch (error) {
      console.error('Error Sending Message : ', error.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8]" style={{ fontFamily: "'Exo 2', sans-serif" }}>
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-[#2a7f62] to-[#41676a] bg-clip-text text-transparent mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <div className="flex justify-center px-4 pb-20">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Info */}
            <div className="md:w-1/2 bg-gradient-to-br from-[#2a7f62] to-[#41676a] text-white p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center'>
                    <span className='text-2xl'>📞</span>
                  </div>
                  <p className="text-2xl font-bold">Contact Us</p>
                </div>
                
                <div className="text-5xl font-bold mt-4 mb-6 leading-tight">
                  Get in Touch with <br />
                  <span className="text-[#b2d8b4]">AgroTech</span>
                </div>
                
                <p className="text-lg mb-8 text-white/90 leading-relaxed">
                  Feel free to connect with us for any of your needs regarding our services. 
                  Our support team is ready to solve any of your issues. Just send us a message 
                  and we will get back to you immediately.
                </p>
                
                <div className="space-y-6">
                  <div className="text-2xl font-bold text-[#b2d8b4]">
                   Poland
                  </div>
                  <hr className="border-white/30 my-6" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-lg">📍</span>
                      </div>
                      <p className="text-lg"> Ulica Bysewska 30, 80-298 Gdańsk </p>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-lg">✉️</span>
                      </div>
                      <a href="mailto:agrotech01@gmail.com" className="text-lg hover:text-[#b2d8b4] transition-colors">
                        agrotech01@mock.pl
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-lg">📱</span>
                      </div>
                      <p className="text-lg">+48 7892349072</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Form */}
            <div className="md:w-1/2 bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8] p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold text-[#2a7f62] mb-2">Drop Us a Message</h2>
                  <p className="text-gray-600">We'll get back to you within 24 hours</p>
                </div>
                
                {message && (
                  <div className={`p-4 rounded-xl ${message.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message.text}
                  </div>
                )}
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-[#2a7f62] text-sm font-bold mb-2" htmlFor="name">
                      Your Name
                    </label>
                    <input 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-white" 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#2a7f62] text-sm font-bold mb-2" htmlFor="mobile">
                      Your Number
                    </label>
                    <input 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-white" 
                      type="tel" 
                      name="mobile" 
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[#2a7f62] text-sm font-bold mb-2" htmlFor="message">
                      How Can We Help?
                    </label>
                    <textarea 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#2a7f62] focus:outline-none transition-colors bg-white h-32 resize-none" 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      required 
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Send My Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;