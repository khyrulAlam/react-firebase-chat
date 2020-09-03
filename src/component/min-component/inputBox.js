import React, { Component } from "react";
import { Box, Input, InputGroup, InputRightElement, Button, Text } from "@chakra-ui/core"

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <Box position="absolute" bottom="0" w="100%" h="50px" shadow="lg" borderBottomRightRadius="4px">
                    <InputGroup size="md" h="100%">
                        <Input
                            h="100%"
                            pr="2rem"
                            type="text"
                            placeholder="Type Your Message"
                            variant="filled"
                            borderTop="1px solid teal"
                            bg="white"
                            _focus={{ boxShadow: "none" }}
                            _hover={{ borderTop: "1px solid teal" }}
                        />
                        <InputRightElement h="100%">
                            <Button background="none" _hover="none">
                                <Text fontSize="2xl">☺</Text>
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Box>
            </React.Fragment>
        )
    }
}

export default InputBox;