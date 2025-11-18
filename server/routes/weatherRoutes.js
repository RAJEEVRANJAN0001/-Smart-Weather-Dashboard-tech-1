const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { validateLocation } = require('../middleware/inputValidator');

// Get current weather by coordinates or city
router.get('/current', validateLocation, weatherController.getCurrentWeather);

// Get forecast
router.get('/forecast', validateLocation, weatherController.getForecast);

// Get astronomy data
router.get('/astronomy', validateLocation, weatherController.getAstronomy);

// Get complete weather data (current + forecast + astronomy)
router.get('/complete', validateLocation, weatherController.getCompleteWeatherData);

// Search locations (autocomplete)
router.get('/search', weatherController.searchLocations);

module.exports = router;
