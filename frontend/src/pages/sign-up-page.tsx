import { Box, Button, Center, Heading, HStack, Input, Separator, Stack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { PasswordInput } from "@/components/ui/password-input";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "@/contexts/auth-provider";

export const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signUp(email, password);
      navigate("/boards");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center minH="100vh" bg={useColorModeValue("gray.100", "gray.800")} px={4}>
      <Box w="full" maxW="md" p={8} borderRadius="2xl" bg={useColorModeValue("white", "gray.600")} boxShadow="2xl">
        <Stack spaceY={6}>
          <Stack spaceY={1} textAlign="center">
            <Heading fontSize="2xl">Welcome!</Heading>
            <Text fontSize="sm" color="gray.300">
              Create your account
            </Text>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack spaceY={4}>
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <PasswordInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Stack>

            <Button type="submit" colorScheme="teal" mt={6} width="full" data-testid="button-sign-up">
              Sign Up
            </Button>
          </form>

          <Separator />

          <HStack justify="center" pt={2} spaceX={4}>
            <Text fontSize="sm">Already have an account?</Text>
            <Button variant="outline" colorScheme="teal" size="sm" onClick={() => navigate("/login")}>
              Sign in!
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Center>
  );
};
