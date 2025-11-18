import React from 'react';
import { Thermometer } from 'lucide-react';

function FeelsLikeCard({ feelsLike, actual, description }) {
  return (
    <div className="glass-card p-3 sm:p-4">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <Thermometer className="w-3 h-3 text-gray-400 flex-shrink-0" />
        <h3 className="text-gray-400 text-[10px] sm:text-xs font-medium truncate">FEELS LIKE</h3>
      </div>

      <div className="flex items-center justify-center mb-1.5 sm:mb-2">
        <div className="text-2xl sm:text-4xl font-bold text-white">{feelsLike}°</div>
      </div>

      <p className="text-gray-400 text-[10px] sm:text-xs text-center leading-tight">
        {description}
      </p>
    </div>
  );
}

export default FeelsLikeCard;
