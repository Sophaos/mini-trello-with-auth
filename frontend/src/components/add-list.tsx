import { Box, Button, IconButton, Input, Stack } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { useColorModeValue } from "./ui/color-mode";

interface AddListProps {
  addingList: boolean;
  newListTitle: any;
  handleAddList: any;
  setAddingList: any;
  setNewListTitle: any;
}

export const AddList = ({ addingList, newListTitle, handleAddList, setAddingList, setNewListTitle }: AddListProps) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <Box minW="250px" p={4} borderRadius="lg">
      {addingList ? (
        <>
          <Input size="sm" bg={bgColor} placeholder="Enter list title" value={newListTitle} onChange={(e) => setNewListTitle(e.target.value)} mb={2} />
          <Stack direction="row">
            <Button size="sm" onClick={handleAddList}>
              Add List
            </Button>
            <IconButton
              size="sm"
              aria-label="Cancel"
              onClick={() => {
                setAddingList(false);
                setNewListTitle("");
              }}
            >
              <IoMdClose />
            </IconButton>
          </Stack>
        </>
      ) : (
        <Button size="sm" variant="ghost" onClick={() => setAddingList(true)}>
          Add another list
        </Button>
      )}
    </Box>
  );
};
