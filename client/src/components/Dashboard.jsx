import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherSidebar from './WeatherSidebar';
import ForecastTable from './ForecastTable';
import AirQualityCard from './AirQualityCard';
import WindCard from './WindCard';
import UVIndexCard from './UVIndexCard';
import SunriseSunsetCard from './SunriseSunsetCard';
import FeelsLikeCard from './FeelsLikeCard';
import PrecipitationSimpleCard from './PrecipitationSimpleCard';
import MoonPhaseCard from './MoonPhaseCard';
import HumidityCard from './HumidityCard';
import VisibilityCard from './VisibilityCard';
import PressureCard from './PressureCard';
import AveragesCard from './AveragesCard';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

// Use relative path for API calls (works in both dev and production)
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

function Dashboard({ location, onBack }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    if (location) {
      fetchWeatherData();
      // Initialize with the current location
      setSelectedCity({
        name: location.name,
        time: '19:13',
        temp: '--',
        condition: 'Loading...',
        high: '--',
        low: '--'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (weatherData) {
      updateCityInList(weatherData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData]);

  const fetchWeatherData = async (loc = location) => {
    if (!loc) {
      setError('No location provided');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const params = loc.lat && loc.lon 
        ? { lat: loc.lat, lon: loc.lon, days: 10 }
        : { q: loc.name, days: 10 };

      console.log('Fetching weather with params:', params);
      const response = await axios.get(`${API_BASE_URL}/complete`, { 
        params,
        timeout: 15000 // 15 second timeout
      });
      
      console.log('Weather response:', response.data);
      
      if (response.data.success) {
        setWeatherData(response.data.data);
        setError(''); // Clear any previous errors
      } else {
        setError(response.data.message || 'Failed to fetch weather data');
      }
    } catch (err) {
      console.error('Error fetching weather:', err);
      const errorMessage = err.response?.data?.message 
        || err.message 
        || 'Failed to fetch weather data. Please try again.';
      setError(errorMessage);
      setWeatherData(null); // Clear data on error
    } finally {
      setLoading(false);
    }
  };

  const updateCityInList = (data) => {
    const cityData = {
      name: data.location.name,
      time: new Date(data.location.localtime).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      temp: Math.round(data.current.temp_c),
      condition: data.current.condition.text,
      high: Math.round(data.forecast.forecastday[0].day.maxtemp_c),
      low: Math.round(data.forecast.forecastday[0].day.mintemp_c)
    };

    setCities(prev => {
      const existing = prev.find(c => c.name === cityData.name);
      if (existing) {
        return prev.map(c => c.name === cityData.name ? cityData : c);
      }
      return [cityData, ...prev];
    });
    
    setSelectedCity(cityData);
  };

  const handleCitySearch = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { q: query }
      });
      
      if (response.data.success && response.data.data.length > 0) {
        const searchResult = response.data.data[0];
        const newLocation = {
          name: `${searchResult.name}, ${searchResult.country}`,
          lat: searchResult.lat,
          lon: searchResult.lon
        };
        fetchWeatherData(newLocation);
      }
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleCitySelect = (city) => {
    const cityLocation = {
      name: city.name,
      lat: null,
      lon: null
    };
    fetchWeatherData(cityLocation);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage message={error} onRetry={fetchWeatherData} onBack={onBack} />
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage 
          message="No weather data available. Please try again." 
          onRetry={() => fetchWeatherData()} 
          onBack={onBack} 
        />
      </div>
    );
  }

  // Validate weather data structure
  if (!weatherData.location || !weatherData.current || !weatherData.forecast || !weatherData.astronomy) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage 
          message="Invalid weather data received. Please try again." 
          onRetry={() => fetchWeatherData()} 
          onBack={onBack} 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block">
        <WeatherSidebar 
          cities={cities}
          selectedCity={selectedCity}
          onCitySelect={handleCitySelect}
          onSearch={handleCitySearch}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Background stars */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.4 + 0.2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-4 sm:p-6 lg:p-8">
          {/* Header with city name and temperature */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white">
                {weatherData.location.name}
              </h1>
              <button 
                onClick={onBack}
                className="lg:hidden px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
              >
                Change Location
              </button>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
              <span className="text-lg sm:text-xl">{Math.round(weatherData.current.temp_c)}°</span>
              <span>|</span>
              <span>{weatherData.current.condition.text}</span>
            </div>
          </div>

          {/* Main responsive grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 max-w-[1800px] mx-auto">
            {/* Left Column: 10-Day Forecast + Moon Phase */}
            <div className="lg:col-span-1 space-y-3 sm:space-y-4">
              <ForecastTable 
                forecastDays={weatherData.forecast.forecastday}
              />
              
              <MoonPhaseCard 
                phase={weatherData.astronomy.astro.moon_phase}
                moonrise={weatherData.astronomy.astro.moonrise}
                illumination={weatherData.astronomy.astro.moon_illumination}
              />
            </div>

            {/* Right Column: All Cards Grid */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {/* Air Quality */}
              <AirQualityCard 
                aqi={131}
                description={`Air quality index is 131, which is similar to yesterday at about this time.`}
              />

              {/* 2 Column Grid - Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <WindCard 
                  speed={Math.round(weatherData.current.wind_kph)}
                  direction={weatherData.current.wind_degree}
                  gusts={Math.round(weatherData.current.gust_kph)}
                />
                
                <PrecipitationSimpleCard 
                  amount={weatherData.forecast.forecastday[0].day.totalprecip_mm}
                  forecast="None expected in next 10 days."
                />
              </div>

              {/* Responsive Grid for smaller cards - 2 cols on mobile, 4 on desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <UVIndexCard 
                  uvIndex={weatherData.current.uv}
                  uvDescription="Low for the rest of the day."
                />
                <SunriseSunsetCard 
                  sunrise={weatherData.astronomy.astro.sunrise}
                  sunset={weatherData.astronomy.astro.sunset}
                  currentTime={new Date(weatherData.location.localtime).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: false 
                  })}
                />
                <FeelsLikeCard 
                  feelsLike={Math.round(weatherData.current.feelslike_c)}
                  actual={Math.round(weatherData.current.temp_c)}
                  description="Wind is making it feel cooler."
                />
                <HumidityCard 
                  humidity={weatherData.current.humidity}
                  dewPoint={Math.round(weatherData.current.dewpoint_c)}
                />
                <VisibilityCard 
                  visibility={weatherData.current.vis_km}
                  description="Perfectly clear view."
                />
                <PressureCard 
                  pressure={Math.round(weatherData.current.pressure_mb)}
                  trend="steady"
                />
                <AveragesCard 
                  currentHigh={Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)}
                  currentLow={Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)}
                  avgHigh={Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)}
                  avgLow={Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            Weather for {weatherData.location.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
