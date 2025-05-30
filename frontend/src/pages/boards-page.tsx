import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { BoardCard } from "@/components/board-card";
import type { Board } from "@/models/board-model";

const boards: Board[] = [
  { id: "1", name: "Marketing", description: "Campaign planning" },
  { id: "2", name: "Development", description: "Feature roadmap" },
  { id: "3", name: "Personal", description: "Daily tasks" },
];

export const BoardsPage = () => {
  return (
    <>
      <Box p={6}>
        <Heading mb={6}>Owned Boards</Heading>
        <SimpleGrid columns={[1, 2, 3]} spaceX={6}>
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </SimpleGrid>
      </Box>
      <Box p={6}>
        <Heading mb={6}>Member Boards</Heading>
        <SimpleGrid columns={[1, 2, 3]} spaceX={6}>
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </SimpleGrid>
      </Box>
      <Box p={6}>
        <Heading mb={6}>Guest Boards</Heading>
        <SimpleGrid columns={[1, 2, 3]} spaceX={6}>
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};
