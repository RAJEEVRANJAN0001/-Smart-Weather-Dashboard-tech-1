import React from 'react';
import { Droplets } from 'lucide-react';

function HumidityCard({ humidity, dewPoint }) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Droplets className="w-3 h-3 text-gray-400" />
        <h3 className="text-gray-400 text-xs font-medium">HUMIDITY</h3>
      </div>

      <div className="flex items-center justify-center mb-3">
        <div className="text-4xl font-bold text-white">{humidity}%</div>
      </div>

      <p className="text-gray-400 text-xs text-center leading-tight">
        {dewPoint && `The dew point is ${dewPoint}° right now.`}
      </p>
    </div>
  );
}

export default HumidityCard;
