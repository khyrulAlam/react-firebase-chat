import { firebaseDatabase } from "@/config";
import { User } from "@/context/Auth/types";
import { MessageSnapshotResponse } from "@/context/Chat/types";
import { DB_NAME } from "@/utils";
import {
  child,
  get,
  limitToLast,
  off,
  query,
  ref,
  set,
  update,
} from "firebase/database";

export const addUserInfo = async (user: User) => {
  const collectionRef = ref(firebaseDatabase, DB_NAME.USER_TABLE);
  const snapshot = await child(collectionRef, user.uid);
  if (!snapshot.key) {
    set(snapshot, user);
    return true;
  }
  update(snapshot, user);
};

const fetchMessages = async (
  collectionRef: ReturnType<typeof ref>
): Promise<MessageSnapshotResponse> => {
  const snapshot = await get(query(collectionRef, limitToLast(250)));
  return snapshot.exists()
    ? (snapshot.toJSON() as MessageSnapshotResponse)
    : {};
};

export const fetchCommonRoomMessages =
  async (): Promise<MessageSnapshotResponse> => {
    const collectionRef = ref(firebaseDatabase, DB_NAME.CHAT_ROOM);
    // By default the fetch item is sorted by timestamp
    return fetchMessages(collectionRef);
  };

export const fetchOneToOneMessages = async (
  senderRoomId: string,
  receiverRoomId: string
): Promise<MessageSnapshotResponse> => {
  const senderMessages = await fetchMessages(
    ref(firebaseDatabase, senderRoomId)
  );
  const receiverMessages = await fetchMessages(
    ref(firebaseDatabase, receiverRoomId)
  );
  // Sort messages by timestamp
  const allMessages = Object.assign({}, senderMessages, receiverMessages);
  const sortedMessagesArray = Object.entries(allMessages)
    .sort(([, a], [, b]) => new Date(a.time).getTime() - new Date(b.time).getTime());
  const sortedMessages = sortedMessagesArray.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as MessageSnapshotResponse);
  return sortedMessages;
};

export const unSubscribeDatabase = (dbNames: string[]): boolean => {
  dbNames.forEach((dbName) => off(ref(firebaseDatabase, dbName)));
  return true;
};
