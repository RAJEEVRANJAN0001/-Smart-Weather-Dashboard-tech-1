const axios = require('axios');

// Get API key - check both possible env var names
const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1';

if (!API_KEY) {
  console.error('⚠️  WEATHER_API_KEY is not set in environment variables');
  console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('WEATHER')));
}

/**
 * Create axios instance with base configuration
 */
const getWeatherClient = () => {
  if (!API_KEY) {
    throw new Error('WEATHER_API_KEY environment variable is not set. Please configure it in Vercel project settings.');
  }
  
  return axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    params: {
      key: API_KEY
    }
  });
};

/**
 * Get current weather data
 */
exports.getCurrentWeather = async (location) => {
  try {
    const weatherClient = getWeatherClient();
    const response = await weatherClient.get('/current.json', {
      params: {
        q: location,
        aqi: 'yes' // Include air quality data
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to fetch current weather');
  }
};

/**
 * Get forecast data
 */
exports.getForecast = async (location, days = 10) => {
  try {
    const weatherClient = getWeatherClient();
    const response = await weatherClient.get('/forecast.json', {
      params: {
        q: location,
        days: Math.min(days, 10), // API supports up to 10 days
        aqi: 'yes',
        alerts: 'yes'
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to fetch forecast');
  }
};

/**
 * Get astronomy data
 */
exports.getAstronomy = async (location, date) => {
  try {
    const weatherClient = getWeatherClient();
    const response = await weatherClient.get('/astronomy.json', {
      params: {
        q: location,
        dt: date || new Date().toISOString().split('T')[0]
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to fetch astronomy data');
  }
};

/**
 * Get complete weather data (optimized single call)
 */
exports.getCompleteWeatherData = async (location, days = 10) => {
  try {
    const weatherClient = getWeatherClient();
    // Use forecast endpoint which includes current weather
    const [forecast, astronomy] = await Promise.all([
      weatherClient.get('/forecast.json', {
        params: {
          q: location,
          days: Math.min(days, 10),
          aqi: 'yes',
          alerts: 'yes'
        }
      }),
      weatherClient.get('/astronomy.json', {
        params: {
          q: location,
          dt: new Date().toISOString().split('T')[0]
        }
      })
    ]);
    
    return {
      location: forecast.data.location,
      current: forecast.data.current,
      forecast: forecast.data.forecast,
      alerts: forecast.data.alerts,
      astronomy: astronomy.data.astronomy
    };
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to fetch complete weather data');
  }
};

/**
 * Search locations (autocomplete)
 */
exports.searchLocations = async (query) => {
  try {
    const weatherClient = getWeatherClient();
    const response = await weatherClient.get('/search.json', {
      params: {
        q: query
      }
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || 'Failed to search locations');
  }
};
