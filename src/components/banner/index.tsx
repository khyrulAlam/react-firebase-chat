import { Box, Stack } from "@chakra-ui/react";
import GitHubButton from "react-github-btn";

const Banner = () => {
  return (
    <Box p={4} pos="absolute" top="0" left="0">
      <Stack align="flex-start">
        <GitHubButton
          href="https://github.com/khyrulAlam/react-firebase-chat"
          data-color-scheme="no-preference: dark; light: light; dark: dark;"
          data-size="large"
          data-show-count="true"
          aria-label="Star khyrulAlam/react-firebase-chat on GitHub"
        >
          Star
        </GitHubButton>
        <GitHubButton
          href="https://github.com/khyrulAlam/react-firebase-chat/fork"
          data-color-scheme="no-preference: dark; light: light; dark: dark;"
          data-size="large"
          data-show-count="true"
          aria-label="Fork khyrulAlam/react-firebase-chat on GitHub"
        >
          Fork
        </GitHubButton>
      </Stack>
    </Box>
  );
};

export default Banner;
