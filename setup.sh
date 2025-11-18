#!/bin/bash

# Smart Weather Dashboard Setup Script

echo "🌤️  Smart Weather Dashboard - Setup Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo "✅ Backend dependencies installed"
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd client
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

cd ..
echo "✅ Frontend dependencies installed"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please add your WeatherAPI key to the .env file"
    echo "   1. Open .env in a text editor"
    echo "   2. Get your free API key at: https://www.weatherapi.com/signup.aspx"
    echo "   3. Add it to WEATHER_API_KEY="
else
    echo "✅ .env file already exists"
fi

echo ""
echo "=========================================="
echo "✨ Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Add your WeatherAPI key to .env file"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "For more information, see SETUP_GUIDE.md"
