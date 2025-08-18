import React, { useState } from 'react';
import { Center } from "@chakra-ui/react"
import DefaultScreen from './components/default/default-screen';
import SettingsScreen from './components/settings/settings-screen';
import { AllmanhetensDate } from './model/allmanhetens-date'

const formatTime = (time) => {
  return time.split(':').splice(0, 2).join(':');
}

// Transform API data to display format
const transformSessionData = (apiSessions) => {
  const mapped = apiSessions.map(session => ({
    id: session.id,
    rinkId: session.rinkId,
    rinkName: session.rinkName,
    rinkAddress: session.rinkAddress,
    distance: `${session.distanceKm} km`,
    time: `${formatTime(session.startTime)}–${formatTime(session.endTime) }`,
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
  const [searchTerm, setSearchTerm] = useState('');
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeScreen, setActiveScreen] = useState('default');
  const [selectedRinks, setSelectedRinks] = useState([]);
  const [currentDate, setCurrentDate] = useState((new AllmanhetensDate(null)).toString());
  function onCurrentDateUpdate(value) {
    setCurrentDate(value);
    loadSessions(value);
  }

  function onSettingsScreenClosed() {
    setActiveScreen('default');
  }


  // API Service
  const sessionService = {
    async fetchSessions(date) {
      let params = new URLSearchParams();
      if (date) {
        params.append("date", date);
      }
      return await fetch(`/api/skatingSessions?${params}`).then(res => res.json());
    }
  };

  const loadSessions = async (date) => {
    try {
      setLoading(true);
      setError(null);
      const apiSessions = await sessionService.fetchSessions(date);
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
    loadSessions(currentDate);
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
    <Center>
      {activeScreen === 'default' && (
        <DefaultScreen setActiveScreen={setActiveScreen} loading={loading} loadSessions={loadSessions}
          currentDate={currentDate} setCurrentDate={onCurrentDateUpdate} selectedRinks={ selectedRinks }></DefaultScreen>
      )}
      {activeScreen === 'settings' && (
        <SettingsScreen closeScreen={ onSettingsScreenClosed }></SettingsScreen>
      )}
    </Center>
  );
}

export default App;