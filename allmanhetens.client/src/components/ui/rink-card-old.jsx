import React, { useState } from 'react';
import { Search, Clock, MapPin, Sun, Moon, GripVertical } from 'lucide-react';
import { Badge, Card, Separator, Flex, VStack, Box, Heading } from "@chakra-ui/react";

export default function RinkCardOld({ rink, index, selectedRinks })
{
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const getSessionTypeStyles = (type) => {
    switch (type) {
      case 1: return 'green';
      case 2: return 'purple';
      default: return 'yellow';
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(selectedRinks[index]);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedItem === null) return;

    const draggedIndex = selectedRinks.findIndex(rink => rink.id === draggedItem.id);
    if (draggedIndex === dropIndex) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const newSessions = [...selectedRinks];
    newSessions.splice(draggedIndex, 1);
    newSessions.splice(dropIndex, 0, draggedItem);
    /*
    setSelectedRinks(newSessions);
    setSessions(newSessions);
    */
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };


  return (
    <Card.Root
      key={rink.id}
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={(e) => handleDragOver(e, index)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, index)}
      onDragEnd={handleDragEnd}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 cursor-move transition-all duration-200 ${dragOverIndex === index ? 'ring-2 ring-blue-400 scale-105' : ''
        } ${draggedItem?.id === rink.id ? 'opacity-50' : ''} hover:shadow-lg`}
    >
      <Card.Header>
        <Flex justify="space-between">
          <Heading size="lg">
            {rink.name}
          </Heading>
          <GripVertical className="w-5 h-5 text-gray-400" />
        </Flex>
        <Flex>
          <MapPin />
          <span>{rink.address}</span>
          <span>
            {rink.distance}
          </span>
        </Flex>
      </Card.Header>
      <Card.Body>
          <Separator />
          {/* Sessions */}
          <div>
            <div>
              Today's Public Skating Sessions
            </div>
            {rink.sessions.map((session) =>
            (<VStack key={session.id}>
              <Box bg="bg" shadow="md" borderRadius="md" padding="8px" marginBottom="4px">
                <Flex>
                  <Clock className="w-5 h-5 text-blue-500" />&nbsp;{session.time}
                </Flex>
                <Badge colorPalette={`${getSessionTypeStyles(session.typeId)}`}>
                  {session.type}
                </Badge>
              </Box>
            </VStack>
            ))}
          </div>
        <Card.Description>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
}