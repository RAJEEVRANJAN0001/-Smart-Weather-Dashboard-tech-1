import React from 'react';
import { Moon } from 'lucide-react';

function MoonPhaseCard({ phase, moonrise, illumination }) {
  const getMoonPhaseDisplay = (phase) => {
    const phases = {
      'New Moon': '🌑',
      'Waxing Crescent': '🌒',
      'First Quarter': '🌓',
      'Waxing Gibbous': '🌔',
      'Full Moon': '🌕',
      'Waning Gibbous': '🌖',
      'Last Quarter': '🌗',
      'Waning Crescent': '🌘'
    };
    return phases[phase] || '🌙';
  };

  // Calculate days until full moon (simplified)
  const daysUntilFullMoon = illumination < 50 ? Math.round((100 - illumination) / 5) : Math.round((50 - illumination) / 5) + 10;

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Moon className="w-4 h-4 text-gray-400" />
        <h3 className="text-gray-400 text-sm font-medium">WANING CRESCENT</h3>
      </div>

      <div className="flex gap-6">
        {/* Moon visualization */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 shadow-2xl">
            {/* Shadow for phase */}
            <div 
              className="absolute inset-0 rounded-full bg-slate-900"
              style={{ 
                clipPath: illumination < 50 
                  ? `ellipse(${illumination}% 50% at 50% 50%)`
                  : `ellipse(${100 - illumination}% 50% at 50% 50%)`
              }}
            ></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-50">
            {getMoonPhaseDisplay(phase)}
          </div>
        </div>

        {/* Moon details */}
        <div className="flex-1 space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Illumination</span>
            <span className="text-white font-medium">{illumination}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Next Moonrise</span>
            <span className="text-white font-medium">{moonrise || '03:28'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Next Full Moon</span>
            <span className="text-white font-medium">{daysUntilFullMoon} DAYS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoonPhaseCard;
