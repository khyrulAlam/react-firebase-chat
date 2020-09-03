import React, { Component } from "react";
import ReactDOM from 'react-dom';
import moment from 'moment'
import { Box, Flex, Avatar, Tag, TagLabel, Text, Stack, Skeleton } from "@chakra-ui/core"
import { database } from "firebase";
import InputBox from "./inputBox";


class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    async UNSAFE_componentWillMount() {
        //Group Chat Conversation fetch
        let messages = this.state.messages;
        const rootRef = await database().ref().child("chatRoom");
        await rootRef.on('child_added', snap => {
            messages.push({
                uid: snap.val().uid,
                time: snap.val().time,
                name: snap.val().name,
                msg: snap.val().text
            });
            this.setState({ messages });
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    //Scroll message UI-kit
    scrollToBottom = () => {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        messagesContainer.scroll(0, messagesContainer.scrollHeight);
    }

    render() {
        return (
            <React.Fragment>
                <Box
                    w="45%"
                    h="80vh"
                    shadow="lg"
                    roundedRight="md"
                    bg="gray.200"
                >
                    <Flex h="100%" position="relative">
                        <Flex flexDirection="column" p={2} w="100%" overflowY="auto" marginBottom="50px" ref={(el) => { this.messagesContainer = el; }} style={{ scrollBehavior: "smooth" }}>
                            {
                                this.state.messages.length > 0
                                    ?
                                    this.state.messages.sort((a, b) => a.time > b.time).map((conversation, i) => (
                                        conversation.uid === this.props.userId
                                            ?
                                            <Stack spacing={1} isInline marginBottom={2} key={i}>
                                                {this.props.usersList.map((user, i) =>
                                                    (user.uid === conversation.uid)
                                                        ?
                                                        <Avatar
                                                            key={i}
                                                            src={user.img}
                                                            name={conversation.name}
                                                            size="sm"
                                                        />
                                                        :
                                                        ''
                                                )}
                                                <Tag variantColor="purple" shadow="sm">
                                                    <TagLabel whiteSpace="normal" py={2}>
                                                        <Stack>
                                                            <Text>{conversation.msg}</Text>
                                                            <Text color="gray.500" fontSize={11}>
                                                                - {conversation.name} • {moment(conversation.time).fromNow()}
                                                            </Text>
                                                        </Stack>
                                                    </TagLabel>
                                                </Tag>
                                            </Stack>
                                            :
                                            <Stack spacing={1} isInline marginBottom={2} flexDirection="row-reverse" w="100%" key={i}>
                                                {this.props.usersList.map((user, i) =>
                                                    (user.uid === conversation.uid)
                                                        ?
                                                        <Avatar
                                                            key={i}
                                                            src={user.img}
                                                            name={conversation.name}
                                                            marginRight="0"
                                                            marginLeft="0.25rem"
                                                            size="sm"
                                                        />
                                                        :
                                                        ''
                                                )}
                                                <Tag variantColor="cyan" shadow="sm">
                                                    <TagLabel whiteSpace="normal" py={2} >
                                                        <Stack>
                                                            <Text>
                                                                {conversation.msg}
                                                            </Text>
                                                            <Text color="gray.500" fontSize={11}>
                                                                - {conversation.name} • {moment(conversation.time).fromNow()}
                                                            </Text>
                                                        </Stack>
                                                    </TagLabel>
                                                </Tag>
                                            </Stack>
                                    ))
                                    :
                                    <div>
                                        <Skeleton height="50px" my="10px" />
                                        <Skeleton height="50px" my="10px" />
                                        <Skeleton height="50px" my="10px" />
                                        <Skeleton height="50px" my="10px" />
                                        <Skeleton height="50px" my="10px" />
                                        <Skeleton height="50px" my="10px" />
                                        <Skeleton height="50px" my="10px" />
                                        <Skeleton height="50px" my="10px" />
                                        <Skeleton height="50px" my="10px" />
                                    </div>
                            }
                        </Flex>
                        {this.state.messages.length > 0 ? <InputBox /> : ""}
                    </Flex>
                </Box>
            </React.Fragment>
        )
    }
}

export default Message;