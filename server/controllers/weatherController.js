const weatherAPI = require('../services/weatherAPI');

/**
 * Get current weather
 */
exports.getCurrentWeather = async (req, res) => {
  try {
    const { lat, lon, city, q } = req.query;
    const location = q || city || `${lat},${lon}`;
    
    const data = await weatherAPI.getCurrentWeather(location);
    
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error fetching current weather:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.message || 'Failed to fetch current weather'
    });
  }
};

/**
 * Get forecast data
 */
exports.getForecast = async (req, res) => {
  try {
    const { lat, lon, city, q, days = 10 } = req.query;
    const location = q || city || `${lat},${lon}`;
    
    const data = await weatherAPI.getForecast(location, days);
    
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error fetching forecast:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.message || 'Failed to fetch forecast'
    });
  }
};

/**
 * Get astronomy data
 */
exports.getAstronomy = async (req, res) => {
  try {
    const { lat, lon, city, q, date } = req.query;
    const location = q || city || `${lat},${lon}`;
    
    const data = await weatherAPI.getAstronomy(location, date);
    
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error fetching astronomy:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.message || 'Failed to fetch astronomy data'
    });
  }
};

/**
 * Get complete weather data (current + forecast + astronomy)
 */
exports.getCompleteWeatherData = async (req, res) => {
  try {
    const { lat, lon, city, q, days = 10 } = req.query;
    const location = q || city || `${lat},${lon}`;
    
    const data = await weatherAPI.getCompleteWeatherData(location, days);
    
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error fetching complete weather data:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.message || 'Failed to fetch weather data'
    });
  }
};

/**
 * Search locations (autocomplete)
 */
exports.searchLocations = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters'
      });
    }
    
    const data = await weatherAPI.searchLocations(q);
    
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error searching locations:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.message || 'Failed to search locations'
    });
  }
};
