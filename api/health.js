module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ 
    status: 'OK', 
    message: 'Weather API (serverless) is running',
    timestamp: new Date().toISOString()
  });
};
