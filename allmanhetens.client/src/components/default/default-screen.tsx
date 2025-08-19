  import { Box, VStack, Heading, IconButton, Card } from "@chakra-ui/react"
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
};
function DefaultScreen({ setActiveScreen, loading, loadSessions, currentDate, setCurrentDate, selectedRinks }: DefaultScreenProps) {

  return (
    <VStack className="default-screen-vstack">
      {/* Header */}
      <Heading size="3xl">
        🏒 Allmänhetens <IconButton onClick={() => setActiveScreen('settings')} variant="outline"><Settings /></IconButton>
      </Heading>
      <SessionsDateSelector currentDate={currentDate} setCurrentDate={setCurrentDate} width={"100%"}></SessionsDateSelector>
      <SelectedRinksList selectedRinks={selectedRinks} loading={loading} width={"100%"}></SelectedRinksList>
      {/* Empty State */}
      {selectedRinks && selectedRinks.length === 0 && (
        <Card.Root width="100%">
          <Card.Header>
            <Heading>
            No sessions today
            </Heading>
          </Card.Header>
          <Card.Body>
            🔍 No sessions found for this date.
          </Card.Body>
        </Card.Root>
      )}
      {/* Instructions */}
      {selectedRinks && selectedRinks.length > 0 && (
        <Box>
            💡 Drag and drop cards to prioritize your preferred skating sessions
        </Box>
      )}
    </VStack >
  );
}

export default DefaultScreen;