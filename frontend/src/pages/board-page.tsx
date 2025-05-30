import { useState } from "react";
import { Box, Heading, VStack, Text, Stack } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { useColorModeValue } from "@/components/ui/color-mode";

type Card = {
  id: string;
  content: string;
};

type List = {
  id: string;
  title: string;
  cards: Card[];
};

const initialData: List[] = [
  {
    id: "list-1",
    title: "To Do",
    cards: [
      { id: "card-1", content: "Task 1" },
      { id: "card-2", content: "Task 2" },
    ],
  },
  {
    id: "list-2",
    title: "In Progress",
    cards: [
      { id: "card-3", content: "Task 3" },
      { id: "card-4", content: "Task 4" },
    ],
  },
];

export const BoardPage = () => {
  const [lists, setLists] = useState(initialData);
  const bgColor = useColorModeValue("gray.100", "gray.700");

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destList = lists.find((list) => list.id === destination.droppableId);
    if (!sourceList || !destList) return;

    const draggedCard = sourceList.cards[source.index];

    if (sourceList === destList) {
      // Same list
      const newCards = [...sourceList.cards];
      newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, draggedCard);
      const updatedLists = lists.map((list) => (list.id === sourceList.id ? { ...list, cards: newCards } : list));
      setLists(updatedLists);
    } else {
      // Different list
      const sourceCards = [...sourceList.cards];
      const destCards = [...destList.cards];
      sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, draggedCard);

      const updatedLists = lists.map((list) => (list.id === sourceList.id ? { ...list, cards: sourceCards } : list.id === destList.id ? { ...list, cards: destCards } : list));
      setLists(updatedLists);
    }
  };

  return (
    <Box p={4} overflowX="auto" whiteSpace="nowrap">
      <Heading size="md" mb={4}>
        Your Board
      </Heading>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Stack direction="row" spaceX={4}>
          {lists.map((list) => (
            <Box key={list.id} minW="250px" bg={bgColor} p={4} borderRadius="lg" boxShadow="md">
              <Text fontWeight="bold" mb={2}>
                {list.title}
              </Text>
              <Droppable droppableId={list.id}>
                {(provided) => (
                  <VStack ref={provided.innerRef} {...provided.droppableProps} spaceY={3} align="stretch" minH="100px">
                    {list.cards.map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided, snapshot) => (
                          <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} bg={bgColor} p={3} borderRadius="md" boxShadow={snapshot.isDragging ? "xl" : "sm"}>
                            {card.content}
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </VStack>
                )}
              </Droppable>
            </Box>
          ))}
        </Stack>
      </DragDropContext>
    </Box>
  );
};
