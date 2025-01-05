/* eslint-disable react-refresh/only-export-components */
import { createContext, Dispatch, useContext, useReducer } from "react";
import { ACTION_TYPE, ChatState } from "./types";
import { chatReducer, initialState } from "./chatReducer";

const chatDispatchContext = createContext<Dispatch<ACTION_TYPE>>(() => {});
const chatContext = createContext<ChatState>(initialState);

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, dispatch] = useReducer(chatReducer, initialState);

  return (
    <chatContext.Provider value={messages}>
      <chatDispatchContext.Provider value={dispatch}>
        {children}
      </chatDispatchContext.Provider>
    </chatContext.Provider>
  );
};

const useChat = () => useContext(chatContext);
const useChatDispatch = () => useContext(chatDispatchContext);

export { ChatProvider, useChat, useChatDispatch };
