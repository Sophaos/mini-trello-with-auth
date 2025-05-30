import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import type { Board } from "@/models/board-model";

interface BoardCardProps {
  board: Board;
}

export const BoardCard = ({ board }: BoardCardProps) => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="xl"
      boxShadow="md"
      bg={useColorModeValue("white", "gray.700")}
      _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
      transition="0.2s"
      cursor="pointer"
    >
      <VStack align="start" spaceY={2}>
        <Heading size="md">{board.name}</Heading>
        {board.description && (
          <Text fontSize="sm" color="gray.500">
            {board.description}
          </Text>
        )}
      </VStack>
    </Box>
  );
};
