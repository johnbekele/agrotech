import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { CircularProgress, Chip, Rating, Avatar, Divider } from '@mui/material';
import { 
  LocationOn, 
  Business, 
  Category, 
  AttachMoney, 
  Person, 
  Phone, 
  Home,
  CheckCircle,
  Cancel,
  Star,
  Share,
  Favorite,
  CalendarToday,
  Security,
  Verified
} from '@mui/icons-material';

const ProductDetails = ({ machineId }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [machine, setMachine] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.get(
          `${BASE_URL}/api/machine?machineId=${machineId}`
        );
        setMachine(response.data.machine);
        if (response.data.machine.img && response.data.machine.img.length > 0) {
          setSelectedImage(response.data.machine.img[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [machineId]);

  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" style={{ fontFamily: "'Exo 2', sans-serif" }}>
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
            <CircularProgress size={60} style={{ color: '#2a7f62' }} className="mb-4" />
            <p className="text-xl text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!machine) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" style={{ fontFamily: "'Exo 2', sans-serif" }}>
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
            <p className="text-xl text-gray-600">Product not found</p>
          </div>
        </div>
      </div>
    );
  }

  const {
    name,
    company,
    category,
    description,
    availability,
    rentalPrice,
    ownerId,
    img,
    reviews,
  } = machine;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" style={{ fontFamily: "'Exo 2', sans-serif" }}>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="hover:text-[#2a7f62] cursor-pointer">Home</span>
              <span>/</span>
              <span className="hover:text-[#2a7f62] cursor-pointer">Products</span>
              <span>/</span>
              <span className="hover:text-[#2a7f62] cursor-pointer">{category}</span>
              <span>/</span>
              <span className="text-[#2a7f62] font-medium">{name}</span>
            </div>
          </nav>

          {/* Header Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4 mb-6 lg:mb-0">
                <div className='w-16 h-16 bg-gradient-to-br from-[#2a7f62] to-[#41676a] rounded-2xl flex items-center justify-center shadow-lg'>
                  <span className='text-2xl text-white'>🌱</span>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                    {name}
                  </h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Chip 
                      label={category} 
                      style={{ backgroundColor: '#2a7f62', color: 'white', fontWeight: 'bold' }}
                      icon={<Category style={{ color: 'white' }} />}
                    />
                    <Chip 
                      label={availability ? 'Available Now' : 'Out of Stock'} 
                      color={availability ? 'success' : 'error'}
                      variant="outlined"
                      icon={availability ? <CheckCircle /> : <Cancel />}
                    />
                    <Chip 
                      label="Verified Owner" 
                      color="primary"
                      variant="outlined"
                      icon={<Verified />}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Rating value={4.5} precision={0.5} readOnly size="small" />
                  <span className="text-sm text-gray-600">(24 reviews)</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={toggleFavorite}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      isFavorite 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                    }`}
                  >
                    <Favorite />
                  </button>
                  <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300">
                    <Share />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Gallery Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="relative">
                  {selectedImage ? (
                    <img
                      src={`data:${selectedImage.contentType};base64,${arrayBufferToBase64(selectedImage.data.data)}`}
                      alt={name}
                      className="w-full h-96 lg:h-[500px] object-cover"
                    />
                  ) : (
                    <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📷</div>
                        <p className="text-gray-500 text-lg">No Image Available</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {img.findIndex(image => image === selectedImage) + 1} / {img.length}
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {img.length > 1 && (
                  <div className="p-6">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {img.map((image, index) => (
                        <img
                          key={index}
                          src={`data:${image.contentType};base64,${arrayBufferToBase64(image.data.data)}`}
                          alt={`${name} ${index + 1}`}
                          className={`w-20 h-20 object-cover rounded-xl cursor-pointer transition-all duration-300 ${
                            selectedImage === image 
                              ? 'ring-4 ring-[#2a7f62] scale-105 shadow-lg' 
                              : 'hover:scale-105 hover:shadow-md opacity-70 hover:opacity-100'
                          }`}
                          onClick={() => handleImageClick(image)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#2a7f62] to-[#41676a] rounded-full"></span>
                  Description
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {showFullDescription ? description : `${description.substring(0, 200)}...`}
                  </p>
                  {description.length > 200 && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-[#2a7f62] font-semibold hover:underline mt-2"
                    >
                      {showFullDescription ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#2a7f62] to-[#41676a] rounded-full"></span>
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FeatureItem icon="⚡" text="High Performance Engine" />
                  <FeatureItem icon="🔧" text="Easy Maintenance" />
                  <FeatureItem icon="🛡️" text="Safety Certified" />
                  <FeatureItem icon="🌱" text="Eco-Friendly Operation" />
                  <FeatureItem icon="📱" text="Smart Controls" />
                  <FeatureItem icon="⏰" text="24/7 Support" />
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-[#2a7f62]/10">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-[#2a7f62] mb-2">
                    ${rentalPrice}
                    <span className="text-lg text-gray-600 font-normal">/day</span>
                  </div>
                  <p className="text-gray-600">Competitive pricing with flexible terms</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Minimum rental</span>
                    <span className="font-semibold">1 day</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-semibold text-green-600">Free within 10km</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Insurance</span>
                    <span className="font-semibold">Included</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    <CalendarToday />
                    Book Now
                  </button>
                  <button className="w-full bg-white hover:bg-gray-50 text-[#2a7f62] border-2 border-[#2a7f62] font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                    <Phone />
                    Contact Owner
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#2a7f62] to-[#41676a] rounded-full"></span>
                  Specifications
                </h3>
                <div className="space-y-4">
                  <DetailItem icon={<Category />} label="Category" value={category} />
                  <DetailItem icon={<Business />} label="Brand" value={company} />
                  <DetailItem icon={<Security />} label="Condition" value="Excellent" />
                  <DetailItem icon={<LocationOn />} label="Location" value="Available for pickup" />
                </div>
              </div>

              {/* Owner Information */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#2a7f62] to-[#41676a] rounded-full"></span>
                  Owner Information
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <Avatar 
                    sx={{ width: 60, height: 60, backgroundColor: '#2a7f62' }}
                  >
                    {ownerId.name.charAt(0)}
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-lg">{ownerId.name}</h4>
                    <div className="flex items-center gap-2">
                      <Rating value={4.8} precision={0.1} size="small" readOnly />
                      <span className="text-sm text-gray-600">(4.8)</span>
                    </div>
                    <p className="text-sm text-gray-600">Verified Owner</p>
                  </div>
                </div>
                
                <Divider className="my-4" />
                
                <div className="space-y-3">
                  <DetailItem icon={<Phone />} label="Phone" value={ownerId.mobile} />
                  <DetailItem icon={<Home />} label="Address" value={ownerId.address} />
                  <DetailItem icon={<LocationOn />} label="City" value={ownerId.city} />
                  {ownerId.state && (
                    <DetailItem icon={<LocationOn />} label="State" value={ownerId.state} />
                  )}
                </div>
              </div>

              {/* Safety & Trust */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Safety & Trust</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" />
                    <span className="text-sm">Identity Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" />
                    <span className="text-sm">Equipment Inspected</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" />
                    <span className="text-sm">Insurance Covered</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" />
                    <span className="text-sm">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const DetailItem = ({ icon, label, value, valueClass = "" }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center gap-3">
      <div className="text-[#2a7f62]">{icon}</div>
      <span className="font-medium text-gray-700">{label}</span>
    </div>
    <span className={`font-semibold text-right ${valueClass || 'text-gray-800'}`}>
      {value}
    </span>
  </div>
);

const FeatureItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
    <span className="text-2xl">{icon}</span>
    <span className="font-medium text-gray-700">{text}</span>
  </div>
);

export default ProductDetails;