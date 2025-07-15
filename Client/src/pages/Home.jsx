import React from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
      {/* Enhanced Navbar */}
      <nav className='navbar p-4 px-8 w-full h-20 flex items-center bg-white/90 backdrop-blur-md fixed top-0 z-50 shadow-lg border-b border-gray-200'>
        <div className='flex align-center items-center justify-start gap-3 w-1/3'>
          <div className='relative'>
            {/* Random Icon Logo */}
            <div className='w-14 h-14 bg-gradient-to-br from-[#2a7f62] to-[#41676a] rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-105'>
              <span className='text-2xl text-white'>🌱</span>
            </div>
            <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse'></div>
          </div>
          <h2 className='text-3xl text-gray-800 font-bold bg-gradient-to-r from-[#2a7f62] to-[#41676a] bg-clip-text text-transparent'>
            AgroTech
          </h2>
        </div>
        
        <div className='flex items-center justify-center gap-6 w-1/3'>
          <Link to="/contact" className='text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-4 py-2 rounded-lg font-medium'>
            Contact Us
          </Link>
          <Link to="/about" className='text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-4 py-2 rounded-lg font-medium'>
            About Us
          </Link>
        </div>
        
        <div className='flex items-center justify-end w-1/3'>
          <Link to="/login">
            <button className="bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              Login
            </button>
          </Link>
        </div>
      </nav>

      {/* Enhanced Video Section */}
      <div className='relative' style={{ marginTop: '80px' }}>
        <video 
          src="../src/assets/agrotech.mp4" 
          autoPlay 
          loop 
          muted 
          className='w-full h-[85vh] object-cover'
        />
        <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
          <div className='text-center text-white'>
            <h1 className='text-6xl font-bold mb-4 animate-fade-in-up'>
              Welcome to AgroTech
            </h1>
            <p className='text-xl mb-8 animate-fade-in-up animation-delay-300'>
              Revolutionizing Agriculture Through Smart Equipment Rental
            </p>
            <Link to="/register">
              <button className='bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-500'>
                Start Your Journey
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <div className='w-full min-h-screen bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8] flex items-center py-20'>
        <div className='container mx-auto px-8 flex items-center'>
          <div className='w-1/2 pr-12'>
            <div className='animate-fade-in-left'>
              <h1 className='text-8xl font-bold mb-6 bg-gradient-to-r from-[#2a7f62] to-[#41676a] bg-clip-text text-transparent leading-tight'>
                AgroTech
              </h1>
              <h2 className='text-4xl text-[#41676a] mb-6 font-semibold'>
                Your Partner in Prosperous Farming
              </h2>
              <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
                AgroTech is dedicated to supporting farmers on their path to bountiful harvests. We provide easy access to essential tools through our rental platform, enhancing productivity and profitability. Together, let's cultivate a future where sustainable farming flourishes.
              </p>
              <div className='flex gap-4'>
                <Link to="/register">
                  <button className="bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                    Get Started
                  </button>
                </Link>
                <button className="border-2 border-[#2a7f62] text-[#2a7f62] hover:bg-[#2a7f62] hover:text-white font-bold py-4 px-8 rounded-xl transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          
          <div className='w-1/2 flex justify-center'>
            <div className='animate-fade-in-right'>
              <img 
                src="../src/assets/hero.png" 
                alt="Farming Equipment" 
                className='max-w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500'
              />
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-5xl font-bold text-gray-800 mb-4'>How It Works</h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Get the equipment you need in three simple steps
            </p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                step: '01',
                title: 'Browse Equipment',
                description: 'Explore our wide range of farming equipment available for rent',
                icon: '🔍'
              },
              {
                step: '02',
                title: 'Book & Schedule',
                description: 'Select your preferred dates and book the equipment online',
                icon: '📅'
              },
              {
                step: '03',
                title: 'Use & Return',
                description: 'Use the equipment for your farming needs and return when done',
                icon: '🚜'
              }
            ].map((item, index) => (
              <div key={index} className='text-center p-8 rounded-2xl bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2'>
                <div className='text-6xl mb-4'>{item.icon}</div>
                <div className='text-4xl font-bold text-[#2a7f62] mb-2'>{item.step}</div>
                <h3 className='text-2xl font-semibold text-gray-800 mb-4'>{item.title}</h3>
                <p className='text-gray-600'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className='py-20 bg-gradient-to-r from-[#2a7f62] to-[#41676a]'>
        <div className='container mx-auto px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white'>
            {[
              { number: '10,000+', label: 'Happy Farmers' },
              { number: '500+', label: 'Equipment Available' },
              { number: '50+', label: 'Cities Covered' },
              { number: '99%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <div key={index} className='p-6'>
                <div className='text-5xl font-bold mb-2'>{stat.number}</div>
                <div className='text-xl'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 bg-white'>
        <div className='container mx-auto px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-5xl font-bold text-gray-800 mb-4'>What Our Farmers Say</h2>
            <p className='text-xl text-gray-600'>Real stories from real farmers</p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                name: 'Rajesh Kumar',
                location: 'Punjab',
                testimonial: 'AgroTech has transformed my farming operations. Easy booking and quality equipment!',
                rating: 5
              },
              {
                name: 'Priya Sharma',
                location: 'Maharashtra',
                testimonial: 'Affordable rates and excellent service. Highly recommend to fellow farmers.',
                rating: 5
              },
              {
                name: 'Mohammed Ali',
                location: 'Karnataka',
                testimonial: 'The variety of equipment available is impressive. Great platform for modern farming.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className='bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='flex mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className='text-yellow-400 text-xl'>⭐</span>
                  ))}
                </div>
                <p className='text-gray-600 mb-6 italic'>"{testimonial.testimonial}"</p>
                <div className='flex items-center'>
                  <div className='w-12 h-12 bg-[#2a7f62] rounded-full flex items-center justify-center text-white font-bold mr-4'>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className='font-semibold text-gray-800'>{testimonial.name}</div>
                    <div className='text-gray-500'>{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Home