import React, { Component } from 'react';
import { Box, List, ListItem, Avatar, Tag, TagLabel, Skeleton, Spinner } from "@chakra-ui/core"

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
            activeItem: "chatRoom"
        }
    }

    selectUser = (user) => {
        // console.log(user)
        if (this.props.loadingData) { return }
        if (user === "chatRoom") {
            this.props.getMessageFromRoom(user)
            this.setState({ activeItem: user });
        } else {
            this.props.selectUser(user)
            this.setState({ activeItem: user.uid })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Box
                    w="30%"
                    h="80vh"
                    p={1}
                    shadow="lg"
                    overflowY="auto"
                    roundedBottomLeft="md"
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
                                <ListItem p={1} onClick={() => this.selectUser("chatRoom")}>
                                    <Tag
                                        w="100%"
                                        shadow="md"
                                        variantColor={this.state.activeItem === "chatRoom" ? "red" : "orange"}
                                        roundedRight="md"
                                        roundedLeft="full"
                                        cursor="pointer"
                                        position="relative"
                                    >
                                        <Avatar
                                            size="md"
                                            ml={-2}
                                            mr={2}
                                        />
                                        <TagLabel>Common Group</TagLabel>
                                        <Spinner
                                            position="absolute"
                                            right="0"
                                            style={{ display: this.props.loadingData && this.state.activeItem === "chatRoom" ? "block" : "none" }}
                                        />
                                    </Tag>
                                </ListItem>
                                {this.props.usersList.map(user => {
                                    return (user.uid !== this.props.userId)
                                        ?
                                        <ListItem p={1} key={user.uid} onClick={() => this.selectUser(user)}>
                                            <Tag
                                                w="100%"
                                                shadow="md"
                                                variantColor={this.state.activeItem === user.uid ? "red" : "orange"}
                                                roundedRight="md"
                                                roundedLeft="full"
                                                cursor="pointer"
                                                position="relative"
                                            >
                                                <Avatar
                                                    src={user.img}
                                                    size="md"
                                                    name={user.name}
                                                    ml={-2}
                                                    mr={2}
                                                />
                                                <TagLabel>{user.name}</TagLabel>
                                                <Spinner
                                                    position="absolute"
                                                    right="0"
                                                    style={{ display: this.props.loadingData && this.state.activeItem === user.uid ? "block" : "none" }}
                                                />
                                            </Tag>
                                        </ListItem>
                                        : ""
                                })}
                            </React.Fragment>
                        }
                    </List>
                </Box>
            </React.Fragment>
        )
    }
}

export default UsersList;