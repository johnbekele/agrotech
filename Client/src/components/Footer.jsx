import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <footer className="bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg" style={{ fontFamily: "'Exo 2', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Brand Section */}
          <div className="flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className='w-12 h-12 bg-gradient-to-br from-[#2a7f62] to-[#41676a] rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-105'>
                <span className='text-xl text-white'>🌱</span>
              </div>
              <h2 className="text-3xl text-gray-800 font-bold bg-gradient-to-r from-[#2a7f62] to-[#41676a] bg-clip-text text-transparent">
                AgroTech
              </h2>
            </Link>
            <p className="text-gray-600 text-sm max-w-xs">
              Connecting farmers with quality agricultural equipment for sustainable farming solutions.
            </p>
            
            {/* Social Media Icons */}
            <div className='flex gap-3 mt-4'>
              <a href="#" className="p-2 rounded-lg hover:bg-[#b2d8b4]/20 transition-all duration-300 group">
                <i className="ri-instagram-line text-xl text-[#2a7f62] group-hover:scale-110 transition-transform"></i>
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-[#b2d8b4]/20 transition-all duration-300 group">
                <i className="ri-twitter-x-line text-xl text-[#2a7f62] group-hover:scale-110 transition-transform"></i>
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-[#b2d8b4]/20 transition-all duration-300 group">
                <i className="ri-facebook-box-fill text-xl text-[#2a7f62] group-hover:scale-110 transition-transform"></i>
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-[#b2d8b4]/20 transition-all duration-300 group">
                <i className="ri-linkedin-box-fill text-xl text-[#2a7f62] group-hover:scale-110 transition-transform"></i>
              </a>
            </div>
          </div>

          {/* Platform Section */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Platform</h3>
            <div className="flex flex-col gap-2">
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-3 py-2 rounded-lg font-medium"
                onMouseEnter={() => setHoveredLink('products')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Browse Equipment
              </Link>
              <Link 
                to="/add_tools" 
                className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-3 py-2 rounded-lg font-medium"
                onMouseEnter={() => setHoveredLink('add_tools')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                List Your Equipment
              </Link>
              <Link 
                to="/how-it-works" 
                className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-3 py-2 rounded-lg font-medium"
                onMouseEnter={() => setHoveredLink('how-it-works')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                How It Works
              </Link>
              <Link 
                to="/pricing" 
                className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-3 py-2 rounded-lg font-medium"
                onMouseEnter={() => setHoveredLink('pricing')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Company Section */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Company</h3>
            <div className="flex flex-col gap-2">
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-3 py-2 rounded-lg font-medium"
                onMouseEnter={() => setHoveredLink('about')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-3 py-2 rounded-lg font-medium"
                onMouseEnter={() => setHoveredLink('contact')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Contact
              </Link>
              <Link 
                to="/careers" 
                className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-3 py-2 rounded-lg font-medium"
                onMouseEnter={() => setHoveredLink('careers')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Careers
              </Link>
              <Link 
                to="/faq" 
                className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-3 py-2 rounded-lg font-medium"
                onMouseEnter={() => setHoveredLink('faq')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Support & Legal Section */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Support & Legal</h3>
            <div className="flex flex-col gap-2 mb-6">
              <Link 
                to="/support" 
                className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-3 py-2 rounded-lg font-medium"
                onMouseEnter={() => setHoveredLink('support')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Help Center
              </Link>
              <Link 
                to="/privacy" 
                className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-3 py-2 rounded-lg font-medium"
                onMouseEnter={() => setHoveredLink('privacy')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-3 py-2 rounded-lg font-medium"
                onMouseEnter={() => setHoveredLink('terms')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Terms of Service
              </Link>
            </div>

            {/* CTA Button */}
            <Link to="/register">
              <button className="bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              © 2024 AgroTech. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link to="/sitemap" className="text-gray-600 hover:text-[#2a7f62] transition-colors">
                Sitemap
              </Link>
              <Link to="/accessibility" className="text-gray-600 hover:text-[#2a7f62] transition-colors">
                Accessibility
              </Link>
              <Link to="/cookies" className="text-gray-600 hover:text-[#2a7f62] transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .grid-cols-1.md\\:grid-cols-4 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;