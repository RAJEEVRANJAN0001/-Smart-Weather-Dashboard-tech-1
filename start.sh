#!/bin/bash

# Smart Weather Dashboard - Quick Start Script
# This script helps you get started with the weather app quickly

set -e  # Exit on error

echo ""
echo "🌤️  =============================================="
echo "   SMART WEATHER DASHBOARD - QUICK START"
echo "   =============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js is not installed"
    echo "   Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ ERROR: package.json not found"
    echo "   Please run this script from the project root directory"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: You need to add your WeatherAPI key!"
    echo ""
    echo "   1. Get your FREE API key from:"
    echo "      → https://www.weatherapi.com/signup.aspx"
    echo ""
    echo "   2. Open the .env file and add your key:"
    echo "      → WEATHER_API_KEY=your_actual_key_here"
    echo ""
    read -p "   Press Enter after adding your API key..."
    echo ""
fi

# Check if API key is set
if ! grep -q "WEATHER_API_KEY=." .env; then
    echo "⚠️  WARNING: API key appears to be empty in .env"
    echo "   The app will not work without a valid API key"
    echo ""
    read -p "   Continue anyway? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if node_modules exists
if [ ! -d "node_modules" ] || [ ! -d "client/node_modules" ]; then
    echo "📦 Installing dependencies..."
    echo "   This may take a few minutes..."
    echo ""
    
    npm install
    cd client
    npm install
    cd ..
    
    echo ""
    echo "✅ All dependencies installed!"
    echo ""
fi

echo "🚀 Starting the application..."
echo ""
echo "   Backend will start on:  http://localhost:5000"
echo "   Frontend will open at:  http://localhost:3000"
echo ""
echo "   Press Ctrl+C to stop the servers"
echo ""
echo "=============================================="
echo ""

# Start the application
npm run dev
