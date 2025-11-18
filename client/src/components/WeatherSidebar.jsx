import React, { useState } from 'react';
import { Search } from 'lucide-react';

function WeatherSidebar({ cities, selectedCity, onCitySelect, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-r border-white/10 flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-white/10">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-white/5 text-white pl-10 pr-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-blue-400/50 placeholder-gray-400 text-sm"
          />
        </form>
      </div>

      {/* City List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
        {cities.map((city, index) => (
          <div
            key={index}
            onClick={() => onCitySelect(city)}
            className={`p-4 border-b border-white/5 cursor-pointer transition-all duration-200 ${
              selectedCity?.name === city.name
                ? 'bg-white/10 border-l-4 border-l-blue-400'
                : 'hover:bg-white/5'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-medium text-sm">{city.name}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{city.time}</p>
              </div>
              <div className="text-right">
                <div className="text-white text-2xl font-light">{city.temp}°</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-gray-400">{city.condition}</span>
              <span className="text-gray-400">
                H:{city.high}° L:{city.low}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherSidebar;
