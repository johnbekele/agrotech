import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    console.log("calling navbar useEffect!");
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      axios
        .get(`${BASE_URL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("user name", response.data.user.name);
          setUsername(response.data.user.name);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername('');
    navigate("/login");
  };

  return (
    <>
      {username ? (
        <nav className="navbar p-4 px-8 w-full h-20 flex items-center bg-white/90 backdrop-blur-md fixed top-0 z-50 shadow-lg border-b border-gray-200" style={{ fontFamily: "'Exo 2', sans-serif" }}>
          <div className="flex align-center items-center justify-start gap-3 w-1/3">
            <Link to="/products" className="flex items-center gap-3">
              <div className='w-12 h-12 bg-gradient-to-br from-[#2a7f62] to-[#41676a] rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-105'>
                <span className='text-xl text-white'>🌱</span>
              </div>
              <h2 className="text-3xl text-gray-800 font-bold bg-gradient-to-r from-[#2a7f62] to-[#41676a] bg-clip-text text-transparent">
                AgroTech
              </h2>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center gap-6 w-1/3">
            <Link to="/products" className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-4 py-2 rounded-lg font-medium">
              Products
            </Link>
            <Link to="/add_tools" className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-4 py-2 rounded-lg font-medium">
              Add Tools
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-4 py-2 rounded-lg font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-4 py-2 rounded-lg font-medium">
              Contact
            </Link>
          </div>

          <div className="flex items-center justify-end w-1/3 gap-4">
            {/* Profile Section */}
            <div 
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <div className="relative">
                <img
                  src="../src/assets/avatar.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#2a7f62] shadow-md"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-gray-800 font-medium hidden lg:block">{username}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <i className="ri-logout-box-r-line"></i>
              <span className="hidden sm:block">Logout</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl text-gray-700`}></i>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 md:hidden">
              <div className="flex flex-col p-4 space-y-2">
                <Link to="/products" className="text-gray-700 hover:text-[#2a7f62] hover:bg-gray-100 px-4 py-3 rounded-lg transition-colors font-medium">
                  Products
                </Link>
                <Link to="/add_tools" className="text-gray-700 hover:text-[#2a7f62] hover:bg-gray-100 px-4 py-3 rounded-lg transition-colors font-medium">
                  Add Tools
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-[#2a7f62] hover:bg-gray-100 px-4 py-3 rounded-lg transition-colors font-medium">
                  About
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-[#2a7f62] hover:bg-gray-100 px-4 py-3 rounded-lg transition-colors font-medium">
                  Contact
                </Link>
              </div>
            </div>
          )}
        </nav>
      ) : (
        <nav className="navbar p-4 px-8 w-full h-20 flex items-center bg-white/90 backdrop-blur-md fixed top-0 z-50 shadow-lg border-b border-gray-200" style={{ fontFamily: "'Exo 2', sans-serif" }}>
          <div className="flex align-center items-center justify-start gap-3 w-1/3">
            <Link to="/" className="flex items-center gap-3">
              <div className='w-12 h-12 bg-gradient-to-br from-[#2a7f62] to-[#41676a] rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-105'>
                <span className='text-xl text-white'>🌱</span>
              </div>
              <h2 className="text-3xl text-gray-800 font-bold bg-gradient-to-r from-[#2a7f62] to-[#41676a] bg-clip-text text-transparent">
                AgroTech
              </h2>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center gap-6 w-1/3">
            <Link to="/contact" className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-4 py-2 rounded-lg font-medium">
              Contact Us
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#2a7f62] transition-all duration-300 hover:bg-[#b2d8b4]/20 px-4 py-2 rounded-lg font-medium">
              About Us
            </Link>
          </div>

          <div className="flex items-center justify-end w-1/3">
            <Link to="/login">
              <button className="bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                Login
              </button>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;