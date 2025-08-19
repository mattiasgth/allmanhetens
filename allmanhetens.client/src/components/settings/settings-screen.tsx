import { ColorModeButton } from './color-mode';
import RinkSelector from './rink-selector';
import { Button, VStack, Heading, Card, IconButton } from "@chakra-ui/react"
import { ArrowBigLeft } from 'lucide-react';

export interface SettingsScreenProps {
  closeScreen: any;
};
function SettingsScreen({ closeScreen }: SettingsScreenProps) {
  return (
    <VStack className="settings-screen-vstack">
      {/* Header */}
      <Heading size="3xl">
        <IconButton onClick={closeScreen} variant="outline" ><ArrowBigLeft /></IconButton>Inställningar 
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
      <RinkSelector></RinkSelector>
    </VStack>
  );
}

export default SettingsScreen;