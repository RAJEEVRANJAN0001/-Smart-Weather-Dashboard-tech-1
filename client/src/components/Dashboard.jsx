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
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <WeatherSidebar 
        cities={cities}
        selectedCity={selectedCity}
        onCitySelect={handleCitySelect}
        onSearch={handleCitySearch}
      />

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

        <div className="relative z-10 p-6">
          {/* Header with city name and temperature */}
          <div className="mb-6">
            <h1 className="text-4xl font-light text-white mb-1">
              {weatherData.location.name}
            </h1>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>{Math.round(weatherData.current.temp_c)}°</span>
              <span>|</span>
              <span>{weatherData.current.condition.text}</span>
            </div>
          </div>

          {/* Main 2-column grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[1800px] mx-auto">
            {/* Left Column: 10-Day Forecast + Moon Phase */}
            <div className="lg:col-span-1 space-y-4">
              <ForecastTable 
                forecastDays={weatherData.forecast.forecastday}
              />
              
              {/* Waning Crescent Card below forecast */}
              <MoonPhaseCard 
                phase={weatherData.astronomy.astro.moon_phase}
                moonrise={weatherData.astronomy.astro.moonrise}
                illumination={weatherData.astronomy.astro.moon_illumination}
              />
            </div>

            {/* Right Column: All Cards Grid */}
            <div className="lg:col-span-2 space-y-4">
              {/* Air Quality */}
              <AirQualityCard 
                aqi={131}
                description={`Air quality index is 131, which is similar to yesterday at about this time.`}
              />

              {/* 2 Column Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Wind Card */}
                <WindCard 
                  speed={Math.round(weatherData.current.wind_kph)}
                  direction={weatherData.current.wind_degree}
                  gusts={Math.round(weatherData.current.gust_kph)}
                />
                
                {/* Precipitation (No Map) */}
                <PrecipitationSimpleCard 
                  amount={weatherData.forecast.forecastday[0].day.totalprecip_mm}
                  forecast="None expected in next 10 days."
                />
              </div>

              {/* 4x2 Grid for smaller cards */}
              <div className="grid grid-cols-4 gap-4">
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
                {/* Empty space for balance */}
                <div></div>
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
