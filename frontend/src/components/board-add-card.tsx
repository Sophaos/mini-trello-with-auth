import { Box, VStack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

interface AddBoardCardProps {
  onClick?: () => void;
}

export const BoardAddCard = ({ onClick }: AddBoardCardProps) => {
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
      onClick={onClick}
    >
      <VStack spaceY={2} align="center" justify="center" h="100%">
        <Text fontWeight="medium" color="gray.500">
          Add Board
        </Text>
      </VStack>
    </Box>
  );
};
