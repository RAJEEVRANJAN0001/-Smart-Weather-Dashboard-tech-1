import React from 'react';
import { Thermometer } from 'lucide-react';

function FeelsLikeCard({ feelsLike, actual, description }) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Thermometer className="w-3 h-3 text-gray-400" />
        <h3 className="text-gray-400 text-xs font-medium">FEELS LIKE</h3>
      </div>

      <div className="flex items-center justify-center mb-3">
        <div className="text-4xl font-bold text-white">{feelsLike}°</div>
      </div>

      <p className="text-gray-400 text-xs text-center leading-tight">
        {description || 'Wind is making it feel cooler.'}
      </p>
    </div>
  );
}

export default FeelsLikeCard;
