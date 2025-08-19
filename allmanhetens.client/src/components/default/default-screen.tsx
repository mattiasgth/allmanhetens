  import { Alert, VStack, Heading, IconButton, Card, Button } from "@chakra-ui/react"
import SessionsDateSelector from './sessions-date-selector';
import SelectedRinksList from './selected-rinks-list';
import { Settings } from 'lucide-react';

export interface DefaultScreenProps {
  setActiveScreen: any;
  loading: boolean;
  loadSessions: any;
  currentDate: string;
  setCurrentDate: any;
  selectedRinks: any[];
  error: any;
};
function DefaultScreen({ setActiveScreen, loading, loadSessions, currentDate, setCurrentDate, selectedRinks, error }: DefaultScreenProps) {
  return (
    <VStack className="default-screen-vstack">
      {/* Header */}
      <Heading size="3xl">
        🏒 Allmänhetens <IconButton onClick={() => setActiveScreen('settings')} variant="outline"><Settings /></IconButton>
      </Heading>
      <SessionsDateSelector currentDate={currentDate} setCurrentDate={setCurrentDate} width={"100%"}></SessionsDateSelector>
      {error ?
        (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Error</Alert.Title>
              <Alert.Description>
                { error }
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        ) :
        (
          <SelectedRinksList selectedRinks={selectedRinks} loading={loading} width={"100%"}></SelectedRinksList>
        ) 
      }
    </VStack >
  );
}

export default DefaultScreen;