import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { BoardCard } from "@/components/board-card";
import type { Board } from "@/models/board-model";
import { useCreateBoardMutation } from "@/gql/graphql";
import { BoardAddCard } from "@/components/board-add-card";

const boards: Board[] = [
  { id: "1", name: "Marketing", description: "Campaign planning" },
  { id: "2", name: "Development", description: "Feature roadmap" },
  { id: "3", name: "Personal", description: "Daily tasks" },
];

export const BoardsPage = () => {
  const [createBoardMutation] = useCreateBoardMutation();

  const createBoard = async (title: string) => {
    const { data } = await createBoardMutation({
      variables: { data: { title } },
    });
    console.log(data);
  };

  return (
    <>
      <Box p={6}>
        <Heading mb={6}>Member Boards</Heading>
        <SimpleGrid columns={[1, 2, 3, 4]} spaceX={6}>
          <BoardAddCard onClick={() => console.log("hi")} />
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
