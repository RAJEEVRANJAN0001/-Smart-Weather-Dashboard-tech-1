# 🚀 Quick Start Guide

## Step-by-Step Setup (5 minutes)

### 1️⃣ Get Your Weather API Key

1. Go to [https://www.weatherapi.com/signup.aspx](https://www.weatherapi.com/signup.aspx)
2. Sign up with your email (it's FREE!)
3. Verify your email
4. Login and copy your API key from the dashboard

### 2️⃣ Install Dependencies

Open terminal in the project root and run:

```bash
# Install all dependencies (backend + frontend)
npm run install-all
```

This single command installs dependencies for both the server and client.

### 3️⃣ Configure Environment

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Open `.env` and paste your API key:

```env
WEATHER_API_KEY=your_actual_api_key_here
WEATHER_API_BASE_URL=https://api.weatherapi.com/v1
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 4️⃣ Start the Application

```bash
# Run both backend and frontend together
npm run dev
```

That's it! The app will open automatically at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 🎯 First Time Usage

1. **Allow Location Access**: Click "Use My Current Location" when prompted
2. **View Your Weather**: The dashboard will load with your local weather
3. **Explore Features**: 
   - Scroll for hourly forecast
   - Check 10-day forecast
   - View detailed analytics

## 🔧 Troubleshooting

### Port Already in Use

If port 3000 or 5000 is already in use:

**Change Backend Port:**
```env
# In .env file
PORT=5001
```

**Change Frontend Port:**
```bash
# In client/.env file
REACT_APP_API_URL=http://localhost:5001/api
```

### API Key Issues

If you see "Failed to fetch weather data":
1. Check your `.env` file has the correct API key
2. Restart the backend server: `npm run server`
3. Verify your API key at [WeatherAPI Dashboard](https://www.weatherapi.com/my/)

### Location Access Denied

If you deny location access:
1. Use the search box to manually enter your city
2. Type at least 2 characters to see suggestions
3. Click on a location from the dropdown

### Dependencies Installation Failed

If `npm run install-all` fails:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

## 📱 Testing on Mobile

1. Find your computer's local IP:
   ```bash
   # On Mac/Linux
   ifconfig | grep inet
   
   # On Windows
   ipconfig
   ```

2. Update `client/.env`:
   ```env
   REACT_APP_API_URL=http://YOUR_LOCAL_IP:5000/api
   ```

3. Open on mobile: `http://YOUR_LOCAL_IP:3000`

## 🎨 Customization

### Change Theme Colors

Edit `client/tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'dark-blue': '#your-color',  // Change background
      'card-bg': 'rgba(30, 41, 59, 0.5)',  // Card background
    }
  }
}
```

### Modify Forecast Days

In `client/src/components/Dashboard.jsx`:

```javascript
// Change from 10 to any number (max 10)
const params = { ..., days: 7 };
```

## 📊 Features Checklist

After setup, verify these features work:

- [ ] Landing page loads with starry background
- [ ] "Use My Current Location" button works
- [ ] Search box shows location suggestions
- [ ] Dashboard displays current weather
- [ ] Hourly forecast scrolls horizontally
- [ ] 10-day forecast shows temperature bars
- [ ] Analytics cards show all metrics
- [ ] "Change Location" button returns to landing
- [ ] Refresh button updates data
- [ ] Responsive design works on mobile

## 🚀 Next Steps

1. **Customize the UI** to match your preferences
2. **Add more features** like weather alerts or maps
3. **Deploy to production** using Vercel + Heroku
4. **Share with friends** and get feedback!

## 💡 Tips

- Weather data updates automatically when you search
- Last location is saved in localStorage
- All temperatures are in Celsius (can be changed)
- Press Ctrl+C to stop the servers

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Open an issue on GitHub
- Review the API documentation at [WeatherAPI Docs](https://www.weatherapi.com/docs/)

---

**Happy Coding! 🌤️**
