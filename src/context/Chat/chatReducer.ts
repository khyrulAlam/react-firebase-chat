import { DB_NAME } from "@/utils";
import { ACTION_TYPE, ChatState } from "./types";

export const initialState: ChatState = {
  userList: {},
  isLoading: false,
  chatRoomId: DB_NAME.CHAT_ROOM,
  oneToOneRoomId: "",
};

export const chatReducer = (state: ChatState, action: ACTION_TYPE) => {
  switch (action.type) {
    case "SET_USER_LIST":
      return {
        ...state,
        userList: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_CHAT_ROOM_ID":
      return {
        ...state,
        chatRoomId: action.payload.chatRoomId,
        oneToOneRoomId: action.payload.oneToOneRoomId,
      };
    default:
      return state;
  }
};
