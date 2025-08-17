import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton, Flex } from "@chakra-ui/react";
import { AllmanhetensDate }  from '../../model/allmanhetens-date'

export default function SessionsDateSelector({ currentDate, setCurrentDate }) {

  function onChangeDateClicked(delta) {
    if (delta === 1 || delta === -1)
    {
    }
  }

  return (
    <Flex justify="space-between" maxWidth="640px">
      <IconButton variant="outline" aria-label="Previous date" onClick={() => onChangeDateClicked(-1)}>
      <ChevronLeft />
      </IconButton>
      <span>{currentDate}</span>
      <IconButton variant="outline" aria-label="Next date" onClick={() => onChangeDateClicked(1)}>
        <ChevronRight />
      </IconButton>
    </Flex>
  );
};