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

    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Query must be at least 2 characters'
      });
    }

    const response = await axios.get(`${BASE_URL}/search.json`, {
      params: { key: API_KEY, q: q },
      timeout: 10000
    });

    return res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Search error:', error?.response?.data || error?.message);
    return res.status(500).json({
      success: false,
      message: error?.response?.data?.error?.message || 'Failed to search locations'
    });
  }
};
