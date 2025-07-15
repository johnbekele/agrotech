import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "@mui/material/Pagination";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import TextField from '@mui/material/TextField';
import { toast, Toaster } from 'react-hot-toast';
import { Search, FilterList, LocationOn, Category, Clear } from '@mui/icons-material';
import { CircularProgress, Chip, Box, Container } from '@mui/material';

const Products = () => {
  const sortArray = ["Top Rated", "Low Rated", "Price: Low to High", "Price: High to Low", "Newest First"];
  const [machines, setMachines] = useState([]);
  const [machinesByCategory, setMachinesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [displayedCategories, setDisplayedCategories] = useState(4);
  const [allCategoriesLoaded, setAllCategoriesLoaded] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const handleLoadMoreCategories = () => {
    setDisplayedCategories(displayedCategories + 4);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLocationQueryChange = (e) => {
    setLocationQuery(e.target.value);
  };

  const handleSearch = () => {
    const selectedCategory = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);
    setSelectedCategory(selectedCategory);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedCategory(null);
    setSortBy("");
  };

  const filteredMachines = (machines) => {
    return machines.filter(machine => {
      const matchesLocation = !locationQuery || 
        machine.location?.toLowerCase().includes(locationQuery.toLowerCase());
      return matchesLocation;
    });
  };

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get(`${BASE_URL}/api/machine/all`);
        const machinesData = response.data;

        const sortedMachines = machinesData.reduce((acc, machine) => {
          if (!acc[machine.category]) {
            acc[machine.category] = [];
          }
          acc[machine.category].push(machine);
          return acc;
        }, {});

        setMachinesByCategory(sortedMachines);
        setMachines(machinesData);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching machines:', error.message);
        toast.error("Error fetching machines");
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CircularProgress size={60} className="text-green-600 mb-4" />
          <p className="text-xl text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mb-24">
        <Navbar />
      </div>

      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <Container maxWidth="lg">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find Your Perfect Machine
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Discover quality equipment for all your needs
            </p>
          </div>
        </Container>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-lg -mt-8 mx-4 md:mx-8 lg:mx-16 rounded-2xl p-6 md:p-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {/* Location Search */}
          <div className="relative">
            <TextField
              fullWidth
              label="Search Location"
              variant="outlined"
              placeholder="Enter location"
              value={locationQuery}
              onChange={handleLocationQueryChange}
              InputProps={{
                startAdornment: <LocationOn className="text-gray-400 mr-2" />,
              }}
              className="bg-gray-50 rounded-lg"
            />
          </div>

          {/* Product Search */}
          <div className="relative">
            <TextField
              fullWidth
              label="Search Product"
              variant="outlined"
              placeholder="Search by category"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              InputProps={{
                startAdornment: <Category className="text-gray-400 mr-2" />,
              }}
              className="bg-gray-50 rounded-lg"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-4 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            >
              <option value="">Sort by</option>
              {sortArray.map((item) => (
                <option key={item} value={item} className="py-2">
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSearch}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
            <button
              onClick={clearFilters}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-lg transition-colors duration-200"
            >
              <Clear className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory || locationQuery || sortBy) && (
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Active filters:</span>
            {selectedCategory && (
              <Chip
                label={`Category: ${selectedCategory}`}
                onDelete={() => setSelectedCategory(null)}
                color="primary"
                variant="outlined"
              />
            )}
            {locationQuery && (
              <Chip
                label={`Location: ${locationQuery}`}
                onDelete={() => setLocationQuery("")}
                color="primary"
                variant="outlined"
              />
            )}
            {sortBy && (
              <Chip
                label={`Sort: ${sortBy}`}
                onDelete={() => setSortBy("")}
                color="primary"
                variant="outlined"
              />
            )}
          </div>
        )}
      </div>

      {/* Products Section */}
      <Container maxWidth="xl" className="py-12">
        {Object.entries(machinesByCategory).length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          Object.entries(machinesByCategory)
            .slice(0, displayedCategories)
            .map(([category, machines]) => (
              <div key={category} className="mb-16">
                {/* Category Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 bg-white rounded-xl p-6 shadow-sm">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                      {category}
                    </h2>
                    <p className="text-gray-600">
                      {filteredMachines(machines).length} products available
                    </p>
                  </div>
                  
                  <div className="flex gap-3 mt-4 md:mt-0">
                    {selectedCategory === category ? (
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors duration-200"
                      >
                        Show Less
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
                      >
                        View All
                      </button>
                    )}
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredMachines(machines)
                    .filter(machine => !selectedCategory || selectedCategory === category)
                    .map((machine) => (
                      <div key={machine._id} className="transform hover:scale-105 transition-transform duration-200">
                        <ProductCard machine={machine} />
                      </div>
                    ))}
                </div>

                {filteredMachines(machines).length === 0 && (
                  <div className="text-center py-12 bg-gray-100 rounded-xl">
                    <p className="text-gray-500 text-lg">No products match your current filters</p>
                  </div>
                )}
              </div>
            ))
        )}

        {/* Load More Button */}
        {displayedCategories < Object.keys(machinesByCategory).length && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMoreCategories}
              className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-green-500 transition-all duration-200 shadow-sm"
            >
              Load More Categories
            </button>
          </div>
        )}
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Products;