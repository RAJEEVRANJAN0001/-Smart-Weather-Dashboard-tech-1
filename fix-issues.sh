#!/bin/bash

echo ""
echo "🔧 Fixing Common Issues..."
echo "================================"
echo ""

# Kill any process on port 5000
echo "1️⃣  Checking port 5000..."
if lsof -ti:5000 > /dev/null 2>&1; then
    echo "   ⚠️  Port 5000 is in use. Killing process..."
    lsof -ti:5000 | xargs kill -9 2>/dev/null
    sleep 1
    echo "   ✅ Port 5000 is now free"
else
    echo "   ✅ Port 5000 is already free"
fi

echo ""

# Kill any process on port 3000
echo "2️⃣  Checking port 3000..."
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "   ⚠️  Port 3000 is in use. Killing process..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 1
    echo "   ✅ Port 3000 is now free"
else
    echo "   ✅ Port 3000 is already free"
fi

echo ""

# Check for API key
echo "3️⃣  Checking API key..."
if [ -f .env ]; then
    if grep -q "WEATHER_API_KEY=." .env && ! grep -q "WEATHER_API_KEY=$" .env; then
        echo "   ✅ API key is set"
    else
        echo "   ❌ API key is NOT set!"
        echo ""
        echo "   📝 Please add your API key to the .env file:"
        echo "      1. Get key: https://www.weatherapi.com/signup.aspx"
        echo "      2. Edit .env file"
        echo "      3. Add: WEATHER_API_KEY=your_key_here"
        echo ""
        echo "   See ADD_API_KEY.txt for detailed instructions"
    fi
else
    echo "   ❌ .env file not found!"
fi

echo ""
echo "================================"
echo "✨ All checks complete!"
echo ""
