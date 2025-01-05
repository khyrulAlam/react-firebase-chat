import { User } from "../Auth/types";

export type IMessage = {
    name: string;
    text: string;
    time: number;
    uid: string;
    key: string;
};

export type MessageSnapshotResponse = {
    [key: string]: IMessage;
};

export type ChatState = {
    userList: {[key: string]: User};
    isLoading: boolean;
    chatRoomId: string | 'chatRoom';  
    oneToOneRoomId: string;
};

export enum ChatActionType {
    SET_USER_LIST = "SET_USER_LIST",
    SET_LOADING = "SET_LOADING",
    SET_CHAT_ROOM_ID = "SET_CHAT_ROOM_ID",
}

type SET_USER_LIST = {
    type: ChatActionType.SET_USER_LIST;
    payload: {[key: string]: User};
};

type SET_LOADING = {
    type: ChatActionType.SET_LOADING;
    payload: boolean;
};

type SET_CHAT_ROOM_ID = {
    type: ChatActionType.SET_CHAT_ROOM_ID;
    payload: {
        chatRoomId: string | 'chatRoom';
        oneToOneRoomId: string;
    };
};

export type ACTION_TYPE = SET_USER_LIST | SET_LOADING | SET_CHAT_ROOM_ID;