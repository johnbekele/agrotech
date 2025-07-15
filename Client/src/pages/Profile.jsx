import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Button } from '@mui/material'

const Profile = () => {
    const [selectedView, setSelectedView] = useState('myTools');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const user = {
        image: "../src/assets/avatar.jpg",
        username: "Username",
        name: "John Farmer",
        mobile: "+91 9876543210",
        email: "john.farmer@example.com",
        location: "Punjab, India",
        joinDate: "January 2023",
        rating: 4.5,
        tools: ["Tractor", "Harvester", "Cultivator", "Fertilizer Spreader"],
    }

    const [editedUser, setEditedUser] = useState({ ...user });
    const [editedTools, setEditedTools] = useState(user.tools.join(', '));

    const machine = {
        machines: [
            { id: 1, name: "Tractor", image: "https://imgs.search.brave.com/Gd7pNbjmF4XCgWvPzPiyZcn-50GJGztkTpI8vS0Zchg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/Njg2ODA4NzA0OTEt/NTkwY2Q0ZTIyNGFi/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRaOGZI/UnlZV04wYjNKOFpX/NThNSHg4TUh4OGZE/QT0.jpeg", bookingStatus: true, price: "₹500/day", status: "Available" },
            { id: 2, name: "Harvester", image: "https://imgs.search.brave.com/-Vqrf_HG3rAGmRsP7fb2tqrwdRiy2M1igj9uzQcvfGA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWM5LmRlcG9zaXRw/aG90b3MuY29tLzE0/MjYwNDkvMTE5My9p/LzQ1MC9kZXBvc2l0/cGhvdG9zXzExOTM1/ODEzLXN0b2NrLXBo/b3RvLWNvbWJpbmUt/aGFydmVzdGVyLmpw/Zw", bookingStatus: false, price: "₹1200/day", status: "Rented" },
            { id: 3, name: "Cultivator", image: "https://imgs.search.brave.com/s0CsyPum7GHJh-GdMDaohLQbzLizAGSit_Z7DdstmNk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by90/cmFjdG9yLWN1bHRp/dmF0aW5nLWZpZWxk/XzM0Mjc0NC01NjYu/anBnP3NpemU9NjI2/JmV4dD1qcGc", bookingStatus: true, price: "₹300/day", status: "Available" },
            { id: 4, name: "Fertilizer Spreader", image: "https://imgs.search.brave.com/Gd7pNbjmF4XCgWvPzPiyZcn-50GJGztkTpI8vS0Zchg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/Njg2ODA4NzA0OTEt/NTkwY2Q0ZTIyNGFi/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRaOGZI/UnlZV04wYjNKOFpX/NThNSHg4TUh4OGZE/QT0.jpeg", bookingStatus: false, price: "₹200/day", status: "Maintenance" },
        ]
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            axios.get(`${BASE_URL}/api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setUsername(response.data.user.name);
            }).catch((error) => {
                console.error("Error fetching user data:", error);
            });
        }
    }, []);

    const handleEditProfile = () => {
        setEditMode(!editMode);
    };

    const handleSaveProfile = () => {
        console.log("Edited User:", editedUser);
        toast.success('Profile updated successfully!');
        setEditMode(false);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="text-yellow-400">★</span>);
        }
        if (hasHalfStar) {
            stars.push(<span key="half" className="text-yellow-400">☆</span>);
        }
        return stars;
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
            <Navbar />
            <Toaster position="top-center" reverseOrder={false} />
            
            <div className='pt-24 pb-8'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-col lg:flex-row gap-8'>
                        
                        {/* Profile Section */}
                        <div className='lg:w-1/4'>
                            <div className='bg-white rounded-3xl shadow-xl p-8 sticky top-24'>
                                {/* Profile Image */}
                                <div className='text-center mb-6'>
                                    <div className='relative inline-block'>
                                        <img 
                                            src={user.image} 
                                            alt="Profile" 
                                            className='w-32 h-32 rounded-full object-cover border-4 border-[#2a7f62] shadow-lg mx-auto'
                                        />
                                        <div className='absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-2 border-white'></div>
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className='space-y-4'>
                                    {editMode ? (
                                        <TextField
                                            value={editedUser.name}
                                            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                            label="Name"
                                            variant='outlined'
                                            fullWidth
                                            size="small"
                                        />
                                    ) : (
                                        <h1 className='text-2xl font-bold text-gray-800 text-center'>{user.name}</h1>
                                    )}

                                    {/* Stats */}
                                    <div className='grid grid-cols-2 gap-4 py-4'>
                                        <div className='text-center p-3 bg-gradient-to-br from-[#2a7f62] to-[#41676a] rounded-2xl text-white'>
                                            <div className='text-2xl font-bold'>{user.tools.length}</div>
                                            <div className='text-sm'>Tools</div>
                                        </div>
                                        <div className='text-center p-3 bg-gradient-to-br from-[#2a7f62] to-[#41676a] rounded-2xl text-white'>
                                            <div className='text-2xl font-bold'>{user.rating}</div>
                                            <div className='text-sm'>Rating</div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className='space-y-3'>
                                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
                                            <span className='text-xl'>📱</span>
                                            {editMode ? (
                                                <TextField
                                                    value={editedUser.mobile}
                                                    onChange={(e) => setEditedUser({ ...editedUser, mobile: e.target.value })}
                                                    label="Mobile"
                                                    variant='standard'
                                                    size="small"
                                                />
                                            ) : (
                                                <span className='text-gray-600'>{user.mobile}</span>
                                            )}
                                        </div>
                                        
                                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
                                            <span className='text-xl'>📧</span>
                                            <span className='text-gray-600'>{user.email}</span>
                                        </div>
                                        
                                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
                                            <span className='text-xl'>📍</span>
                                            <span className='text-gray-600'>{user.location}</span>
                                        </div>
                                        
                                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
                                            <span className='text-xl'>📅</span>
                                            <span className='text-gray-600'>Joined {user.joinDate}</span>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className='text-center p-3 bg-gray-50 rounded-xl'>
                                        <div className='flex justify-center gap-1 mb-2'>
                                            {renderStars(user.rating)}
                                        </div>
                                        <span className='text-gray-600 text-sm'>User Rating</span>
                                    </div>

                                    {/* Tools Tags */}
                                    <div className='space-y-2'>
                                        <h3 className='font-semibold text-gray-800'>My Equipment:</h3>
                                        {editMode ? (
                                            <TextField
                                                value={editedTools}
                                                onChange={(e) => setEditedTools(e.target.value)}
                                                label="Tools (comma separated)"
                                                variant='outlined'
                                                multiline
                                                rows={3}
                                                size="small"
                                                fullWidth
                                            />
                                        ) : (
                                            <div className='flex flex-wrap gap-2'>
                                                {user.tools.map((tool, index) => (
                                                    <span key={index} className='px-3 py-1 bg-[#b2d8b4] text-[#2a7f62] rounded-full text-sm font-medium'>
                                                        {tool}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Edit Button */}
                                    <div className='pt-4'>
                                        {editMode ? (
                                            <div className='flex gap-2'>
                                                <button
                                                    onClick={handleSaveProfile}
                                                    className="flex-1 bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditMode(false)}
                                                    className="flex-1 border-2 border-gray-300 text-gray-600 hover:border-gray-400 font-bold py-3 px-4 rounded-xl transition-all duration-300"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={handleEditProfile}
                                                className="w-full bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105"
                                            >
                                                Edit Profile
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tools Section */}
                        <div className='lg:w-3/4'>
                            <div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
                                {/* Header */}
                                <div className='bg-gradient-to-r from-[#2a7f62] to-[#41676a] p-6'>
                                    <h2 className='text-3xl font-bold text-white mb-4'>Equipment Dashboard</h2>
                                    <div className="flex gap-4">
                                        <button 
                                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                                selectedView === 'myTools' 
                                                    ? 'bg-white text-[#2a7f62] shadow-lg' 
                                                    : 'text-white hover:bg-white/20'
                                            }`}
                                            onClick={() => setSelectedView('myTools')}
                                        >
                                            My Equipment ({machine.machines.length})
                                        </button>
                                        <button 
                                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                                selectedView === 'onRentTools' 
                                                    ? 'bg-white text-[#2a7f62] shadow-lg' 
                                                    : 'text-white hover:bg-white/20'
                                            }`}
                                            onClick={() => setSelectedView('onRentTools')}
                                        >
                                            Currently Rented ({machine.machines.filter(m => m.bookingStatus).length})
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className='p-6'>
                                    {selectedView === 'myTools' ? (
                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                            {machine.machines.map(machine => (
                                                <div key={machine.id} className="bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                                                    <div className='relative'>
                                                        <img 
                                                            src={machine.image} 
                                                            alt={machine.name} 
                                                            className="w-full h-48 object-cover"
                                                        />
                                                        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                                                            machine.status === 'Available' ? 'bg-green-500 text-white' :
                                                            machine.status === 'Rented' ? 'bg-red-500 text-white' :
                                                            'bg-yellow-500 text-white'
                                                        }`}>
                                                            {machine.status}
                                                        </div>
                                                    </div>
                                                    <div className='p-4'>
                                                        <h3 className="text-xl font-bold text-[#2a7f62] mb-2">{machine.name}</h3>
                                                        <p className="text-lg font-semibold text-gray-700 mb-3">{machine.price}</p>
                                                        <div className='flex gap-2'>
                                                            <button className="flex-1 bg-[#2a7f62] hover:bg-[#2f6b57] text-white font-bold py-2 px-4 rounded-xl transition-all duration-300">
                                                                View Details
                                                            </button>
                                                            <button className="flex-1 border-2 border-[#2a7f62] text-[#2a7f62] hover:bg-[#2a7f62] hover:text-white font-bold py-2 px-4 rounded-xl transition-all duration-300">
                                                                Edit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                            {machine.machines.filter(machine => machine.bookingStatus).map(machine => (
                                                <div key={machine.id} className="bg-gradient-to-br from-[#f7f7f8] to-[#e8f5e8] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                                                    <div className='relative'>
                                                        <img 
                                                            src={machine.image} 
                                                            alt={machine.name} 
                                                            className="w-full h-48 object-cover"
                                                        />
                                                        <div className="absolute top-3 right-3 px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">
                                                            On Rent
                                                        </div>
                                                    </div>
                                                    <div className='p-4'>
                                                        <h3 className="text-xl font-bold text-[#2a7f62] mb-2">{machine.name}</h3>
                                                        <p className="text-lg font-semibold text-gray-700 mb-2">{machine.price}</p>
                                                        <p className="text-sm text-gray-600 mb-3">Rented until: Dec 25, 2024</p>
                                                        <div className='flex gap-2'>
                                                            <button className="flex-1 bg-[#2a7f62] hover:bg-[#2f6b57] text-white font-bold py-2 px-4 rounded-xl transition-all duration-300">
                                                                Contact Renter
                                                            </button>
                                                            <button className="flex-1 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded-xl transition-all duration-300">
                                                                End Rental
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {/* Empty State */}
                                    {((selectedView === 'myTools' && machine.machines.length === 0) || 
                                      (selectedView === 'onRentTools' && machine.machines.filter(m => m.bookingStatus).length === 0)) && (
                                        <div className='text-center py-16'>
                                            <div className='text-6xl mb-4'>📦</div>
                                            <h3 className='text-2xl font-bold text-gray-600 mb-2'>
                                                {selectedView === 'myTools' ? 'No Equipment Found' : 'No Rented Equipment'}
                                            </h3>
                                            <p className='text-gray-500 mb-6'>
                                                {selectedView === 'myTools' 
                                                    ? 'Start by adding your first piece of equipment' 
                                                    : 'You currently have no equipment on rent'
                                                }
                                            </p>
                                            {selectedView === 'myTools' && (
                                                <button className="bg-gradient-to-r from-[#2a7f62] to-[#41676a] hover:from-[#2f6b57] hover:to-[#4a737a] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300">
                                                    Add Equipment
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}

export default Profile;