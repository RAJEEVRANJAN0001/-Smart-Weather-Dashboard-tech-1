import React from 'react';
import { TrendingUp } from 'lucide-react';

function AveragesCard({ currentHigh, currentLow, avgHigh, avgLow }) {
  const highDiff = currentHigh - avgHigh;

  return (
    <div className="glass-card p-3 sm:p-4">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <TrendingUp className="w-3 h-3 text-gray-400 flex-shrink-0" />
        <h3 className="text-gray-400 text-[10px] sm:text-xs font-medium truncate">AVERAGES</h3>
      </div>

      <div className="flex items-center justify-center mb-1.5 sm:mb-2">
        <div className="text-center">
          <div className="flex items-baseline gap-1 justify-center mb-1">
            <span className="text-2xl sm:text-4xl font-bold text-white">{highDiff > 0 ? '+' : ''}{highDiff}°</span>
          </div>
          <div className="text-[10px] sm:text-xs text-gray-400 leading-tight">from avg high</div>
        </div>
      </div>

      <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">Today</span>
          <span className="text-white">H:{currentHigh}° L:{currentLow}°</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Average</span>
          <span className="text-white">H:{avgHigh}° L:{avgLow}°</span>
        </div>
      </div>
    </div>
  );
}

export default AveragesCard;
