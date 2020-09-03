import React, { Component } from "react";
import { Box, Flex, List, ListItem, Avatar, Tag, TagLabel, Skeleton, Input, InputGroup, InputRightElement, Button, Text, Stack, Menu, MenuButton, MenuList, MenuItem, Image, Badge } from "@chakra-ui/core"
import { database } from "firebase";
import ReactDOM from 'react-dom';

class Home2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uuid: "",
            userName: "",
            usersList: [],
            userLoading: false,
            messages: []
        }
    }

    async UNSAFE_componentWillMount() {
        const cachedHits = localStorage.getItem('loginKey');
        if (cachedHits) {
            let cc = JSON.parse(cachedHits);
            let uid = cc.uid;
            let username = cc.username;
            this.setState({ uid: uid, name: username })
        } else {
            localStorage.setItem('loginKey', []);
            // this.props.isLogout()

        }
        let usersList = [];
        const userRef = await database().ref().child('usersTable');
        await userRef.on('child_added', snap => {
            usersList.push({
                uid: snap.key,
                name: snap.val().userName,
                img: snap.val().profile_picture
            })
            this.setState({ usersList, userLoading: true })
        });


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
        console.log(this.state)
        return (
            < React.Fragment >
                <Box h="100vh" bg="gray.100">
                    <Flex align="center" justifyContent="center" shadow="lg" bg="white">
                        <Box w="100%" p={4}>
                            <Stack isInline>
                                <Image
                                    size="35px"
                                    src="/cat.png"
                                    alt="logo"
                                />
                                <Text marginTop={2} fontWeight={600} color="orange.300">
                                    Cat Chat
                            </Text>
                            </Stack>
                        </Box>
                        <Box w="100%" p={4} display="flex" flexDirection="row-reverse">
                            <Menu>
                                <MenuButton as={Button} rightIcon="chevron-down" paddingLeft=".5rem">
                                    <Avatar size="sm" marginRight="5px"></Avatar>
                                Khayrul alam
                            </MenuButton>
                                <MenuList>
                                    <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    </Flex>
                    <Flex align="center" justifyContent="center" p={5}>
                        <Box
                            w="25%"
                            h="80vh"
                            p={1}
                            shadow="lg"
                            overflowY="auto"
                            roundedLeft="md"
                            bg="white"
                        >
                            <List spacing={0}>
                                {!this.state.userLoading
                                    ?
                                    <div>
                                        <Skeleton height="50px" my="10px" />
                                        <Skeleton height="50px" my="10px" />
                                        <Skeleton height="50px" my="10px" />
                                        <Skeleton height="50px" my="10px" />
                                        <Skeleton height="50px" my="10px" />
                                    </div>
                                    :
                                    this.state.usersList.map(user => (
                                        <ListItem p={1} key={user.uid}>
                                            <Tag variantColor="orange" shadow="md" roundedRight="md" roundedLeft="full" w="100%" cursor="pointer">
                                                <Avatar
                                                    src={user.img}
                                                    size="md"
                                                    name={user.name}
                                                    ml={-2}
                                                    mr={2}
                                                />
                                                <TagLabel>{user.name}</TagLabel>
                                            </Tag>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Box>
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
                                            this.state.messages.map((conversation, i) => (
                                                conversation.uid === this.state.uid
                                                    ?
                                                    <Stack spacing={1} isInline marginBottom={2} key={i}>
                                                        <Avatar size="sm" name={conversation.name}></Avatar>
                                                        <Tag variantColor="purple" shadow="sm">
                                                            <TagLabel whiteSpace="normal" py={2}>
                                                                <Stack>
                                                                    <Text>{conversation.msg}</Text>
                                                                    <Text color="gray.500" fontSize={11}>
                                                                        - Khayrul • 1 month ago
                                                                    </Text>
                                                                </Stack>
                                                            </TagLabel>
                                                        </Tag>
                                                    </Stack>
                                                    :
                                                    <Stack spacing={1} isInline marginBottom={2} flexDirection="row-reverse" w="100%" key={i}>
                                                        <Avatar name={conversation.name} marginRight="0" marginLeft="0.25rem" size="sm"></Avatar>
                                                        <Tag variantColor="cyan" shadow="sm">
                                                            <TagLabel whiteSpace="normal" py={2} >
                                                                <Stack>
                                                                    <Text>
                                                                        {conversation.name}
                                                                    </Text>
                                                                    <Text color="gray.500" fontSize={11}>
                                                                        - Kapil • 12 month ago
                                                                    </Text>
                                                                </Stack>
                                                            </TagLabel>
                                                        </Tag>
                                                    </Stack>
                                            ))
                                            :
                                            ""
                                    }
                                </Flex>

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
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            </React.Fragment >
        )
    }
}

export default Home2;
