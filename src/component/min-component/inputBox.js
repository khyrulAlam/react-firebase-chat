import React, { Component } from "react";
import { Box, Input, InputGroup, InputRightElement, Button, Text, Grid } from "@chakra-ui/core"
import { emojis } from "./emoji";
import { database } from "firebase";

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emoji: emojis,
            showEmoji: false,
            text: ""
        }
    }
    emojiToggle = () => {
        this.setState({ showEmoji: !this.state.showEmoji })
    }
    selectEmoji = (emo) => {
        let prevText = this.state.text;
        this.setState({ text: prevText + emo })
    }
    sendMessage = (event) => {
        event.preventDefault();
        if (this.state.text.trim() !== "") {
            database().ref(this.props.roomName).push().set({
                uid: this.props.userId,
                time: Date.now(),
                name: this.props.userName,
                text: this.state.text
            });
            this.setState({ text: "" })
        }
    }
    render() {
        return (
            <React.Fragment>
                <Box position="absolute" bottom="0" w="100%" h="50px" shadow="lg" borderBottomRightRadius="4px">
                    <form onSubmit={this.sendMessage} style={{ height: "100%" }}>
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
                                onFocus={() => this.setState({ showEmoji: false })}
                                onChange={(e) => { this.setState({ text: e.target.value }) }}
                                value={this.state.text}
                            />
                            <InputRightElement h="100%">
                                <Button background="none" _hover="none" onClick={this.emojiToggle}>
                                    <Text fontSize="2xl">☺</Text>
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </form>
                </Box>
                <Box
                    position="absolute"
                    bottom="50px"
                    right="0px"
                    w="50%"
                    h="200px"
                    overflowX="auto"
                    bg="white"
                    shadow="md"
                    roundedTop="md"
                    style={{ display: this.state.showEmoji ? "block" : "none" }}
                >
                    <Grid templateColumns="repeat(6, 1fr)" padding="5px" textAlign="center">
                        {this.state.emoji.map((emo, i) =>
                            <Box
                                key={i}
                                cursor="pointer"
                                onClick={() => this.selectEmoji(emo)}
                            >{emo}</Box>
                        )}
                    </Grid>
                </Box>
            </React.Fragment>
        )
    }
}

export default InputBox;