import React from 'react';

function AnalyticsGrid({ current, astronomy, forecast }) {
  const getUVLevel = (uv) => {
    if (uv <= 2) return { text: 'Low', color: 'text-green-400' };
    if (uv <= 5) return { text: 'Moderate', color: 'text-yellow-400' };
    if (uv <= 7) return { text: 'High', color: 'text-orange-400' };
    if (uv <= 10) return { text: 'Very High', color: 'text-red-400' };
    return { text: 'Extreme', color: 'text-purple-400' };
  };

  const getMoonPhaseEmoji = (phase) => {
    const phases = {
      'New Moon': '🌑',
      'Waxing Crescent': '🌒',
      'First Quarter': '🌓',
      'Waxing Gibbous': '🌔',
      'Full Moon': '🌕',
      'Waning Gibbous': '🌖',
      'Last Quarter': '🌗',
      'Waning Crescent': '🌘'
    };
    return phases[phase] || '🌙';
  };

  const uvLevel = getUVLevel(current.uv);

  const analyticsData = [
    {
      title: 'UV Index',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      value: current.uv,
      subtitle: uvLevel.text,
      subtitleColor: uvLevel.color
    },
    {
      title: 'Sunrise',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      ),
      value: astronomy.astro.sunrise,
      subtitle: `Sunset: ${astronomy.astro.sunset}`,
      subtitleColor: 'text-slate-400'
    },
    {
      title: 'Wind',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      ),
      value: `${Math.round(current.wind_kph)} kph`,
      subtitle: `${current.wind_dir} • Gusts ${Math.round(current.gust_kph)} kph`,
      subtitleColor: 'text-slate-400'
    },
    {
      title: 'Precipitation',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      value: `${current.precip_mm} mm`,
      subtitle: `Chance: ${forecast.day.daily_chance_of_rain}%`,
      subtitleColor: 'text-blue-400'
    },
    {
      title: 'Humidity',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      value: `${current.humidity}%`,
      subtitle: `Dew point: ${Math.round(current.dewpoint_c)}°C`,
      subtitleColor: 'text-slate-400'
    },
    {
      title: 'Visibility',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      value: `${current.vis_km} km`,
      subtitle: 'Perfectly clear view',
      subtitleColor: 'text-slate-400'
    },
    {
      title: 'Pressure',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      value: `${Math.round(current.pressure_mb)} hPa`,
      subtitle: current.pressure_mb > 1013 ? 'High • Clear' : 'Low • Cloudy',
      subtitleColor: current.pressure_mb > 1013 ? 'text-green-400' : 'text-yellow-400'
    },
    {
      title: 'Moon Phase',
      icon: (
        <span className="text-3xl">{getMoonPhaseEmoji(astronomy.astro.moon_phase)}</span>
      ),
      value: astronomy.astro.moon_phase,
      subtitle: `Moonrise: ${astronomy.astro.moonrise}`,
      subtitleColor: 'text-slate-400',
      small: true
    },
    {
      title: 'Averages',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      value: `${Math.round(forecast.day.avgtemp_c)}°C`,
      subtitle: `H: ${Math.round(forecast.day.maxtemp_c)}° L: ${Math.round(forecast.day.mintemp_c)}°`,
      subtitleColor: 'text-slate-400'
    }
  ];

  return (
    <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Conditions
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analyticsData.map((item, index) => (
          <div 
            key={index}
            className="glass-card p-5 hover:bg-slate-700/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-blue-400">
                {item.icon}
              </div>
              <h4 className="text-slate-400 text-sm font-medium">
                {item.title}
              </h4>
            </div>
            <div className={`text-2xl font-bold mb-1 ${item.small ? 'text-lg' : ''}`}>
              {item.value}
            </div>
            <div className={`text-sm ${item.subtitleColor}`}>
              {item.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalyticsGrid;
