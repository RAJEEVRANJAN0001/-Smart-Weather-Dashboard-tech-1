import React from 'react';
import { CloudRain } from 'lucide-react';

function PrecipitationCard({ amount, forecast, mapData, tall = false }) {
  const mapHeight = tall ? 'h-96' : 'h-40';
  
  return (
    <div className={`glass-card p-5 ${tall ? 'h-full flex flex-col' : ''}`}>
      <div className="flex items-center gap-2 mb-4">
        <CloudRain className="w-4 h-4 text-gray-400" />
        <h3 className="text-gray-400 text-sm font-medium">PRECIPITATION</h3>
      </div>

      {/* Mini map placeholder */}
      <div className={`relative w-full ${mapHeight} bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg mb-4 overflow-hidden ${tall ? 'flex-1' : ''}`}>
        {/* Map background with subtle grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
            {[...Array(36)].map((_, i) => (
              <div key={i} className="border border-white/10"></div>
            ))}
          </div>
        </div>

        {/* Map labels - simulating India map */}
        <div className="absolute inset-0 text-gray-500 text-xs">
          <div className="absolute top-4 left-4">Lahore</div>
          <div className="absolute top-6 right-8">NEPAL</div>
          <div className="absolute top-10 right-6">BHUTAN</div>
          <div className="absolute top-12 right-4">Dhaka</div>
          <div className="absolute top-8 left-1/3">New Delhi</div>
          <div className="absolute top-10 left-1/3 ml-4">Jaipur</div>
          <div className="absolute top-16 right-12">Lucknow</div>
          <div className="absolute top-20 right-8">Kolkata</div>
          <div className="absolute top-20 left-6">PAKISTAN</div>
          <div className="absolute top-24 left-12">Ahmedabad</div>
          <div className="absolute bottom-20 left-6">Mumbai</div>
          <div className="absolute bottom-20 left-16">Pune</div>
          <div className="absolute bottom-12 left-20">Hyderabad</div>
          <div className="absolute bottom-8 left-24">Bengaluru</div>
          <div className="absolute bottom-16 right-8">MYANMAR (BURMA)</div>
          <div className="absolute bottom-6 right-12">Yangon</div>
        </div>
        
        {/* Precipitation overlay - simulated rain areas */}
        {mapData?.hasPrecipitation && (
          <>
            <div className="absolute bottom-8 right-12 w-20 h-24 bg-blue-500/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-6 right-10 w-24 h-20 bg-cyan-500/20 rounded-full blur-2xl"></div>
          </>
        )}

        {/* Location marker - Dehri on Son area */}
        <div className="absolute" style={{ top: '45%', left: '48%' }}>
          <div className="relative">
            <div className="w-8 h-8 flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">15</span>
              </div>
            </div>
          </div>
          {mapData?.location && (
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white font-medium">
              {mapData.location}
            </div>
          )}
        </div>

        {/* Precipitation areas in southeast */}
        <div className="absolute bottom-6 right-6 w-32 h-24">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 via-cyan-500/30 to-blue-400/20 rounded-lg blur-md"></div>
            <div className="absolute bottom-0 right-0 w-20 h-16 bg-blue-500/50 rounded-lg blur-lg"></div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{amount}</span>
          <span className="text-gray-400 text-sm">mm</span>
        </div>
        <div className="text-sm text-gray-400">Today</div>
        <p className="text-gray-400 text-xs mt-2">
          {forecast || 'None expected in next 10 days.'}
        </p>
      </div>
    </div>
  );
}

export default PrecipitationCard;
