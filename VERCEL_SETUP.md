# Vercel Deployment Setup

## Required Environment Variables

Set these in your Vercel project dashboard:

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

### Required Variables

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `WEATHER_API_KEY` | `8592fea14b0d4accbf8152624251611` | Your WeatherAPI key |
| `WEATHER_API_BASE_URL` | `https://api.weatherapi.com/v1` | WeatherAPI base URL |

### Important Notes

- Make sure to set these for **all environments** (Production, Preview, Development)
- After adding environment variables, you need to **redeploy** your project
- You can trigger a redeploy from: Deployments → (select latest) → ⋯ → Redeploy

## Testing Your Deployment

After setting environment variables and redeploying, test these endpoints:

1. **Health Check**
   ```
   https://your-app.vercel.app/api/weather/health
   ```
   Should return: `{"status":"OK","message":"Weather API (serverless) is running"}`

2. **Search Locations**
   ```
   https://your-app.vercel.app/api/weather/search?q=London
   ```
   Should return location search results

3. **Current Weather**
   ```
   https://your-app.vercel.app/api/weather/current?q=London
   ```
   Should return current weather data

## Troubleshooting

### "WEATHER_API_KEY environment variable is not set"

- Verify the environment variable is named exactly `WEATHER_API_KEY` (case-sensitive)
- Make sure it's set for all environments
- Redeploy after adding the variable

### "Failed to search locations"

- Check the Vercel Function Logs: Deployments → (select deployment) → Functions
- Verify your WeatherAPI key is valid at https://www.weatherapi.com/my/
- Ensure you haven't exceeded your API quota

### CORS Errors

- The API now includes CORS headers, so this should work from any domain
- If issues persist, check browser console for specific error messages

## Commit and Deploy

```bash
git add .
git commit -m "fix: add CORS and improve error handling for serverless API"
git push origin main
```

Vercel will automatically deploy when you push to your connected branch.
