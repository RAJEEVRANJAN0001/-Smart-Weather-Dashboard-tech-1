import React from 'react';
import { Droplets } from 'lucide-react';

function HumidityCard({ humidity, dewPoint }) {
  return (
    <div className="glass-card p-3 sm:p-4">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <Droplets className="w-3 h-3 text-gray-400 flex-shrink-0" />
        <h3 className="text-gray-400 text-[10px] sm:text-xs font-medium truncate">HUMIDITY</h3>
      </div>

      <div className="flex items-center justify-center mb-1.5 sm:mb-2">
        <div className="text-2xl sm:text-4xl font-bold text-white">{humidity}%</div>
      </div>

      <p className="text-gray-400 text-[10px] sm:text-xs text-center leading-tight">
        Dew point: {dewPoint}°
      </p>
    </div>
  );
}

export default HumidityCard;
