# 🌤️ Smart Weather Dashboard

A modern, professional weather dashboard that provides accurate, real-time weather data using WeatherAPI.com. Features a beautiful glassmorphism design with detailed forecasts, analytics, and astronomy data.

![Smart Weather Dashboard](screenshots/dashboard.png)

## ✨ Features

- 🎯 **Accurate Location Detection**: HTML5 geolocation with high accuracy
- 🔍 **Smart Search**: Fuzzy search for cities, towns, and zip codes worldwide
- 🌡️ **Current Weather**: Real-time temperature, conditions, feels like, air quality
- ⏰ **Hourly Forecast**: Next 24 hours with temperature and precipitation
- 📅 **10-Day Forecast**: Extended forecast with temperature range visualization
- 📊 **Detailed Analytics**:
  - UV Index with safety levels
  - Sunrise/Sunset times
  - Wind speed, direction, and gusts
  - Precipitation chance and amount
  - Humidity and dew point
  - Visibility and air quality
  - Atmospheric pressure
  - Moon phase and moonrise/moonset
- 🎨 **Beautiful UI**: Dark glassmorphism theme with smooth animations
- 📱 **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- 💾 **Location Memory**: Remembers your last searched location

## 🚀 Tech Stack

### Frontend
- **React 18** with functional components and hooks
- **TailwindCSS** for modern, responsive styling
- **Axios** for API requests
- **date-fns** for date formatting

### Backend
- **Node.js** with Express
- **WeatherAPI.com** for weather data
- **CORS** enabled for cross-origin requests

### Optional
- **MongoDB** for storing location history (not required)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- WeatherAPI.com API key (free tier available)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd smart-weather-dashboard
```

### 2. Get WeatherAPI Key

1. Visit [WeatherAPI.com](https://www.weatherapi.com/)
2. Sign up for a free account
3. Get your API key from the dashboard

### 3. Backend Setup

```bash
# Install backend dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your WeatherAPI key
# WEATHER_API_KEY=your_api_key_here
```

### 4. Frontend Setup

```bash
# Navigate to client folder
cd client

# Install frontend dependencies
npm install

# Create .env file (optional, defaults to localhost:5000)
cp .env.example .env
```

### 5. Run the Application

#### Option 1: Run Both (Recommended)

From the root directory:

```bash
# Install concurrently if not already installed
npm install

# Run both backend and frontend
npm run dev
```

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
npm run server
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# App opens at http://localhost:3000
```

## 🎨 Screenshots

### Landing Page
![Landing Page](screenshots/landing.png)
*Location permission with search functionality*

### Dashboard View
![Dashboard](screenshots/dashboard.png)
*Complete weather overview with hourly forecast*

### Analytics
![Analytics](screenshots/analytics.png)
*Detailed weather metrics and conditions*

## 📁 Project Structure

```
smart-weather-dashboard/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── WeatherHeader.jsx
│   │   │   ├── HourlyForecast.jsx
│   │   │   ├── ForecastTable.jsx
│   │   │   ├── AnalyticsGrid.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── App.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
├── server/                    # Node.js backend
│   ├── controllers/
│   │   └── weatherController.js
│   ├── middleware/
│   │   └── inputValidator.js
│   ├── routes/
│   │   └── weatherRoutes.js
│   ├── services/
│   │   └── weatherAPI.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🌐 API Endpoints

### Weather Routes

- `GET /api/weather/current` - Get current weather
  - Query params: `lat`, `lon`, `city`, or `q`
  
- `GET /api/weather/forecast` - Get forecast data
  - Query params: `lat`, `lon`, `city`, or `q`, `days` (1-10)
  
- `GET /api/weather/astronomy` - Get astronomy data
  - Query params: `lat`, `lon`, `city`, or `q`, `date` (optional)
  
- `GET /api/weather/complete` - Get all weather data
  - Query params: `lat`, `lon`, `city`, or `q`, `days` (1-10)
  
- `GET /api/weather/search` - Search locations
  - Query params: `q` (search query)

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
WEATHER_API_KEY=your_weatherapi_key_here
WEATHER_API_BASE_URL=https://api.weatherapi.com/v1
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

#### Frontend (client/.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎯 Features Implementation

### Geolocation
- Uses HTML5 `navigator.geolocation` API
- High accuracy mode enabled
- Fallback to manual search if denied

### Search Functionality
- Real-time search as you type
- Debounced API calls
- Shows matching cities with country/region

### Weather Display
- Current conditions with weather icons
- Hourly forecast (scrollable)
- 10-day forecast with temperature bars
- Comprehensive analytics cards

### Data Accuracy
- WeatherAPI.com provides highly accurate data
- Updates in real-time
- Global coverage with local forecasts



## 📝 Usage

1. **Grant Location Permission**: Click "Use My Current Location" and allow browser location access
2. **Or Search Manually**: Type a city name in the search box
3. **View Dashboard**: See current weather, hourly forecast, and 10-day forecast
4. **Explore Analytics**: Scroll down to view detailed weather metrics
5. **Change Location**: Click "Change Location" to search for a different place
6. **Refresh Data**: Click the refresh icon to update weather data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Design inspiration from modern weather apps

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using React, Node.js, and WeatherAPI.com**
