import { VStack, Card, Heading, Spinner, Text } from "@chakra-ui/react";
import RinkCardOld from "./rink-card-old";

import { useState } from "react";
import { RinkSkatingSessions } from "../../model/rink-skating-sessions";

export interface SelectedRinksListProps {
  loading: boolean;
  error: string | null;
  setLoading: any;
  setError: any;
  selectedRinks: RinkSkatingSessions[];
}
function SelectedRinksList({ loading, error, setLoading, setError, selectedRinks }: SelectedRinksListProps) {

  return (
    loading ? (
      <VStack>
        <Spinner />
        <Text>Loading...</Text>
      </VStack>
    ) : (selectedRinks && selectedRinks.length === 0) ? (
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
    ) : (
      <VStack width={"100%"}>
        {selectedRinks.map((rink, index) => (
          <RinkCardOld rink={rink} index={index} selectedRinks={selectedRinks} key={index}></RinkCardOld>
        ))}
      </VStack>
    )
  );
}

export default SelectedRinksList;