import { Box, Button, Flex, IconButton, Menu, Portal, Text, VStack } from "@chakra-ui/react";
import { Droppable } from "@hello-pangea/dnd";
import type { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd";
import { BoardCardItem } from "./board-card-item";
import { BoardAddCardForm } from "./board-add-card-form";
import { FiMoreHorizontal } from "react-icons/fi";

type Card = { id: string; content: string };

type Props = {
  listId: string;
  title: string;
  cards: Card[];
  bgColor: string;
  isAddingCard: boolean;
  newCardText: string;
  setNewCardText: (val: string) => void;
  onAddCard: (listId: string) => void;
  onStartAdding: (listId: string) => void;
  onCancelAdding: () => void;
  provided: {
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
  };
};

export const BoardCardList = ({ listId, title, cards, bgColor, isAddingCard, newCardText, setNewCardText, onAddCard, onStartAdding, onCancelAdding, provided }: Props) => (
  <Box
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    minW="250px"
    bg={bgColor}
    p={4}
    borderRadius="lg"
    boxShadow="md"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
  >
    <Flex justify="space-between" align="center" mb={2}>
      <Text fontWeight="bold">{title}</Text>
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton variant="ghost">
            <FiMoreHorizontal />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="delete-card">Delete list</Menu.Item>
              <Menu.Item value="add-card">Add card</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
    <Droppable droppableId={listId}>
      {(provided) => (
        <VStack ref={provided.innerRef} {...provided.droppableProps} align="stretch" minH="100px">
          {cards.map((card, i) => (
            <BoardCardItem key={card.id} card={card} index={i} />
          ))}
          {provided.placeholder}

          {isAddingCard ? (
            <BoardAddCardForm newCardText={newCardText} setNewCardText={setNewCardText} onAdd={() => onAddCard(listId)} onCancel={onCancelAdding} />
          ) : (
            <Button size="sm" variant="ghost" onClick={() => onStartAdding(listId)} alignSelf="flex-start" mt={2}>
              Add a card
            </Button>
          )}
        </VStack>
      )}
    </Droppable>
  </Box>
);
