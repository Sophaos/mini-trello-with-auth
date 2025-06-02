import { Box, Input, Stack, Button, IconButton } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";

type Props = {
  newCardText: string;
  setNewCardText: (val: string) => void;
  onAdd: () => void;
  onCancel: () => void;
};

export const BoardAddCardForm = ({ newCardText, setNewCardText, onAdd, onCancel }: Props) => (
  <Box w="full">
    <Input size="sm" placeholder="Enter card title" value={newCardText} onChange={(e) => setNewCardText(e.target.value)} mb={2} />
    <Stack direction="row">
      <Button size="sm" colorScheme="teal" onClick={onAdd}>
        Add Card
      </Button>
      <IconButton size="sm" variant="ghost" aria-label="Cancel" onClick={onCancel}>
        <IoMdClose />
      </IconButton>
    </Stack>
  </Box>
);
