import { Box } from "@chakra-ui/react";
import { Draggable } from "@hello-pangea/dnd";

type Props = {
  card: { id: string; content: string };
  index: number;
};

export const BoardCardItem = ({ card, index }: Props) => (
  <Draggable draggableId={card.id} index={index}>
    {(provided, snapshot) => (
      <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} p={3} borderRadius="md" boxShadow={snapshot.isDragging ? "xl" : "sm"}>
        {card.content}
      </Box>
    )}
  </Draggable>
);
