import { lazy } from "react";
import { Flex } from "@chakra-ui/react";
const Header = lazy(() => import("./header"));
const UsersList = lazy(() => import("./usersList"));
const Message = lazy(() => import("./message"));
import { ChatProvider } from "@/context/Chat";

const ChatComponent = () => {
  return (
    <Flex direction={"column"} minW={"70%"}>
      <Header />
      <Flex minH={"80vh"} maxW={"76vw"}>
        <ChatProvider>
          <UsersList />
          <Message />
        </ChatProvider>
      </Flex>
    </Flex>
  );
};

export default ChatComponent;
