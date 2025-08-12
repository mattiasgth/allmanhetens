import React, { useState } from 'react';
import { Search, Clock, MapPin, Sun, Moon, GripVertical } from 'lucide-react';
import RinkSelector from './RinkSelector';

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
  console.log(groupedArray);
  return groupedArray;
};

const getSessionTypeStyles = (type) => {
  switch (type) {
    case 1: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 2: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sessions, setSessions] = useState([]);
  const [selectedRinks, setSelectedRinks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(selectedRinks[index]);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedItem === null) return;

    const draggedIndex = selectedRinks.findIndex(rink => rink.id === draggedItem.id);
    if (draggedIndex === dropIndex) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const newSessions = [...selectedRinks];
    newSessions.splice(draggedIndex, 1);
    newSessions.splice(dropIndex, 0, draggedItem);

    setSelectedRinks(newSessions);
    setSessions(newSessions);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4">
          {/* Header */}
          <div className="py-6 space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                🏒 Ice Rinks Nearby
              </h1>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
            <button>Välj arenor</button>
          </div>

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
            <div className="space-y-3">
              {selectedRinks.map((rink, index) => (
                <div
                  key={rink.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 cursor-move transition-all duration-200 ${dragOverIndex === index ? 'ring-2 ring-blue-400 scale-105' : ''
                    } ${draggedItem?.id === rink.id ? 'opacity-50' : ''} hover:shadow-lg`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Drag Handle */}
                    <div className="flex-shrink-0 pt-1">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Rink Content */}
                    <div className="flex-1 space-y-4">
                      {/* Rink Header */}
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                            {rink.name}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>{rink.address}</span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                              {rink.distance}
                            </span>
                          </div>
                        </div>
                      </div>

                      <hr className="border-gray-200 dark:border-gray-600" />

                      {/* Sessions */}
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Today's Public Skating Sessions
                        </p>
                        {rink.sessions.map((session) =>
                        (<div
                            key={session.id}
                            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                          >
                            <div className="flex items-center space-x-3">
                              <Clock className="w-5 h-5 text-blue-500" />
                              <div className="space-y-1">
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {session.time}
                                </p>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSessionTypeStyles(session.typeId)}`}>
                                  {session.type}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                {session.id}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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