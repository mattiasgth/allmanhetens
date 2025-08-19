import React, { useState } from 'react';
import { Center } from "@chakra-ui/react"
import DefaultScreen from './components/default/default-screen';
import SettingsScreen from './components/settings/settings-screen';
import { AllmanhetensDate } from './model/allmanhetens-date'
import { SkatingSessionResponse } from './model/skating-session-response';
import { SkatingSessionDisplay } from './model/skating-session-display';
import { RinkSkatingSessions } from './model/rink-skating-sessions';

const formatTime = (time: string) => {
  return time.split(':').splice(0, 2).join(':');
}

// Transform API data to display format
const transformSessionData = (apiSessions: SkatingSessionResponse[]) => {
  const mapped : SkatingSessionDisplay[] = apiSessions.map(session => ({
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

  const groupedArray =
    mapped.reduce((groups: RinkSkatingSessions[], session) => {
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
    }, []);
  return groupedArray;
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sessions, setSessions] = useState<RinkSkatingSessions[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [activeScreen, setActiveScreen] = useState('default');
  const [selectedRinks, setSelectedRinks] = useState<RinkSkatingSessions[]>([]);
  const [currentDate, setCurrentDate] = useState((new AllmanhetensDate(null)).toString());
  function onCurrentDateUpdate(value: string) {
    setCurrentDate(value);
    loadSessions(value);
  }

  function onSettingsScreenClosed() {
    setActiveScreen('default');
  }


  // API Service
  const sessionService = {
    async fetchSessions(date: string) {
      let params = new URLSearchParams();
      if (date) {
        params.append("date", date);
      }
      return await fetch(`/api/skatingSessions?${params}`)
        .then(res => res.json() as Promise<SkatingSessionResponse[]>);
    }
  };

  const loadSessions = async (date: string) => {
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