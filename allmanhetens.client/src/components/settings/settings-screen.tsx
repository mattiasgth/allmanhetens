import { ColorModeButton } from './color-mode';
import RinkSelector from './rink-selector';
import { Button, VStack, Heading, Card, IconButton, Alert } from "@chakra-ui/react"
import { ArrowBigLeft } from 'lucide-react';

export interface SettingsScreenProps {
  closeScreen: () => void;
  error: any;
  setError: any;
};
function SettingsScreen({ closeScreen, error, setError }: SettingsScreenProps) {
  return (
    <VStack className="settings-screen-vstack">
      {/* Header */}
      <Heading size="3xl">
        <IconButton onClick={() => { setError(null); closeScreen(); } } variant="outline" ><ArrowBigLeft /></IconButton>Inställningar 
      </Heading>
      <Card.Root width={"100%"} bg="gray.subtle">
        <Card.Header>
          <Heading>Preferences</Heading>
        </Card.Header>
        <Card.Body>
          <div>
            Click to switch color mode: <ColorModeButton></ColorModeButton>
          </div>
        </Card.Body>
      </Card.Root>
      {error ? (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>
              {error}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      ) :
        (
          <RinkSelector setError={setError}></RinkSelector>
        )
      }
      
    </VStack>
  );
}

export default SettingsScreen;