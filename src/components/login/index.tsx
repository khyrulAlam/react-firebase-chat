import { Flex, Button, Image, Text, Card } from "@chakra-ui/react";
import { useAuthDispatch } from "@/context/Auth";
import { AuthActionEnum, User } from "@/context/Auth/types";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { firebaseAuth } from "@/config";
import { addUserInfo } from "@/services";
import { toaster } from "@/components/ui/toaster";

const Login = () => {
  const dispatch = useAuthDispatch();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(
        firebaseAuth,
        new GoogleAuthProvider()
      );
      const additionalUserInfo = getAdditionalUserInfo(result);
      const userInfo: User = {
        email: result.user.email || "",
        fullName: result.user.displayName || "",
        profile_picture: result.user.photoURL || "",
        uid: result.user.uid,
        userName: (additionalUserInfo?.profile?.given_name as string) || "",
        createdAt: new Date().getTime(),
      };

      await addUserInfo(userInfo);

      dispatch({
        type: AuthActionEnum.SET_USER,
        payload: userInfo,
      });

      toaster.create({
        title: "Success",
        description: "Login successful",
        type: "success",
      });
    } catch (error) {
      console.error("error", error);
      toaster.create({
        title: "Error",
        description: (error as Error)?.message,
        type: "error",
      });
    }
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      width={"auto"}
    >
      <Card.Root
        padding={30}
        borderRadius={10}
        width={380}
        height={400}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image src="/cat.png" alt="logo" width={"100px"} />
        <Text
          marginTop={2}
          fontWeight={600}
          fontSize="2.5rem"
          color="orange.300"
        >
          Cat Chat
        </Text>
        <Button
          marginTop={5}
          bg={"white"}
          variant={"outline"}
          paddingY={5}
          onClick={handleLogin}
        >
          <Image
            src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"
            alt="signin-google"
            width={"100%"}
          />
        </Button>
      </Card.Root>
    </Flex>
  );
};

export default Login;
