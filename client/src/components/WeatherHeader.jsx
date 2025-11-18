import React from 'react';

function WeatherHeader({ location, current }) {
  const getWeatherIcon = (condition) => {
    return `https:${condition.icon}`.replace('64x64', '128x128');
  };

  return (
    <div className="glass-card p-6 md:p-8 mb-6 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Location and current weather */}
        <div className="flex items-center gap-6 mb-6 md:mb-0">
          <img 
            src={getWeatherIcon(current.condition)}
            alt={current.condition.text}
            className="w-24 h-24 md:w-32 md:h-32"
          />
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              {location.name}
            </h2>
            <p className="text-slate-300 text-lg">
              {location.region && `${location.region}, `}{location.country}
            </p>
            <p className="text-slate-400 text-sm mt-1">
              {new Date(location.localtime).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Temperature and condition */}
        <div className="text-right">
          <div className="text-6xl md:text-7xl font-bold mb-2">
            {Math.round(current.temp_c)}°
          </div>
          <div className="text-xl text-slate-300 mb-2">
            {current.condition.text}
          </div>
          <div className="text-slate-400">
            Feels like {Math.round(current.feelslike_c)}°
          </div>
          <div className="flex items-center justify-end gap-4 mt-3 text-sm text-slate-400">
            <span>H: {Math.round(current.temp_c + 2)}°</span>
            <span>L: {Math.round(current.temp_c - 5)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherHeader;
