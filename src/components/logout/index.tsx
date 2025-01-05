import { LuLogOut } from "react-icons/lu";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "@chakra-ui/react";
import { useAuthDispatch } from "@/context/Auth";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "@/config";
import { AuthActionEnum } from "@/context/Auth/types";
import { toaster } from "../ui/toaster";

const LogoutModal = () => {
  const dispatch = useAuthDispatch();
  const logout = async () => {
    try {
      await signOut(firebaseAuth);
      dispatch({ type: AuthActionEnum.LOGOUT });
    } catch (error) {
      toaster.create({
        title: "Error",
        description: (error as Error)?.message,
        type: "error",
      });
    }
  };

  return (
    <DialogRoot role="alertdialog" placement={"center"}>
      <DialogTrigger asChild>
        <Button size={"xs"} variant={"outline"}>
          <LuLogOut />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>Are you sure you want to logout?</p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button colorPalette="red" onClick={logout}>
            Logout
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default LogoutModal;
