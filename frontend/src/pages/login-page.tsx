import { Box, Button, Center, Heading, HStack, Input, Separator, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { PasswordInput } from "@/components/ui/password-input";

export const LoginPage = () => {
  return (
    <Center minH="100vh" bg={useColorModeValue("gray.100", "gray.800")} px={4}>
      <Box w="full" maxW="md" p={8} borderRadius="2xl" bg={useColorModeValue("white", "gray.600")} boxShadow="2xl">
        <Stack spaceY={6}>
          <Stack spaceY={1} textAlign="center">
            <Heading fontSize="2xl">Welcome back!</Heading>
            <Text fontSize="sm" color="gray.300">
              Login to your account
            </Text>
          </Stack>

          <form>
            <Stack spaceY={1} textAlign="center">
              <Input placeholder="Email" />
              <PasswordInput placeholder="Password" />
            </Stack>

            <Button type="submit" colorScheme="teal" mt={6} width="full" data-testid="button-sign-in">
              Sign In
            </Button>
          </form>
          <Separator />
          <HStack justify="center" spaceY={2} pt={2} spaceX={4}>
            <Text fontSize="sm">Don’t have an account?</Text>
            <Button variant="outline" colorScheme="teal" size="sm">
              Sign up!
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Center>
  );
};
