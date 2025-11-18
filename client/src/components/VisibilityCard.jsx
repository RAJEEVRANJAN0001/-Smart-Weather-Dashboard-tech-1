import React from 'react';
import { Eye } from 'lucide-react';

function VisibilityCard({ visibility, description }) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Eye className="w-3 h-3 text-gray-400" />
        <h3 className="text-gray-400 text-xs font-medium">VISIBILITY</h3>
      </div>

      <div className="flex items-center justify-center mb-2">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">{visibility}</span>
          <span className="text-gray-400 text-base">km</span>
        </div>
      </div>

      <p className="text-gray-400 text-xs text-center leading-tight">
        {description || 'Perfectly clear view.'}
      </p>
    </div>
  );
}

export default VisibilityCard;
