import React from 'react';
import { Wind } from 'lucide-react';

function WindCard({ speed, direction, gusts }) {
  const getCardinalDirection = (degree) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degree / 22.5) % 16;
    return directions[index];
  };

  const cardinal = getCardinalDirection(direction);

  return (
    <div className="glass-card p-3">
      <div className="flex items-center gap-3 mb-4">
        <Wind className="w-4 h-5 text-gray-500" />
        <h3 className="text-gray-400 text-[10px] font-medium">WIND</h3>
      </div>

      <div className="flex items-center justify-center mb-3">
        {/* Wind Compass */}
        <div className="relative w-28 h-28">
          {/* Compass circle */}
          <div className="absolute inset-0 rounded-full border-2 border-white/10 flex items-center justify-center">
            <div className="absolute inset-2 rounded-full border border-white/5"></div>
            
            {/* Cardinal directions */}
            <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold">N</div>
            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs">S</div>
            <div className="absolute right-1.5 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">E</div>
            <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">W</div>

            {/* Wind direction arrow */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: `rotate(${direction}deg)` }}
            >
              <div className="w-1 h-10 bg-gradient-to-t from-blue-400 to-cyan-400 rounded-full"></div>
              <div className="absolute top-5 w-0 h-0 border-l-[5px] border-r-[5px] border-b-[7px] border-l-transparent border-r-transparent border-b-cyan-400"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1 text-[10px]">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Wind</span>
          <div className="flex items-baseline gap-0.5">
            <span className="text-white font-medium text-sm">{speed}</span>
            <span className="text-gray-400 text-[9px]">kph</span>
          </div>
        </div>
        
        {gusts && (
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Gusts</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-white font-medium text-sm">{gusts}</span>
              <span className="text-gray-400 text-[9px]">kph</span>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Direction</span>
          <span className="text-white font-medium text-[10px]">{direction}° {cardinal}</span>
        </div>
      </div>
    </div>
  );
}

export default WindCard;
