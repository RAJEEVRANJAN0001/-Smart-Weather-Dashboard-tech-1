import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [location, setLocation] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  // Check for saved location on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('weatherLocation');
    if (savedLocation) {
      try {
        const parsed = JSON.parse(savedLocation);
        setLocation(parsed);
        setShowDashboard(true);
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    }
  }, []);

  const handleLocationSelect = (locationData) => {
    setLocation(locationData);
    localStorage.setItem('weatherLocation', JSON.stringify(locationData));
    setShowDashboard(true);
  };

  const handleBackToLanding = () => {
    setShowDashboard(false);
    setLocation(null);
    localStorage.removeItem('weatherLocation');
  };

  return (
    <div className="min-h-screen">
      {!showDashboard ? (
        <LandingPage 
          onLocationSelect={handleLocationSelect}
        />
      ) : (
        <Dashboard 
          location={location}
          onBack={handleBackToLanding}
        />
      )}
    </div>
  );
}

export default App;
