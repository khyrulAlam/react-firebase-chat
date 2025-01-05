import { MessageSnapshotResponse } from "@/context/Chat/types";
import NoMessage from "./noMessage";
import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { useLayoutEffect, useRef } from "react";
import { useChat } from "@/context/Chat";
import { dateFormatter } from "@/utils";

interface MessageItemsProps {
  messages: MessageSnapshotResponse;
}

const MessageItems = ({ messages }: MessageItemsProps) => {
  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const { userList } = useChat();

  useLayoutEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!Object.keys(messages).length) {
    return <NoMessage />;
  }
  return Object.keys(messages)?.map((key, i) => {
    const { text, time, uid } = messages[key];
    const isLastMessage = i === Object.keys(messages).length - 1;
    return (
      <Box
        key={key}
        p={2}
        bg={"gray.muted"}
        borderRadius={"4xl"}
        mb={2}
        ref={isLastMessage ? scrollBottomRef : null}
      >
        <HStack justifyContent={"flex-start"} alignItems={"center"}>
          <Avatar
            size="sm"
            src={userList[uid]?.profile_picture || ""}
            name={userList[uid]?.userName}
            colorPalette={"orange"}
            title={userList[uid]?.userName}
          />
          <Stack gap="1">
            <HStack gap={2}>
              <Text textStyle={"sm"} fontWeight={800}>
                {userList[uid]?.userName ?? "???"}
              </Text>
              <Text textStyle={"xs"} color={"gray.500"}>
                {dateFormatter.format(new Date(time))}
              </Text>
            </HStack>
            <Text textStyle={"xs"} lineBreak={'anywhere'}>{text}</Text>
          </Stack>
        </HStack>
      </Box>
    );
  });
};

export default MessageItems;
