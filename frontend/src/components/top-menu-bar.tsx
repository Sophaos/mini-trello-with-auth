import { Avatar, Box, Button, Flex, HStack, IconButton, Menu, Portal, Spacer, Text } from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth-provider";
import { useMeQuery } from "@/gql/graphql";

export const TopMenuBar = () => {
  const { logout } = useContext(AuthContext);
  const { data: user } = useMeQuery();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} py={2} borderBottom="1px solid" borderColor={useColorModeValue("gray.300", "gray.700")} position="sticky" top={0} zIndex={10}>
      <Flex align="center">
        <HStack spaceX={3}>
          <Box bg="teal.500" color="white" px={2} py={1} borderRadius="md">
            <Text fontWeight="bold">Trello Clone</Text>
          </Box>
          <Button size="sm" variant="ghost">
            Boards
          </Button>
        </HStack>

        <Spacer />

        <HStack spaceY={2}>
          <IconButton aria-label="Notifications" variant="ghost" size="sm" />
          <IconButton aria-label="Starred Boards" variant="ghost" size="sm" />
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton variant="ghost">
                <Avatar.Root>
                  <Avatar.Fallback name={user?.me.email} />
                </Avatar.Root>
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="delete-card" onClick={() => logout()}>
                    Logout
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </HStack>
      </Flex>
    </Box>
  );
};
