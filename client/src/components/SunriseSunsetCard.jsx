import React from 'react';
import { Sunrise as SunriseIcon } from 'lucide-react';

function SunriseSunsetCard({ sunrise, sunset, currentTime }) {
  // Convert time strings to minutes for calculation
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const sunriseMinutes = timeToMinutes(sunrise);
  const sunsetMinutes = timeToMinutes(sunset);
  const currentMinutes = timeToMinutes(currentTime);

  // Calculate percentage for sun position
  const dayLength = sunsetMinutes - sunriseMinutes;
  const elapsed = currentMinutes - sunriseMinutes;
  const percentage = Math.max(0, Math.min(100, (elapsed / dayLength) * 100));

  // Calculate sun position on arc
  const angle = (percentage / 100) * 180 - 180;
  const radians = (angle * Math.PI) / 180;
  const x = 50 + 40 * Math.cos(radians);
  const y = 50 + 40 * Math.sin(radians);

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <SunriseIcon className="w-3 h-3 text-gray-400" />
        <h3 className="text-gray-400 text-xs font-medium">SUNRISE</h3>
      </div>

      <div className="flex items-center justify-center mb-3">
        <svg className="w-full h-16" viewBox="0 0 100 50">
          {/* Arc background */}
          <path
            d="M 10 50 Q 50 0 90 50"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          {/* Arc progress */}
          <path
            d="M 10 50 Q 50 0 90 50"
            fill="none"
            stroke="url(#sunGradient)"
            strokeWidth="2"
            strokeDasharray={`${percentage * 1.25} 125`}
            strokeLinecap="round"
          />
          {/* Sun dot */}
          <circle cx={x} cy={y} r="4" fill="#FDB813" className="drop-shadow-lg" />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FDB813" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="text-center space-y-1">
        <div className="text-white font-semibold text-xl">{sunrise}</div>
        <div className="text-gray-400 text-xs">Sunset: {sunset}</div>
      </div>
    </div>
  );
}

export default SunriseSunsetCard;
