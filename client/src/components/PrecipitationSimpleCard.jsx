import React from 'react';
import { CloudRain } from 'lucide-react';

function PrecipitationSimpleCard({ amount, forecast }) {
  return (
    <div className="glass-card p-3">
      <div className="flex items-center gap-1.5 mb-2">
        <CloudRain className="w-3 h-3 text-gray-400" />
        <h3 className="text-gray-400 text-[10px] font-medium">PRECIPITATION</h3>
      </div>

      <div className="flex items-center justify-center mb-2">
        <div className="flex items-baseline gap-0.5">
          <span className="text-2xl font-bold text-white">{amount}</span>
          <span className="text-gray-400 text-sm">mm</span>
        </div>
      </div>

      <div className="text-center space-y-0.5">
        <div className="text-[10px] text-gray-400">Today</div>
        <p className="text-gray-400 text-[10px] leading-tight">
          {forecast || 'None expected in next 10 days.'}
        </p>
      </div>
    </div>
  );
}

export default PrecipitationSimpleCard;
