import React, { Component } from "react";
import ReactDOM from 'react-dom';
import moment from 'moment'
import { Box, Flex, Avatar, Tag, TagLabel, Text, Stack, Skeleton } from "@chakra-ui/core"
import InputBox from "./inputBox";


class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
                    w="70%"
                    h="80vh"
                    shadow="lg"
                    roundedBottomRight="md"
                    bg="gray.200"
                >
                    <Flex h="100%" position="relative">
                        <Flex flexDirection="column" p={2} w="100%" overflowY="auto" marginBottom="50px" ref={(el) => { this.messagesContainer = el; }} style={{ scrollBehavior: "smooth" }}>
                            {
                                !this.props.loadingData
                                    ?
                                    this.props.messages.sort((a, b) => new Date(a.time) - new Date(b.time)).map((conversation, i) => (
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
                                                <Tag variantColor="cyan" shadow="sm">
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
                                                <Tag variantColor="purple" shadow="sm">
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
                        {!this.props.loadingData
                            ? <InputBox
                                userName={this.props.userName}
                                userId={this.props.userId}
                                roomName={this.props.roomName}
                            />
                            : ""
                        }
                    </Flex>
                </Box>
            </React.Fragment>
        )
    }
}

export default Message;