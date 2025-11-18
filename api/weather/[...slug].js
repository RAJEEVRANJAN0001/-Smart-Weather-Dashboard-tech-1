const weatherAPI = require('../../server/services/weatherAPI');

// Vercel dynamic API: captures paths like /api/weather/current, /api/weather/forecast, etc.
module.exports = async (req, res) => {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    const slug = req.query.slug || [];
    const parts = Array.isArray(slug) ? slug : [slug];
    const endpoint = parts[0] || '';

    const { lat, lon, city, q, days, date } = req.query;
    const location = q || city || (lat && lon ? `${lat},${lon}` : undefined);

    switch (endpoint) {
      case 'current': {
        if (!location) return res.status(400).json({ success: false, message: 'Missing location' });
        const data = await weatherAPI.getCurrentWeather(location);
        return res.json({ success: true, data });
      }

      case 'forecast': {
        if (!location) return res.status(400).json({ success: false, message: 'Missing location' });
        const d = days ? Number(days) : 10;
        const data = await weatherAPI.getForecast(location, d);
        return res.json({ success: true, data });
      }

      case 'astronomy': {
        if (!location) return res.status(400).json({ success: false, message: 'Missing location' });
        const data = await weatherAPI.getAstronomy(location, date);
        return res.json({ success: true, data });
      }

      case 'complete': {
        if (!location) return res.status(400).json({ success: false, message: 'Missing location' });
        const d = days ? Number(days) : 10;
        const data = await weatherAPI.getCompleteWeatherData(location, d);
        return res.json({ success: true, data });
      }

      case 'search': {
        if (!q || q.trim().length < 2) {
          return res.status(400).json({ success: false, message: 'Query must be at least 2 characters' });
        }
        const data = await weatherAPI.searchLocations(q);
        return res.json({ success: true, data });
      }

      case 'health': {
        return res.json({ status: 'OK', message: 'Weather API (serverless) is running' });
      }

      default:
        return res.status(404).json({ success: false, message: 'Not found' });
    }
  } catch (error) {
    console.error('Serverless weather API error:', error?.message || error);
    return res.status(500).json({ success: false, message: error?.message || 'Internal Server Error' });
  }
};
