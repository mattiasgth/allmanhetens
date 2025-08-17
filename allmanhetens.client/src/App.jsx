import React, { useState } from 'react';
import { VStack, Heading } from "@chakra-ui/react"
import RinkSelector from './components/ui/rink-selector';
import RinkCardOld from './components/ui/rink-card-old';
import { ColorModeButton } from './components/ui/color-mode';
import SessionsDateSelector from './components/ui/sessions-date-selector.tsx';

// API Service
const sessionService = {
  async fetchSessions() {
    return await fetch('/api/skatingSessions').then(res => res.json());
  }
};

// Transform API data to display format
const transformSessionData = (apiSessions) => {
  const mapped = apiSessions.map(session => ({
    id: session.id,
    rinkId: session.rinkId,
    rinkName: session.rinkName,
    rinkAddress: session.rinkAddress,
    distance: `${session.distanceKm} km`,
    time: `${session.startTime} - ${session.endTime}`,
    type: session.sessionTypeName,
    typeId: session.sessionTypeId,
    // Additional data that could be useful
    price: `${(session.priceCents / 100).toFixed(0)}`,
    availability: session.capacity - session.booked,
    capacity: session.capacity,
    date: session.date
  }));

  const groupedArray = Object.values(
    mapped.reduce((groups, session) => {
      if (!groups[session.rinkId]) {
        groups[session.rinkId] = {
          id: session.rinkId,
          name: session.rinkName,
          address: session.rinkAddress,
          sessions: []
        };
      }
      groups[session.rinkId].sessions.push(session);
      return groups;
    }, {})
  );
  return groupedArray;
};

function App() {
  const [currentDate, setCurrentDate] = useState('2025-08-17');
  const [searchTerm, setSearchTerm] = useState('');
  const [sessions, setSessions] = useState([]);
  const [selectedRinks, setSelectedRinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load sessions from API on component mount
  React.useEffect(() => {
    const loadSessions = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiSessions = await sessionService.fetchSessions();
        const transformedSessions = transformSessionData(apiSessions);
        setSessions(transformedSessions);
        setSelectedRinks(transformedSessions);
      } catch (err) {
        setError('Failed to load skating sessions. Please try again.');
        console.error('Error loading sessions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSessions();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (!value) {
      setSelectedRinks(sessions);
    } else {
      const filtered = sessions.filter(session =>
        session.rinkName.toLowerCase().includes(value.toLowerCase()) ||
        session.rinkAddress.toLowerCase().includes(value.toLowerCase()) ||
        session.type.toLowerCase().includes(value.toLowerCase())
      );
      setSelectedRinks(filtered);
    }
  };


  return (
    <div>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <Heading size="xl">
                🏒 Allmänhetens <ColorModeButton></ColorModeButton>
          </Heading>
          <SessionsDateSelector currentDate={currentDate} setCurrentDate={setCurrentDate}></SessionsDateSelector>
          {/* Rink Cards */}
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 animate-pulse">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                      <div className="h-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <div className="text-center space-y-3">
                <div className="text-3xl">⚠️</div>
                <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <VStack>
              {selectedRinks.map((rink, index) => (
                <RinkCardOld rink={rink} index={index} selectedRinks={selectedRinks} key={ index }></RinkCardOld>
              ))}
            </VStack>
          )}


          {/* Empty State */}
          {selectedRinks.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mt-4">
              <div className="text-center space-y-4">
                <div className="text-4xl">🔍</div>
                <p className="text-gray-600 dark:text-gray-400">
                  No sessions found matching "{searchTerm}"
                </p>
                <button
                  onClick={() => handleSearch('')}
                  className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                >
                  Clear search
                </button>
              </div>
            </div>
          )}

          {/* Instructions */}
          {selectedRinks.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
                💡 Drag and drop cards to prioritize your preferred skating sessions
              </p>
            </div>
          )}
        </div>
      </div>
      <RinkSelector></RinkSelector>
    </div>
  );
}

export default App;