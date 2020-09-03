import React, { Component } from 'react';
import { Box, List, ListItem, Avatar, Tag, TagLabel, Skeleton } from "@chakra-ui/core"

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: ""
        }
    }

    selectUser(user) {
        console.log(user)
    }

    render() {
        return (
            <React.Fragment>
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
                        {!this.props.usersList.length > 0
                            ?
                            <div>
                                <Skeleton height="50px" my="10px" />
                                <Skeleton height="50px" my="10px" />
                                <Skeleton height="50px" my="10px" />
                                <Skeleton height="50px" my="10px" />
                                <Skeleton height="50px" my="10px" />
                                <Skeleton height="50px" my="10px" />
                                <Skeleton height="50px" my="10px" />
                                <Skeleton height="50px" my="10px" />
                            </div>
                            :
                            <React.Fragment>
                                <ListItem p={1} onClick={() => this.selectUser("group")}>
                                    <Tag
                                        w="100%"
                                        shadow="md"
                                        variantColor="orange"
                                        roundedRight="md"
                                        roundedLeft="full"
                                        cursor="pointer"
                                    >
                                        <Avatar
                                            size="md"
                                            ml={-2}
                                            mr={2}
                                        />
                                        <TagLabel>Common Group</TagLabel>
                                    </Tag>
                                </ListItem>
                                {this.props.usersList.map(user => (
                                    <ListItem p={1} key={user.uid} onClick={() => this.selectUser(user)}>
                                        <Tag
                                            w="100%"
                                            shadow="md"
                                            variantColor="orange"
                                            roundedRight="md"
                                            roundedLeft="full"
                                            cursor="pointer"
                                        >
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
                                ))}
                            </React.Fragment>
                        }
                    </List>
                </Box>
            </React.Fragment>
        )
    }
}

export default UsersList;