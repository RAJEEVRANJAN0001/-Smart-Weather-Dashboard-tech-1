import React from 'react';
import { format } from 'date-fns';
import { Cloud, CloudRain, Sun, Moon } from 'lucide-react';

function HourlyForecast({ hourlyData, currentHour, conditionText }) {
  // Get next 24 hours starting from current hour
  const getNext24Hours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hour = hourlyData[i];
      if (hour) {
        hours.push(hour);
      }
    }
    return hours;
  };

  const hours = getNext24Hours();

  const formatHour = (timeStr) => {
    const date = new Date(timeStr);
    const hour = format(date, 'HH');
    return hour === '00' ? '00' : hour;
  };

  const getMoonIcon = (hour) => {
    const hourNum = parseInt(format(new Date(hour.time), 'HH'));
    return hourNum >= 18 || hourNum < 6 ? '🌙' : null;
  };

  return (
    <div className="glass-card p-5 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      {/* Condition text above hourly */}
      {conditionText && (
        <p className="text-gray-400 text-sm mb-4">
          {conditionText}
        </p>
      )}
      
      <div className="overflow-x-auto -mx-2 px-2 scrollbar-thin scrollbar-thumb-white/10">
        <div className="flex gap-6 pb-2 min-w-max">
          {hours.slice(0, 12).map((hour, index) => {
            const moonIcon = getMoonIcon(hour);
            return (
              <div 
                key={index}
                className="flex-shrink-0 text-center min-w-[60px]"
              >
                <div className="text-sm text-gray-400 mb-3">
                  {index === 0 ? 'Now' : formatHour(hour.time)}
                </div>
                <div className="mb-3">
                  {moonIcon ? (
                    <div className="text-2xl">{moonIcon}</div>
                  ) : (
                    <img 
                      src={`https:${hour.condition.icon}`}
                      alt={hour.condition.text}
                      className="w-8 h-8 mx-auto"
                    />
                  )}
                </div>
                <div className="text-xl font-medium text-white">
                  {Math.round(hour.temp_c)}°
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HourlyForecast;
