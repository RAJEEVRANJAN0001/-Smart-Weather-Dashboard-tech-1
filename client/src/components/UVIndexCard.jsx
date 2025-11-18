import React from 'react';
import { Sun } from 'lucide-react';

function UVIndexCard({ uvIndex, uvDescription }) {
  const getUVLevel = (uv) => {
    if (uv <= 2) return { level: 'Low', color: 'text-green-400', bgColor: 'bg-green-400' };
    if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-400', bgColor: 'bg-yellow-400' };
    if (uv <= 7) return { level: 'High', color: 'text-orange-400', bgColor: 'bg-orange-400' };
    if (uv <= 10) return { level: 'Very High', color: 'text-red-400', bgColor: 'bg-red-400' };
    return { level: 'Extreme', color: 'text-purple-400', bgColor: 'bg-purple-400' };
  };

  const uvData = getUVLevel(uvIndex);
  const percentage = (uvIndex / 11) * 100;

  return (
    <div className="glass-card p-3 sm:p-4">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <Sun className="w-3 h-3 text-gray-400 flex-shrink-0" />
        <h3 className="text-gray-400 text-[10px] sm:text-xs font-medium truncate">UV INDEX</h3>
      </div>

      <div className="flex items-center justify-center mb-2 sm:mb-3">
        {/* UV Gauge - smaller */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="6"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="currentColor"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 35}`}
              strokeDashoffset={`${2 * Math.PI * 35 * (1 - percentage / 100)}`}
              className={uvData.color}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-white">{uvIndex}</div>
              <div className={`text-[9px] sm:text-[10px] font-medium ${uvData.color}`}>{uvData.level}</div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-400 text-[10px] sm:text-xs text-center leading-tight">
        {uvDescription || `${uvData.level} UV today.`}
      </p>
    </div>
  );
}

export default UVIndexCard;
