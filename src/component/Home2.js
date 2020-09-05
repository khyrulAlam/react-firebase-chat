import React, { Component } from "react";
import { Box, Flex } from "@chakra-ui/core"
import Message from "./min-component/message";
import Header from "./min-component/header";
import UsersList from "./min-component/usersList";
import { database } from "firebase";

class Home2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            userName: "",
            usersList: [],
            roomName: "chatRoom",
            messages: [],
            loadingData: true
        }
    }

    async UNSAFE_componentWillMount() {
        const cachedHits = localStorage.getItem('loginKey');
        if (cachedHits) {
            let cc = JSON.parse(cachedHits);
            let userId = cc.uid;
            let userName = cc.username;
            this.setState({ userId, userName })
        } else {
            localStorage.setItem('loginKey', []);
            // this.props.isLogout()

        }
        if (this.state.usersList.length < 1) { await this.setUsersList() }
        await this.getMessageFromRoom(this.state.roomName);
    }

    setUsersList = async (users) => {
        let userRef = await database().ref("usersTable")
        await userRef.on('value', snapshot => {
            let usersList = [];
            snapshot.forEach(snap => {
                usersList.push({
                    uid: snap.key,
                    name: snap.val().userName,
                    img: snap.val().profile_picture
                })
            })
            this.setState({ usersList })
        });
    }

    getMessageFromRoom = async (roomName) => {
        this.setState({ loadingData: true })
        let rootRef = await database().ref(roomName);
        await rootRef.once('value', snapshot => {
            let messages = [];
            snapshot.forEach(snap => {
                messages.push({
                    uid: snap.val().uid,
                    time: snap.val().time,
                    name: snap.val().name,
                    msg: snap.val().text
                });
            });
            this.setState({ messages, loadingData: false, roomName: "chatRoom" });
        });
    }

    selectUser = async (user) => {
        this.setState({ loadingData: true })
        let messages = [];
        let senderDb = `${this.state.userId}+${user.uid}`;
        let receiverDb = `${user.uid}+${this.state.userId}`;

        await database().ref(senderDb).once("value", snapshot => {
            snapshot.forEach(snap => {
                messages.push({
                    uid: snap.val().uid,
                    time: snap.val().time,
                    name: snap.val().name,
                    msg: snap.val().text,
                    key: snap.key
                })
            })
        })
        await database().ref(receiverDb).once("value", snapshot => {
            snapshot.forEach(snap => {
                messages.push({
                    uid: snap.val().uid,
                    time: snap.val().time,
                    name: snap.val().name,
                    msg: snap.val().text,
                    key: snap.key
                })
            })
            this.setState({ messages })
        })
        this.setState({ roomName: senderDb, loadingData: false });
        await this.subscribeRoom(senderDb);
        await this.subscribeRoom(receiverDb);
    }

    subscribeRoom = async (roomName) => {
        await database().ref(roomName).limitToLast(1).on("child_added", snap => {
            if (this.state.messages.filter(msg => msg.key === snap.key).length === 0) {
                let newMsg = {
                    uid: snap.val().uid,
                    time: snap.val().time,
                    name: snap.val().name,
                    msg: snap.val().text,
                    key: snap.key
                }
                this.setState({ messages: [...this.state.messages, newMsg] })
            }
        })
    }

    render() {
        return (
            < React.Fragment >
                <Box h="100vh" bg="gray.100">
                    <Flex justifyContent="center">
                        <Flex w="65%" flexDirection="column" p={6}>
                            <Header userName={this.state.userName} />
                            <Flex align="center" justifyContent="center">
                                <UsersList
                                    userId={this.state.userId}
                                    usersList={this.state.usersList}
                                    selectUser={this.selectUser}
                                    getMessageFromRoom={this.getMessageFromRoom}
                                />
                                <Message
                                    userId={this.state.userId}
                                    userName={this.state.userName}
                                    usersList={this.state.usersList}
                                    roomName={this.state.roomName}
                                    loadingData={this.state.loadingData}
                                    messages={this.state.messages}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </React.Fragment >
        )
    }
}

export default Home2;
