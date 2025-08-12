import React, { useState } from 'react';
import { Search, Clock, MapPin, Sun, Moon, GripVertical } from 'lucide-react';

// API Service - Replace this with actual API calls
const sessionService = {
  // Simulates fetching sessions from backend API
  async fetchSessions() {
    // This would be: return await fetch('/api/skating-sessions').then(res => res.json());
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "session_1",
            rink_id: "rink_001",
            rink_name: "Centennial Arena",
            rink_address: "123 Main St",
            distance_km: 0.8,
            start_time: "19:00",
            end_time: "21:00",
            date: "2025-08-11",
            session_type: "with_puck_and_stick",
            display_name: "With puck and stick",
            price_cents: 700,
            capacity: 60,
            booked: 25
          },
          {
            id: "session_2",
            rink_id: "rink_002",
            rink_name: "Riverside Ice Complex",
            rink_address: "456 Oak Ave",
            distance_km: 1.2,
            start_time: "13:00",
            end_time: "15:00",
            date: "2025-08-11",
            session_type: "skating_only",
            display_name: "Skating only",
            price_cents: 500,
            capacity: 120,
            booked: 40
          },
          {
            id: "session_3",
            rink_id: "rink_002",
            rink_name: "Riverside Ice Complex",
            rink_address: "456 Oak Ave",
            distance_km: 1.2,
            start_time: "18:00",
            end_time: "20:00",
            date: "2025-08-11",
            session_type: "with_puck_and_stick",
            display_name: "With puck and stick",
            price_cents: 600,
            capacity: 120,
            booked: 70
          },
          {
            id: "session_4",
            rink_id: "rink_003",
            rink_name: "Community Ice Rink",
            rink_address: "789 Pine Blvd",
            distance_km: 2.1,
            start_time: "11:00",
            end_time: "13:00",
            date: "2025-08-11",
            session_type: "skating_only",
            display_name: "Skating only",
            price_cents: 400,
            capacity: 80,
            booked: 20
          },
          {
            id: "session_5",
            rink_id: "rink_004",
            rink_name: "Northside Arena",
            rink_address: "321 Elm Street",
            distance_km: 1.8,
            start_time: "16:00",
            end_time: "18:00",
            date: "2025-08-11",
            session_type: "skating_only",
            display_name: "Skating only",
            price_cents: 550,
            capacity: 90,
            booked: 30
          },
          {
            id: "session_6",
            rink_id: "rink_005",
            rink_name: "Downtown Ice Palace",
            rink_address: "555 Main Avenue",
            distance_km: 0.5,
            start_time: "14:00",
            end_time: "16:00",
            date: "2025-08-11",
            session_type: "with_puck_and_stick",
            display_name: "With puck and stick",
            price_cents: 800,
            capacity: 100,
            booked: 85
          }
        ]);
      }, 100); // Simulate network delay
    });
  }
};

// Transform API data to display format
const transformSessionData = (apiSessions) => {
  return apiSessions.map(session => ({
    id: session.id,
    rinkName: session.rink_name,
    rinkAddress: session.rink_address,
    distance: `${session.distance_km} km`,
    time: `${session.start_time} - ${session.end_time}`,
    type: session.display_name,
    price: `${(session.price_cents / 100).toFixed(0)}`,
    // Additional data that could be useful
    availability: session.capacity - session.booked,
    capacity: session.capacity,
    date: session.date
  }));
};

const getSessionTypeStyles = (type) => {
  switch (type) {
    case 'With puck and stick': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'Skating only': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};

function App2() {
  const [searchTerm, setSearchTerm] = useState('');
  const [rinks, setRinks] = useState([]);
  const [filteredRinks, setFilteredRinks] = useState([]);
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
        const transformedRinks = transformSessionData(apiSessions);
        setRinks(transformedRinks);
        setFilteredRinks(transformedRinks);
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
      setFilteredRinks(rinks);
    } else {
      const filtered = rinks.filter(rink =>
        rink.rinkName.toLowerCase().includes(value.toLowerCase()) ||
        rink.rinkAddress.toLowerCase().includes(value.toLowerCase()) ||
        rink.sessions.some(session =>
          session.type.toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredRinks(filtered);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(filteredRinks[index]);
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

    const draggedIndex = filteredRinks.findIndex(rink => rink.id === draggedItem.id);
    if (draggedIndex === dropIndex) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const newRinks = [...filteredRinks];
    newRinks.splice(draggedIndex, 1);
    newRinks.splice(dropIndex, 0, draggedItem);

    setFilteredRinks(newRinks);
    setRinks(newRinks);
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-8">
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

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search rinks, locations, or session types..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:border-blue-400 focus:outline-none transition-colors"
              />
            </div>
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
              {filteredRinks.map((rink, index) => (
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
                            {rink.rinkName}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span>{rink.rinkAddress}</span>
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
                        {rink.sessions.map((session) => (
                          <div
                            key={session.id}
                            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                          >
                            <div className="flex items-center space-x-3">
                              <Clock className="w-5 h-5 text-blue-500" />
                              <div className="space-y-1">
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {session.time}
                                </p>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSessionTypeStyles(session.type)}`}>
                                  {session.type}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                {session.price}
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
        </div>
      </div>
    </div>
                </div >
              ))
}
            </div >
          )}

{/* Empty State */ }
{
  filteredRinks.length === 0 && !loading && !error && (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mt-4">
      <div className="text-center space-y-4">
        <div className="text-4xl">🔍</div>
        <p className="text-gray-600 dark:text-gray-400">
          No rinks found matching "{searchTerm}"
        </p>
        <button
          onClick={() => handleSearch('')}
          className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
        >
          Clear search
        </button>
      </div>
    </div>
  )
}

{/* Instructions */ }
{
  filteredRinks.length > 0 && !loading && (
    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
        💡 Drag and drop cards to prioritize your preferred rinks
      </p>
    </div>
  )
}
        </div >
      </div >
    </div >
  );
}

export default App2;