# ⚡ Quick Reference

One-page cheat sheet for Smart Weather Dashboard.

## 🚀 Quick Start

```bash
# 1. Clone & Install
git clone <repo-url>
cd smart-weather-dashboard
npm run install-all

# 2. Configure
cp .env.example .env
# Add your WeatherAPI key to .env

# 3. Run
npm run dev

# 4. Open
http://localhost:3000
```

## 📦 NPM Commands

```bash
# Install all dependencies
npm run install-all

# Run both frontend & backend
npm run dev

# Run backend only
npm run server

# Run frontend only
cd client && npm start

# Build for production
cd client && npm run build
```

## 🌐 API Endpoints

| Endpoint | Description | Params |
|----------|-------------|--------|
| `GET /api/health` | Health check | - |
| `GET /api/weather/current` | Current weather | lat, lon, city, or q |
| `GET /api/weather/forecast` | Forecast (1-10 days) | + days |
| `GET /api/weather/astronomy` | Sun/moon data | + date (optional) |
| `GET /api/weather/complete` | All data (optimized) | + days |
| `GET /api/weather/search` | Search locations | q (min 2 chars) |

## 📁 Project Structure

```
├── client/              # React frontend (port 3000)
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.js      # Main app
│   │   └── index.css   # Tailwind styles
│   └── public/
├── server/             # Express backend (port 5000)
│   ├── controllers/    # Request handlers
│   ├── routes/        # API routes
│   ├── services/      # WeatherAPI integration
│   └── server.js      # Server entry
└── .env               # Environment config
```

## 🔑 Environment Variables

### Backend (.env)
```env
WEATHER_API_KEY=your_key_here
WEATHER_API_BASE_URL=https://api.weatherapi.com/v1
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Frontend (client/.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎨 Component Hierarchy

```
App
├── LandingPage
│   ├── Location permission UI
│   └── Search functionality
└── Dashboard
    ├── WeatherHeader (current weather)
    ├── HourlyForecast (24h scroll)
    ├── ForecastTable (10-day forecast)
    └── AnalyticsGrid (detailed metrics)
```

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| API fails | Check .env has WEATHER_API_KEY |
| CORS error | Update CLIENT_URL in .env |
| Build fails | `npm cache clean --force` |
| Port in use | Change PORT in .env |
| Location denied | Use manual search |

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test weather endpoint
curl "http://localhost:5000/api/weather/current?q=London"

# Test search
curl "http://localhost:5000/api/weather/search?q=Paris"
```

## 🚢 Deployment Quick Guide

### Backend (Heroku)
```bash
heroku create your-app
heroku config:set WEATHER_API_KEY=your_key
git push heroku main
```

### Frontend (Vercel)
1. Push to GitHub
2. Import in Vercel
3. Set `REACT_APP_API_URL`
4. Deploy

## 🎯 Features Checklist

- [x] Geolocation (HTML5)
- [x] Location search
- [x] Current weather
- [x] 24-hour forecast
- [x] 10-day forecast
- [x] UV index
- [x] Sunrise/sunset
- [x] Wind data
- [x] Humidity & dew point
- [x] Precipitation
- [x] Pressure
- [x] Moon phase
- [x] Responsive design
- [x] Dark theme

## 📱 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+C` | Stop server |
| `Ctrl+Shift+R` | Hard refresh |
| `F12` | Open DevTools |

## 🔗 Important URLs

- **Frontend Dev**: http://localhost:3000
- **Backend Dev**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health
- **WeatherAPI Docs**: https://www.weatherapi.com/docs/
- **Get API Key**: https://www.weatherapi.com/signup.aspx

## 📊 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TailwindCSS |
| Backend | Node.js, Express |
| API | WeatherAPI.com |
| Deployment | Vercel, Heroku |

## 💡 Pro Tips

1. **Use complete endpoint** instead of multiple calls
2. **Cache responses** in localStorage for offline support
3. **Debounce search** to reduce API calls
4. **Test on mobile** using your local IP
5. **Check API limits** in WeatherAPI dashboard

## 🆘 Getting Help

1. Check **TROUBLESHOOTING.md**
2. Review **SETUP_GUIDE.md**
3. Read **API_DOCUMENTATION.md**
4. Open GitHub issue
5. Check existing issues

## 📚 Full Documentation

- [README.md](README.md) - Main documentation
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Step-by-step setup
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guide
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues

---

**Quick Links:**
[Setup](SETUP_GUIDE.md) | [API Docs](API_DOCUMENTATION.md) | [Deploy](DEPLOYMENT.md) | [Troubleshoot](TROUBLESHOOTING.md)
