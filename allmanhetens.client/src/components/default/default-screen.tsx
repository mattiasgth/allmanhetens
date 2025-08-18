import { VStack, Heading, IconButton, Card } from "@chakra-ui/react"
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
    <VStack maxWidth="480px" minWidth="480px">
      {/* Header */}
      <Heading size="3xl">
        🏒 Allmänhetens <IconButton onClick={() => setActiveScreen('settings')} variant="outline"><Settings /></IconButton>
      </Heading>
      <SessionsDateSelector currentDate={currentDate} setCurrentDate={setCurrentDate} width={"100%"}></SessionsDateSelector>
      <SelectedRinksList selectedRinks={selectedRinks} loading={loading} width={"100%"}></SelectedRinksList>
      {/* Empty State */}
      {selectedRinks && selectedRinks.length === 0 && (
        <Card.Root>
          <Card.Header>
            <div className="text-4xl">🔍</div><span className="text-gray-600 dark:text-gray-400">
              No sessions found for this date.
            </span>
          </Card.Header>
        </Card.Root>
      )}
      {/* Instructions */}
      {selectedRinks && selectedRinks.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
            💡 Drag and drop cards to prioritize your preferred skating sessions  {selectedRinks.length}
          </p>
        </div>
      )}
    </VStack >
  );
}

export default DefaultScreen;