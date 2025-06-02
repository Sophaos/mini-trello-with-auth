import { useState } from "react";
import { Box, Heading, VStack, Text, Stack, Input, Button, IconButton } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { useColorModeValue } from "@/components/ui/color-mode";
import { IoMdClose } from "react-icons/io";
import { AddList } from "@/components/add-list";

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
  const [addingCardTo, setAddingCardTo] = useState<string | null>(null);
  const [newCardText, setNewCardText] = useState("");
  const [addingList, setAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  const bgColor = useColorModeValue("gray.100", "gray.700");

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "list") {
      const reorderedLists = Array.from(lists);
      const [movedList] = reorderedLists.splice(source.index, 1);
      reorderedLists.splice(destination.index, 0, movedList);
      setLists(reorderedLists);
      return;
    }

    const sourceList = lists.find((list) => list.id === source.droppableId);
    const destList = lists.find((list) => list.id === destination.droppableId);
    if (!sourceList || !destList) return;

    const draggedCard = sourceList.cards[source.index];

    if (sourceList === destList) {
      const newCards = [...sourceList.cards];
      newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, draggedCard);
      setLists(lists.map((list) => (list.id === sourceList.id ? { ...list, cards: newCards } : list)));
    } else {
      const sourceCards = [...sourceList.cards];
      const destCards = [...destList.cards];
      sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, draggedCard);
      setLists(lists.map((list) => (list.id === sourceList.id ? { ...list, cards: sourceCards } : list.id === destList.id ? { ...list, cards: destCards } : list)));
    }
  };

  const handleAddCard = (listId: string) => {
    if (!newCardText.trim()) return;
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            cards: [...list.cards, { id: `card-${Date.now()}`, content: newCardText }],
          }
        : list
    );
    setLists(updatedLists);
    setNewCardText("");
    setAddingCardTo(null);
  };

  const handleAddList = () => {
    if (!newListTitle.trim()) return;
    const newList: List = {
      id: `list-${Date.now()}`,
      title: newListTitle,
      cards: [],
    };
    setLists([...lists, newList]);
    setNewListTitle("");
    setAddingList(false);
  };

  return (
    <Box p={4} overflowX="auto" whiteSpace="nowrap">
      <Heading size="md" mb={4}>
        Your Board
      </Heading>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="list">
          {(provided) => (
            <Stack direction="row" ref={provided.innerRef} {...provided.droppableProps} align="flex-start">
              {lists.map((list, listIndex) => (
                <Draggable key={list.id} draggableId={list.id} index={listIndex}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      minW="250px"
                      bg={bgColor}
                      key={list.id}
                      p={4}
                      borderRadius="lg"
                      boxShadow="md"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <Text fontWeight="bold" mb={2}>
                        {list.title}
                      </Text>
                      <Droppable droppableId={list.id}>
                        {(provided) => (
                          <VStack ref={provided.innerRef} {...provided.droppableProps} align="stretch" minH="100px">
                            {list.cards.map((card, index) => (
                              <Draggable key={card.id} draggableId={card.id} index={index}>
                                {(provided, snapshot) => (
                                  <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} p={3} borderRadius="md" boxShadow={snapshot.isDragging ? "xl" : "sm"}>
                                    {card.content}
                                  </Box>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}

                            {addingCardTo === list.id ? (
                              <Box w="full">
                                <Input size="sm" placeholder="Enter card title" value={newCardText} onChange={(e) => setNewCardText(e.target.value)} mb={2} />
                                <Stack direction="row">
                                  <Button size="sm" colorScheme="teal" onClick={() => handleAddCard(list.id)}>
                                    Add Card
                                  </Button>
                                  <IconButton
                                    size="sm"
                                    variant={"ghost"}
                                    aria-label="Cancel"
                                    onClick={() => {
                                      setAddingCardTo(null);
                                      setNewCardText("");
                                    }}
                                  >
                                    <IoMdClose />
                                  </IconButton>
                                </Stack>
                              </Box>
                            ) : (
                              <Button size="sm" variant="ghost" onClick={() => setAddingCardTo(list.id)} alignSelf="flex-start" mt={2}>
                                Add a card
                              </Button>
                            )}
                          </VStack>
                        )}
                      </Droppable>
                    </Box>
                  )}
                </Draggable>
              ))}
              <AddList addingList={addingList} newListTitle={newListTitle} handleAddList={handleAddList} setAddingList={setAddingList} setNewListTitle={setNewListTitle} />
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};
