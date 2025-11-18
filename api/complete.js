const axios = require('axios');

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1';

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (!API_KEY) {
      return res.status(500).json({ 
        success: false, 
        message: 'WEATHER_API_KEY not configured. Please set it in Vercel environment variables.' 
      });
    }

    const { lat, lon, city, q, days = 10 } = req.query;
    const location = q || city || (lat && lon ? `${lat},${lon}` : undefined);

    if (!location) {
      return res.status(400).json({ success: false, message: 'Missing location parameter' });
    }

    // Fetch forecast (includes current weather) and astronomy in parallel
    const [forecastResponse, astronomyResponse] = await Promise.all([
      axios.get(`${BASE_URL}/forecast.json`, {
        params: { 
          key: API_KEY, 
          q: location, 
          days: Math.min(days, 10),
          aqi: 'yes',
          alerts: 'yes'
        },
        timeout: 10000
      }),
      axios.get(`${BASE_URL}/astronomy.json`, {
        params: { 
          key: API_KEY, 
          q: location,
          dt: new Date().toISOString().split('T')[0]
        },
        timeout: 10000
      })
    ]);

    const data = {
      location: forecastResponse.data.location,
      current: forecastResponse.data.current,
      forecast: forecastResponse.data.forecast,
      alerts: forecastResponse.data.alerts,
      astronomy: astronomyResponse.data.astronomy
    };

    return res.json({ success: true, data });
  } catch (error) {
    console.error('Complete weather error:', error?.response?.data || error?.message);
    return res.status(500).json({
      success: false,
      message: error?.response?.data?.error?.message || 'Failed to fetch weather data'
    });
  }
};
