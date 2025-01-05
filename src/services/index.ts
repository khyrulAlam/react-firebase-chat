import { firebaseDatabase } from "@/config";
import { User } from "@/context/Auth/types";
import { child, ref, set, update } from "firebase/database";

export const addUserInfo = async (user: User) => {
    const collectionRef = ref(firebaseDatabase, "usersTable");
    const snapshot = await child(collectionRef, user.uid);
    if (!snapshot.key) {
      set(snapshot, user);
      return true;
    }
    update(snapshot, user);
  };