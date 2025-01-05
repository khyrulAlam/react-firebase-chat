import { Box, Button, Grid, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { InputGroup } from "../ui/input-group";
import { emojis } from "@/utils/emoji";
import { firebaseDatabase } from "@/config";
import { push, ref } from "firebase/database";
import { useAuth } from "@/context/Auth";
import { useChat } from "@/context/Chat";

const InputBox = () => {
  const { user } = useAuth();
  const { chatRoomId } = useChat();
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");

  const addNewMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage();
    }
  };

  const toggleEmoji = () => setShowEmoji((prev) => !prev);

  const handleEmoji = (emoji: string) => setMessage((prev) => prev + emoji);

  const sendMessage = () => {
    const collectionRef = ref(firebaseDatabase, chatRoomId);
    push(collectionRef, {
      uid: user?.uid,
      name: user?.userName,
      text: message,
      time: new Date().toISOString(),
    });
    setMessage("");
  };

  useEffect(() => {
    return () => {
      setShowEmoji(false);
      setMessage("");
    }
  }, [chatRoomId]);

  return (
    <Box p={4} pt={0} borderTop={"none"} position={"relative"}>
      {/* @todo: add emoji button */}
      <form onSubmit={addNewMessage}>
        <InputGroup
          endElement={
            <Button mx={0} px={0} background="none" onClick={toggleEmoji}>
              <Text fontSize="2xl">😀</Text>
            </Button>
          }
          width={"full"}
        >
          <Input
            placeholder="Type Your Message"
            height={"50px"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </InputGroup>
      </form>
      <Box
        position={"absolute"}
        bottom={"66px"}
        right={4}
        p={2}
        width={"240px"}
        height={"150px"}
        overflowX={"auto"}
        bg={"orange.100"}
        borderTopRadius={"md"}
        display={showEmoji ? "block" : "none"}
      >
        <Grid templateColumns="repeat(6, 1fr)" gap={4}>
          {emojis.map((emoji, index) => (
            <Text
              cursor={"pointer"}
              key={index}
              onClick={() => handleEmoji(emoji)}
            >
              {emoji}
            </Text>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default InputBox;
