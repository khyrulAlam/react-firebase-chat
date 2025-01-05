import { Box, HStack, Spinner, Stack, Text } from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { User } from "@/context/Auth/types";
import { useAuth } from "@/context/Auth";
import { useChat, useChatDispatch } from "@/context/Chat";
import { ChatActionType } from "@/context/Chat/types";
import { unSubscribeDatabase } from "@/services";
import { firebaseDatabase } from "@/config";
import { onValue, ref } from "firebase/database";
import { numberFormatter } from "@/utils";

const UsersList = () => {
  const [loading, setLoading] = useState(true);
  const { user: authUser } = useAuth();
  const { chatRoomId, oneToOneRoomId } = useChat();
  const dispatch = useChatDispatch();
  const [userList, setUserList] = useState<User[] | []>([]);
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    const collectionRef = ref(firebaseDatabase, "usersTable");
    const unsubscribe = onValue(collectionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const users = Object.values(data) as User[];
        setUserCount(users.length || 0);
        // Remove duplicate users and the current user
        const uniqueUsers = users.filter(
          (user, index, self) =>
            user.uid && user.uid !== authUser?.uid && index === self.findIndex((u) => u.uid === user.uid)
        );
        setUserList(uniqueUsers);
        dispatch({
          type: ChatActionType.SET_USER_LIST,
          payload: data,
        });
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [authUser?.uid, dispatch]);

  const handleUserClick = (user: User | "chatRoom") => {
    const newChatRoomId =
      user === "chatRoom" ? "chatRoom" : `${authUser?.uid}+${user.uid}`;
    const newOneToOneRoomId =
      user !== "chatRoom" ? `${user.uid}+${authUser?.uid}` : "";

    // Unsubscribe from the database
    const roomList = [chatRoomId, oneToOneRoomId].filter(Boolean);
    unSubscribeDatabase(roomList);

    // Set the new chat room id
    dispatch({
      type: ChatActionType.SET_CHAT_ROOM_ID,
      payload: {
        chatRoomId: newChatRoomId,
        oneToOneRoomId: newOneToOneRoomId,
      },
    });
  };

  return (
    <Box
      p={2}
      flex={1}
      borderWidth={"1px"}
      borderTop={"none"}
      borderRight={"none"}
      borderBottomLeftRadius={"md"}
      className="left__section"
    >
      {loading && <Spinner />}
      {!loading && (
        <Stack gap="2">
          <HStack
            cursor={"pointer"}
            _hover={{ bg: "orange.50", color: "orange.400" }}
            bg={chatRoomId === "chatRoom" ? "orange.50" : "gray.subtle"}
            color={"orange.400"}
            borderRadius={"md"}
            title="Common Group"
            p={"2"}
            onClick={() => handleUserClick("chatRoom")}
          >
            <AvatarGroup size="sm">
              <Avatar
                name={authUser?.userName}
                src={authUser?.profile_picture}
                colorPalette={"orange"}
              />
              <Avatar colorPalette={'orange'} fallback={`+${numberFormatter.format(userCount)}`} />
            </AvatarGroup>
            <Text fontWeight="medium" textStyle={"sm"} lineClamp={1}>
              Common Group
            </Text>
          </HStack>
          {userList?.map((user) => (
            <HStack
              key={user.uid}
              cursor={"pointer"}
              bg={
                chatRoomId === `${authUser?.uid}+${user.uid}`
                  ? "orange.50"
                  : "gray.subtle"
              }
              color={
                chatRoomId === `${authUser?.uid}+${user.uid}`
                  ? "orange.400"
                  : "initial"
              }
              _hover={{ bg: "orange.50", color: "orange.400" }}
              borderRadius={"md"}
              title={user.userName}
              p={"2"}
              onClick={() => handleUserClick(user)}
            >
              <Avatar
                name={user.userName}
                size="sm"
                src={user.profile_picture}
                captionSide={"bottom"}
              />
              <Stack gap="0">
                <Text fontWeight="medium" textStyle={"sm"} lineClamp={1}>
                  {user.userName}
                </Text>
              </Stack>
            </HStack>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default UsersList;
