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
            usersList: []
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
    }

    setUsersList = async (users) => {
        let usersList = [];
        const userRef = await database().ref().child('usersTable');
        await userRef.on('child_added', snap => {
            usersList.push({
                uid: snap.key,
                name: snap.val().userName,
                img: snap.val().profile_picture
            })
            this.setState({ usersList })
        });
    }



    render() {
        return (
            < React.Fragment >
                <Box h="100vh" bg="gray.100">
                    <Header userName={this.state.userName} />
                    <Flex align="center" justifyContent="center" p={5}>
                        <UsersList usersList={this.state.usersList} />
                        <Message userId={this.state.userId} usersList={this.state.usersList} />
                    </Flex>
                </Box>
            </React.Fragment >
        )
    }
}

export default Home2;
