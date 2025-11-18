import React from 'react';
import { Eye } from 'lucide-react';

function VisibilityCard({ visibility, description }) {
  return (
    <div className="glass-card p-3 sm:p-4">
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
        <Eye className="w-3 h-3 text-gray-400 flex-shrink-0" />
        <h3 className="text-gray-400 text-[10px] sm:text-xs font-medium truncate">VISIBILITY</h3>
      </div>

      <div className="flex items-center justify-center mb-1.5 sm:mb-2">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-4xl font-bold text-white">{visibility}</span>
          <span className="text-gray-400 text-xs sm:text-base">km</span>
        </div>
      </div>

      <p className="text-gray-400 text-[10px] sm:text-xs text-center leading-tight">
        {description || 'Clear view'}
      </p>
    </div>
  );
}

export default VisibilityCard;
