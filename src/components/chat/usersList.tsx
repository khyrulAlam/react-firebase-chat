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
import { DB_NAME, numberFormatter } from "@/utils";
import SearchBox from "./searchBox";

const UsersList = () => {
  const [loading, setLoading] = useState(true);
  const { user: authUser } = useAuth();
  const { chatRoomId, oneToOneRoomId } = useChat();
  const dispatch = useChatDispatch();
  const { userList: storeUserList } = useChat();
  const [userList, setUserList] = useState<User[] | []>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [startSearch, setStartSearch] = useState(false);

  useEffect(() => {
    setLoading(true);
    const collectionRef = ref(firebaseDatabase, DB_NAME.USER_TABLE);
    const unsubscribe = onValue(collectionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const users = Object.values(data) as User[];
        setUserCount(users.length || 0);
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

  const handleUserClick = (user: User | string) => {
    const newChatRoomId =
      typeof user === "string"
        ? DB_NAME.CHAT_ROOM
        : `${authUser?.uid}+${user.uid}`;
    const newOneToOneRoomId =
      typeof user !== "string" ? `${user.uid}+${authUser?.uid}` : "";

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

  const handleSearchUserList = (token: string) => {
    const sourceList = Object.values(storeUserList) as User[];
    const regex = new RegExp(token, "i");
    const result = sourceList
      .filter((user) => user.userName.toLowerCase().match(regex))
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    setUserList(result);
    setStartSearch(false);
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
          <SearchBox
            setSearch={handleSearchUserList}
            setLoading={setStartSearch}
          />
          <HStack
            cursor={"pointer"}
            _hover={{ bg: "orange.50", color: "orange.400" }}
            bg={chatRoomId === DB_NAME.CHAT_ROOM ? "orange.50" : "gray.subtle"}
            color={"orange.400"}
            borderRadius={"md"}
            title="Common Group"
            p={"2"}
            onClick={() => handleUserClick(DB_NAME.CHAT_ROOM)}
          >
            <AvatarGroup size="sm">
              <Avatar
                name={authUser?.userName}
                src={authUser?.profile_picture}
                colorPalette={"orange"}
              />
              <Avatar
                colorPalette={"orange"}
                fallback={`+${numberFormatter.format(userCount)}`}
              />
            </AvatarGroup>
            <Text fontWeight="medium" textStyle={"sm"} lineClamp={1}>
              Common Group
            </Text>
          </HStack>

          {startSearch ? (
            <Stack alignItems={"center"}>
              <Spinner />
            </Stack>
          ) : userList.length < 1 ? (
            <HStack justifyContent={"center"}>
              <Text fontWeight="medium" textStyle={"xs"}>
                No Search result found
              </Text>
            </HStack>
          ) : (
            userList?.map((user) => (
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
                <Stack gap="1" direction={"column"} align={"flex-start"}>
                  <Text fontWeight="medium" textStyle={"sm"} lineClamp={1}>
                    {user.userName}
                  </Text>
                </Stack>
              </HStack>
            ))
          )}
        </Stack>
      )}
    </Box>
  );
};

export default UsersList;
