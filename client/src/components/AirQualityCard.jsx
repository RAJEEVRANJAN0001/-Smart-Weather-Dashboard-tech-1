import React from 'react';
import { Wind } from 'lucide-react';

function AirQualityCard({ aqi, description }) {
  const getAQILevel = (index) => {
    if (index <= 50) return { level: 'Good', color: 'bg-green-500' };
    if (index <= 100) return { level: 'Moderate', color: 'bg-yellow-500' };
    if (index <= 150) return { level: 'Unhealthy for Sensitive', color: 'bg-orange-500' };
    if (index <= 200) return { level: 'Unhealthy', color: 'bg-red-500' };
    if (index <= 300) return { level: 'Very Unhealthy', color: 'bg-purple-500' };
    return { level: 'Hazardous', color: 'bg-red-900' };
  };

  const aqiData = getAQILevel(aqi);
  const percentage = (aqi / 500) * 100;

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-4">
        <Wind className="w-3 h-4 text-gray-500" />
        <h3 className="text-gray-400 text-xs font-medium">AIR QUALITY</h3>
      </div>

      <div className="mb-3">
        <div className="text-lg font-semibold text-white mb-2">{aqiData.level}</div>
        
        {/* Color bar indicator */}
        <div className="relative h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="flex-1 bg-green-500"></div>
            <div className="flex-1 bg-yellow-500"></div>
            <div className="flex-1 bg-orange-500"></div>
            <div className="flex-1 bg-red-500"></div>
          </div>
          {/* Indicator dot */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border-2 border-slate-900"
            style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
          ></div>
        </div>
      </div>

      <p className="text-gray-400 text-xs leading-tight">
        {description || `Air quality index is ${aqi}, which is similar to yesterday at about this time.`}
      </p>
    </div>
  );
}

export default AirQualityCard;
