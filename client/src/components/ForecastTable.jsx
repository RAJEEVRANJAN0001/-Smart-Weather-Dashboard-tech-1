import React from 'react';
import { format } from 'date-fns';

function ForecastTable({ forecastDays }) {
  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === tomorrow.toDateString()) {
      return format(date, 'EEE');
    }
    
    return format(date, 'EEE');
  };

  const getTemperatureBarStyle = (minTemp, maxTemp, overallMin, overallMax) => {
    const range = overallMax - overallMin;
    const leftPercent = ((minTemp - overallMin) / range) * 100;
    const widthPercent = ((maxTemp - minTemp) / range) * 100;
    
    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`
    };
  };

  // Calculate overall min and max for the bar chart
  const overallMin = Math.min(...forecastDays.map(day => day.day.mintemp_c));
  const overallMax = Math.max(...forecastDays.map(day => day.day.maxtemp_c));

  return (
    <div className="glass-card p-3 sm:p-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-gray-400 text-xs sm:text-sm font-medium">10-DAY FORECAST</h3>
      </div>

      <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 pr-1 sm:pr-2 space-y-2">
        {forecastDays.map((day, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-slate-700/20 transition-all"
          >
            {/* Day name */}
            <div className="w-12 sm:w-14 text-xs font-medium text-white">
              {getDayName(day.date)}
            </div>

            {/* Weather icon */}
            <img 
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0"
            />

            {/* Temperature bar */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
              <span className="text-xs text-slate-400 w-6 sm:w-7 text-right flex-shrink-0">
                {Math.round(day.day.mintemp_c)}°
              </span>
              <div className="flex-1 h-1.5 bg-slate-700/30 rounded-full relative min-w-0">
                <div 
                  className="absolute h-full rounded-full"
                  style={{
                    ...getTemperatureBarStyle(
                      day.day.mintemp_c,
                      day.day.maxtemp_c,
                      overallMin,
                      overallMax
                    ),
                    background: 'linear-gradient(90deg, #10B981 0%, #FBBF24 50%, #F59E0B 100%)'
                  }}
                />
              </div>
              <span className="text-xs font-medium w-6 sm:w-7 text-white flex-shrink-0">
                {Math.round(day.day.maxtemp_c)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastTable;
