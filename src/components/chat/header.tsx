import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/context/Auth";
import LogoutModal from "../logout";

const Header = () => {
  const { user } = useAuth();

  return (
    <Flex
      px={4}
      py={2}
      borderWidth={"1px"}
      borderTopRadius={"md"}
      justifyContent={"space-between"}
    >
      <Box alignContent={"center"}>
        <HStack>
          <Image src="/cat.png" alt="cat" width={"35px"} />
          <Text color={"orange.300"} fontWeight={800}>
            Cat Chat
          </Text>
        </HStack>
      </Box>

      <Box>
        <HStack borderRadius={"md"} py={1}>
          <Avatar size="sm" name={user?.fullName} src={user?.profile_picture} />
          <Text color="orange.400" textStyle="sm" fontWeight={"medium"}>
            {user?.fullName}
          </Text>
          <LogoutModal />
        </HStack>
      </Box>
    </Flex>
  );
};

export default Header;
