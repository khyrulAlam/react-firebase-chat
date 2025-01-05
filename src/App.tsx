import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "./context/Auth";
import ChatComponent from "./components/chat";
import Login from "./components/login";
import Banner from "./components/banner";

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Flex
        minH="svh"
        minW="svw"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <Center minH="dvh" minW="dvw">
      <Box pos="absolute" top="4" right="4">
        <ColorModeButton />
      </Box>
      {isAuthenticated ? <ChatComponent /> : <Login />}
      <Toaster />
      <Banner />
    </Center>
  );
}

export default App;
