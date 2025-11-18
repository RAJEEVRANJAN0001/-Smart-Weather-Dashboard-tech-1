import React from 'react';

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Animated weather icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-16 h-16 text-blue-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          {/* Spinning ring */}
          <div className="absolute inset-0 border-4 border-blue-400/20 border-t-blue-400 rounded-full spinner"></div>
        </div>
        <h3 className="text-xl font-semibold text-slate-300 mb-2">
          Fetching Weather Data
        </h3>
        <p className="text-slate-400 text-sm">
          Getting the latest conditions...
        </p>
      </div>
    </div>
  );
}

export default Loader;
