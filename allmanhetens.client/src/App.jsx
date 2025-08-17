import React, { useState } from 'react';
import { VStack, Heading, Center } from "@chakra-ui/react"
import RinkSelector from './components/ui/rink-selector';
import { ColorModeButton } from './components/ui/color-mode';
import SessionsDateSelector from './components/ui/sessions-date-selector';
import SelectedRinksList from './components/ui/selected-rinks-list';
import { AllmanhetensDate } from './model/allmanhetens-date'

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
  const [currentDate, setCurrentDate] = useState((new AllmanhetensDate(null)).toString());
  const [searchTerm, setSearchTerm] = useState('');
  const [sessions, setSessions] = useState([]);
  const [selectedRinks, setSelectedRinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Service
  const sessionService = {
    async fetchSessions() {
      let params = new URLSearchParams();
      params.append("date", currentDate);
      return await fetch(`/api/skatingSessions?${params}`).then(res => res.json());
    }
  };

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

  // Load sessions from API on component mount
  React.useEffect(() => {
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

  function onCurrentDateUpdate(value) {
    setCurrentDate(value);
    loadSessions();
  }


  return (
    <Center>
      <VStack maxWidth="480px">
        {/* Header */}
        <Heading size="xl">
          🏒 Allmänhetens <ColorModeButton></ColorModeButton>
        </Heading>
        <SessionsDateSelector currentDate={currentDate} setCurrentDate={onCurrentDateUpdate} width={"100%"}></SessionsDateSelector>
        <SelectedRinksList selectedRinks={selectedRinks} loading={loading} width={"100%"}></SelectedRinksList>
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
        <RinkSelector></RinkSelector>
      </VStack >
    </Center>
  );
}

export default App;