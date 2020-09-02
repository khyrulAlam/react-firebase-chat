import React, { Component } from "react";
import { Box, Flex, List, ListItem, Avatar, Tag, TagLabel, Skeleton } from "@chakra-ui/core"
import { database } from "firebase"

class Home2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "Khayrul alam",
            UserId: "ASD049485",
            usersList: [],
            userLoading: false,
        }
    }

    UNSAFE_componentWillMount() {
        let usersList = [];
        const userRef = database().ref().child('usersTable');
        userRef.on('child_added', snap => {
            usersList.push({
                uid: snap.key,
                name: snap.val().userName,
                img: snap.val().profile_picture
            })
            this.setState({ usersList, userLoading: true })
        });
    }

    render() {
        return (
            <React.Fragment>
                <Flex align="center" justifyContent="center">
                    <Box w="100%" h="10vh" bg="blue.500" p={4}>Hello</Box>
                    <Box w="100%" h="10vh" bg="blue.500" p={4}>World</Box>
                </Flex>
                <Flex align="center" justifyContent="center" m={5}>
                    <Box w="25%" h="80vh" p={1} shadow="md" border="2px solid blue" overflowY="auto" roundedLeft="md">
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
                                        <Tag variantColor="red" roundedRight="md" roundedLeft="full" w="100%" cursor="pointer">
                                            <Avatar
                                                src={user.img}
                                                size="md"
                                                name={user.name}
                                                ml={-3}
                                                mr={2}
                                            />
                                            <TagLabel>{user.name}</TagLabel>
                                        </Tag>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Box>
                    <Box w="45%" h="80vh" bg="blue.500" p={4} roundedRight={4}>World</Box>
                </Flex>
            </React.Fragment>
        )
    }
}

export default Home2;
