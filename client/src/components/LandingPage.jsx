import React, { useState } from 'react';
import axios from 'axios';

// Use relative path for API calls (works in both dev and production)
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

function LandingPage({ onLocationSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Get user's current location
  const handleUseMyLocation = () => {
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationSelect({
          lat: latitude,
          lon: longitude,
          name: 'Current Location'
        });
      },
      (error) => {
        setError('Unable to retrieve your location. Please enter manually.');
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Search for locations
  const handleSearch = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(''); // Clear any previous errors
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { q: query }
      });
      
      if (response.data.success) {
        setSearchResults(response.data.data);
        setError(''); // Clear error on success
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search locations');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  // Select a location from search results
  const handleLocationClick = (location) => {
    onLocationSelect({
      lat: location.lat,
      lon: location.lon,
      name: `${location.name}, ${location.country}`
    });
    setSearchResults([]);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated star background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="max-w-2xl w-full glass-card p-8 md:p-12 relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Smart Weather Dashboard
          </h1>
          <p className="text-slate-300 text-lg">
            Get accurate, real-time weather data for any location
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200">
            {error}
          </div>
        )}

        {/* Use current location button */}
        <button
          onClick={handleUseMyLocation}
          className="w-full btn-primary mb-6 flex items-center justify-center gap-3"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Use My Current Location
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-slate-600/50" />
          <span className="text-slate-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-slate-600/50" />
        </div>

        {/* Search input */}
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search city, town, or zip code..."
              className="input-field pr-12"
            />
            <svg 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Search results dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute w-full mt-2 glass-card-light max-h-60 overflow-y-auto z-20">
              {searchResults.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationClick(location)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-600/30 transition-colors border-b border-slate-600/30 last:border-b-0"
                >
                  <div className="font-semibold">{location.name}</div>
                  <div className="text-sm text-slate-400">
                    {location.region && `${location.region}, `}{location.country}
                  </div>
                </button>
              ))}
            </div>
          )}

          {isSearching && (
            <div className="absolute w-full mt-2 glass-card-light p-4 text-center text-slate-400">
              Searching...
            </div>
          )}
        </div>

        {/* Info section */}
        <div className="mt-8 pt-6 border-t border-slate-600/30">
          <h3 className="font-semibold mb-3 text-slate-300">Why we need your location:</h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Provide accurate, localized weather data
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Show real-time conditions and forecasts
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Your location is never stored without consent
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
