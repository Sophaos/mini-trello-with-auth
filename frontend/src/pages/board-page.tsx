import { useState } from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { useColorModeValue } from "@/components/ui/color-mode";
import { AddList } from "@/components/board/add-list";
import { BoardCardList } from "@/components/board/board-card-list";

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
              {lists.map((list, index) => (
                <Draggable draggableId={list.id} index={index} key={list.id}>
                  {(provided) => (
                    <BoardCardList
                      listId={list.id}
                      title={list.title}
                      cards={list.cards}
                      bgColor={bgColor}
                      isAddingCard={addingCardTo === list.id}
                      newCardText={newCardText}
                      setNewCardText={setNewCardText}
                      onAddCard={handleAddCard}
                      onStartAdding={setAddingCardTo}
                      onCancelAdding={() => {
                        setAddingCardTo(null);
                        setNewCardText("");
                      }}
                      provided={provided}
                    />
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
