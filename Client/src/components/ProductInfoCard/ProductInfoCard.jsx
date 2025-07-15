import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductInfoCard.css";
import Navbar from "../Navbar";

const ProductInfoCard = ({ product }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { company, availability, category, name, description } = product;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    pauseOnFocus: true,
    draggable: true,
    fade: false,
    adaptiveHeight: false,
    centerMode: false,
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: (i) => (
      <div className="w-3 h-3 bg-gray-300 rounded-full hover:bg-[#2a7f62] transition-colors duration-300"></div>
    ),
  };

  return (
    <>
    <Navbar/>
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100" style={{ fontFamily: "'Exo 2', sans-serif" }}>
      <div className="flex flex-col lg:flex-row">
        {/* Image Display Section */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8">
          <div className="relative">
            <Slider {...settings}>
              {product.images.map((image, index) => (
                <div key={index} className="focus:outline-none">
                  <div className="relative w-full h-80 lg:h-96">
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full rounded-xl object-cover shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                </div>
              ))}
            </Slider>
            
            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {currentSlide + 1} / {product.images.length}
            </div>
          </div>
        </div>

        {/* Product Information Section */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="space-y-8">
            {/* Header with Brand Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className='w-10 h-10 bg-gradient-to-br from-[#2a7f62] to-[#41676a] rounded-full flex items-center justify-center shadow-md'>
                <span className='text-lg text-white'>🌱</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#2a7f62] to-[#41676a] bg-clip-text text-transparent">
                AgroTech
              </h1>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-[#2a7f62] to-[#41676a] rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">Basic Information</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <InfoItem 
                  icon="🏷️" 
                  label="Product Name" 
                  value={product.name} 
                  highlight={true}
                />
                <InfoItem 
                  icon="📂" 
                  label="Category" 
                  value={product.category} 
                />
                <InfoItem 
                  icon="🏢" 
                  label="Company" 
                  value={product.company} 
                />
                <InfoItem 
                  icon="📍" 
                  label="Location" 
                  value={product.location || "Location not specified"} 
                />
              </div>
            </div>

            {/* Sale Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-[#2a7f62] to-[#41676a] rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">Rental Information</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <InfoItem 
                  icon="💰" 
                  label="Rental Price" 
                  value={`$${product.rentalPrice.toFixed(2)}/day`} 
                  valueClass="text-2xl font-bold text-[#2a7f62]"
                />
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📊</span>
                    <span className="font-medium text-gray-700">Availability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${product.availability ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`font-semibold ${product.availability ? 'text-green-600' : 'text-red-600'}`}>
                      {product.availability ? "Available" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-[#2a7f62] to-[#41676a] rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">Description</h2>
              </div>
              
              <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            </div>

            {/* Working Time */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-[#2a7f62] to-[#41676a] rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">Operating Hours</h2>
              </div>
              
              <InfoItem 
                icon="⏰" 
                label="Operational Hours" 
                value="24/7 Available" 
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button className="flex-1 bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <span>📞</span>
                Contact Owner
              </button>
              <button className="flex-1 bg-white hover:bg-gray-50 text-[#2a7f62] border-2 border-[#2a7f62] font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <span>❤️</span>
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

// Helper component for consistent info items
const InfoItem = ({ icon, label, value, highlight = false, valueClass = "" }) => (
  <div className={`flex items-center justify-between p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md ${highlight ? 'bg-gradient-to-r from-[#2a7f62]/5 to-[#41676a]/5' : 'bg-white'}`}>
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
    <span className={`font-semibold ${valueClass || (highlight ? 'text-[#2a7f62] text-lg' : 'text-gray-800')}`}>
      {value}
    </span>
  </div>
);

export default ProductInfoCard;