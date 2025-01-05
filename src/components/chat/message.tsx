import { Box, Flex, HStack, Spinner, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import InputBox from "./inputBox";
import { MessageSnapshotResponse } from "@/context/Chat/types";
import { useChat } from "@/context/Chat";
import { fetchCommonRoomMessages, fetchOneToOneMessages } from "@/services";
import MessageItems from "./messageItems";
import {
  limitToLast,
  ref,
  query,
  onChildAdded,
  DataSnapshot,
} from "firebase/database";
import { firebaseDatabase } from "@/config";

const Message = () => {
  const { chatRoomId, oneToOneRoomId } = useChat();
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<MessageSnapshotResponse>({});

  // Handle child added
  const handleChildAdded = (snapshot: DataSnapshot) => {
    if (!snapshot.exists() || !snapshot.key) return;
    setMessages((prev) => {
      if (prev[snapshot.key as string]) return prev;
      return { ...prev, [snapshot.key as string]: snapshot.val() };
    });
  };

  // Subscribe to room
  const subscribeToRoom = useCallback(() => {
    const collectionRef = ref(firebaseDatabase, chatRoomId);
    const limitedQuery = query(collectionRef, limitToLast(1));
    onChildAdded(limitedQuery, handleChildAdded);

    if (oneToOneRoomId) {
      const oneToOneCollectionRef = ref(firebaseDatabase, oneToOneRoomId);
      const oneToOneLimitedQuery = query(oneToOneCollectionRef, limitToLast(1));
      onChildAdded(oneToOneLimitedQuery, handleChildAdded);
    }
  }, [chatRoomId, oneToOneRoomId]);

  // Fetch messages
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const results =
      chatRoomId && oneToOneRoomId
        ? await fetchOneToOneMessages(chatRoomId, oneToOneRoomId)
        : await fetchCommonRoomMessages();
    setMessages(results);
    subscribeToRoom();
    setIsLoading(false);
  }, [chatRoomId, oneToOneRoomId, subscribeToRoom]);

  useEffect(() => {
    if (!chatRoomId) return;
    fetchData();
  }, [chatRoomId, fetchData, oneToOneRoomId]);

  return (
    <Box
      flex={3}
      borderWidth={"1px"}
      borderTop={"none"}
      borderBottomRightRadius={"md"}
      className="right__section"
    >
      <Flex direction={"column"} h={"full"}>
        <Box
          p={3}
          flex={1}
          borderBottom={"none"}
          overflowX={"hidden"}
          overflowY={"auto"}
          height={"100%"}
        >
          {/* loading */}
          {isLoading && (
            <HStack justifyContent={"center"} alignItems={"center"} h={"full"}>
              <Text textAlign={"center"} color={"gray.500"}>
                Loading messages...
              </Text>
              <Spinner />
            </HStack>
          )}
          {/* messages */}
          {!isLoading && <MessageItems messages={messages} />}
        </Box>
        {/* input */}
        <InputBox />
      </Flex>
    </Box>
  );
};

export default Message;
