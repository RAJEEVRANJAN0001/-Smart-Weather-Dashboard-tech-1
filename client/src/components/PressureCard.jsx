import React from 'react';
import { Gauge } from 'lucide-react';

function PressureCard({ pressure, trend }) {
  const minPressure = 950;
  const maxPressure = 1050;
  const percentage = ((pressure - minPressure) / (maxPressure - minPressure)) * 100;

  return (
    <div className="glass-card p-3 sm:p-4">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <Gauge className="w-3 h-3 text-gray-400 flex-shrink-0" />
        <h3 className="text-gray-400 text-[10px] sm:text-xs font-medium truncate">PRESSURE</h3>
      </div>

      <div className="flex items-center justify-center mb-1.5 sm:mb-2">
        {/* Pressure Gauge */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background arc */}
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${Math.PI * 40 * 1.5} ${Math.PI * 40 * 0.5}`}
            />
            {/* Progress arc */}
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="url(#pressureGradient)"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${Math.PI * 40 * 1.5 * (percentage / 100)} ${Math.PI * 40 * 1.5}`}
              className="transition-all duration-500"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-white">{pressure}</div>
              <div className="text-[10px] sm:text-xs text-gray-400">hPa</div>
            </div>
          </div>
          
          {/* Gradient definition */}
          <svg className="absolute" width="0" height="0">
            <defs>
              <linearGradient id="pressureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="text-center">
        <div className="text-[10px] sm:text-xs text-gray-400">
          {trend === 'rising' && '↗ Rising'}
          {trend === 'falling' && '↘ Falling'}
          {trend === 'steady' && '→ Steady'}
          {!trend && 'Steady'}
        </div>
      </div>
    </div>
  );
}

export default PressureCard;
