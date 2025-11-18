/**
 * Validate location parameters
 */
exports.validateLocation = (req, res, next) => {
  const { lat, lon, city, q } = req.query;
  
  // Check if at least one location parameter is provided
  if (!lat && !lon && !city && !q) {
    return res.status(400).json({
      success: false,
      message: 'Location is required. Provide lat & lon, city, or q parameter'
    });
  }
  
  // If lat/lon provided, validate they are numbers
  if ((lat || lon) && (!lat || !lon)) {
    return res.status(400).json({
      success: false,
      message: 'Both lat and lon are required when using coordinates'
    });
  }
  
  if (lat && (isNaN(lat) || lat < -90 || lat > 90)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid latitude. Must be between -90 and 90'
    });
  }
  
  if (lon && (isNaN(lon) || lon < -180 || lon > 180)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid longitude. Must be between -180 and 180'
    });
  }
  
  next();
};
