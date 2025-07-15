import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
      <Navbar />
      
      {/* Hero Section with Floating Images */}
      <div className='pt-24 pb-16'>
        <div className="container mx-auto px-4">
          {/* Floating Images Grid */}
          <div className='relative mb-20'>
            <div className='grid grid-cols-2 gap-8 max-w-4xl mx-auto'>
              <div className='animate-float-1'>
                <img 
                  className='h-48 w-48 rounded-2xl shadow-2xl border-4 border-white hover:border-[#2a7f62] transition-all duration-500 transform hover:scale-105' 
                  src="../src/assets/mm.png" 
                  alt="Team Member" 
                />
              </div>
              <div className='animate-float-2 mt-8'>
                <img 
                  className='h-48 w-48 rounded-2xl shadow-2xl border-4 border-white hover:border-[#2a7f62] transition-all duration-500 transform hover:scale-105' 
                  src="../src/assets/hero.png" 
                  alt="Agriculture" 
                />
              </div>
            </div>
            
            {/* Central Title */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <h2 className="text-7xl font-bold text-center bg-gradient-to-r from-[#2a7f62] to-[#41676a] bg-clip-text text-transparent drop-shadow-lg">
                Join Our Team
              </h2>
            </div>
            
            {/* Bottom Images */}
            <div className='grid grid-cols-2 gap-8 max-w-4xl mx-auto mt-16'>
              <div className='animate-float-3'>
                <img 
                  className='h-48 w-48 object-cover rounded-2xl shadow-2xl border-4 border-white hover:border-[#2a7f62] transition-all duration-500 transform hover:scale-105' 
                  src="https://cdn.dribbble.com/users/3152125/screenshots/10763828/media/e96161bb4abf3695dc7dd3579a605343.gif" 
                  alt="Innovation" 
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Section */}
      <div className='py-20 bg-white'>
        <div className='container mx-auto px-8'>
          <div className='flex flex-col lg:flex-row gap-12 items-center'>
            {/* Left Side - Title */}
            <div className='w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-[#2a7f62] to-[#41676a] rounded-3xl shadow-2xl py-16 px-8'>
              <h2 className="text-6xl text-center font-bold text-white leading-tight">
                Who We Are?
              </h2>
            </div>
            
            {/* Right Side - Content */}
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8] p-12 rounded-3xl shadow-xl">
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-12 h-12 bg-gradient-to-br from-[#2a7f62] to-[#41676a] rounded-full flex items-center justify-center'>
                  <span className='text-2xl text-white'>🌱</span>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2a7f62] to-[#41676a] bg-clip-text text-transparent">
                  AgroTech
                </h1>
              </div>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                AgroTech connects farmers with a diverse range of rental machinery, facilitating seamless transactions for increased productivity and reduced costs.
              </p>
              
              <div className='space-y-6'>
                <div className='bg-white p-6 rounded-2xl shadow-lg'>
                  <h2 className="text-2xl font-bold text-[#2a7f62] mb-3 flex items-center gap-2">
                    <span className='text-xl'>🎯</span>
                    Our Mission:
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To provide farmers with easy access to quality agricultural machinery and equipment for rent, empowering them to enhance productivity and optimize resources.
                  </p>
                </div>
                
                <div className='bg-white p-6 rounded-2xl shadow-lg'>
                  <h2 className="text-2xl font-bold text-[#2a7f62] mb-3 flex items-center gap-2">
                    <span className='text-xl'>💎</span>
                    Our Values:
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Committed to quality, customer satisfaction, and fostering transparent, trustworthy relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Stats Section */}
      <div className='py-20 bg-gradient-to-r from-[#2a7f62] to-[#41676a]'>
        <div className='container mx-auto px-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white'>
            <div className='p-8'>
              <div className='text-5xl font-bold mb-2'>50+</div>
              <div className='text-xl'>Team Members</div>
            </div>
            <div className='p-8'>
              <div className='text-5xl font-bold mb-2'>10,000+</div>
              <div className='text-xl'>Happy Farmers</div>
            </div>
            <div className='p-8'>
              <div className='text-5xl font-bold mb-2'>5+</div>
              <div className='text-xl'>Years Experience</div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default About;