import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton, Flex, Heading } from "@chakra-ui/react";
import { AllmanhetensDate }  from '../../model/allmanhetens-date'

export interface SessionsDateSelectorProps {
  currentDate: string;
  setCurrentDate: any;
}
export default function SessionsDateSelector({ currentDate, setCurrentDate }: SessionsDateSelectorProps) {

  function onChangeDateClicked(delta: number) {
    if (delta === 1 || delta === -1)
    {
      let d = new AllmanhetensDate(currentDate);
      d = d.addDays(delta);
      let s = d.toString();
      setCurrentDate(s);
    }
  }

  return (
    <Flex justify="space-between" width="100%">
      <IconButton variant="outline" aria-label="Previous date" onClick={() => onChangeDateClicked(-1)}>
      <ChevronLeft />
      </IconButton>
      <Heading>{currentDate}</Heading>
      <IconButton variant="outline" aria-label="Next date" onClick={() => onChangeDateClicked(1)}>
        <ChevronRight />
      </IconButton>
    </Flex>
  );
};

