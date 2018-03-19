import React, { Component } from 'react';
import * as firebase from 'firebase';
import ReactDOM from 'react-dom';
import moment from 'moment'



//mini Components
import UserList from "./min-component/userList";


class Home extends Component {
    constructor(props) {
        super(props);
        let name =null;
        if(props.location.state){
            name = props.location.state.name
            console.log(props.location.state.name);
        }
        this.state = {
            messages: [],
            text: '',
            name:name,
            users:[],
            animation: 'none',
            dbName:'chatRoom',
        }
    }

    //React Hook
    componentWillMount() {
        let msgs = this.state.messages;
        let users = this.state.users;
        let dbName = this.state.dbName;
        //Group Chat Conversation fetch
        const rootRef = firebase.database().ref().child(dbName);
        rootRef.on('child_added', snap => {
            //msgs.push({ name: snap.val().name, msg: snap.val().msg });
            msgs.push({ time: snap.val().time, name: snap.val().name, msg: snap.val().msg });
            this.setState({ messages: msgs });
        });

        //User LIst fetch
        const userRef = firebase.database().ref().child('usersTable');
        userRef.on('child_added', snap => {
            users.push({ name: snap.val().name })
            this.setState({ users: users })
            //console.log(snap.val());

        });
        //console.log(msgs);
        
    }
    componentDidMount() {
        this.checkName();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    checkName = () => {
        if (this.state.name == null) {
            this.props.history.push('/')
        }
    }

    //Select Group Chat Option
    groupChat = (groupDB) => {
        let msggg = [];
        this.setState({ messages: [...msggg] });
        let msgs = this.state.messages;
        let dbName = groupDB;
        this.setState({ dbName: groupDB })
        const rootRef = firebase.database().ref().child(dbName);
        rootRef.on('child_added', snap => {
            msgs.push({ time: snap.val().time, name: snap.val().name, msg: snap.val().msg })

        });
        this.setState({ messages: msgs })
        console.log(msgs);  
    }
    //Select Single Person
    singleChat = (person) => {

        this.setState({ messages: [] });
        let givenDB = this.state.name + '_' + person;
        let fromDB = person + '_' + this.state.name;
        let msgs = [];
        this.setState({ dbName: givenDB });
        const rootRef = firebase.database().ref().child(givenDB);
        rootRef.on('child_added', snap => {
            if (snap.val()) {
                msgs.push({ time: snap.val().time, name: snap.val().name, msg: snap.val().msg })
                //this.setState({messages: msgs})
            }
        });
        const rootRef2 = firebase.database().ref().child(fromDB);
        rootRef2.on('child_added', snap => {
            if (snap.val()) {
                msgs.push({ time: snap.val().time, name: snap.val().name, msg: snap.val().msg })
                //this.setState({messages: msgs})
            }
        });
        this.setState({ messages: msgs })
    }
    //Sorting by time
    srotingMessageFromTime = (a, b) => {
        return a.time > b.time;
    }

    //Send Message
    pushMsg = (event) => {
        event.preventDefault();

        let name = this.state.name;
        let msg = this.state.text;
        let dbName = this.state.dbName;
        console.log(name,msg,dbName);
        // const rootRef = firebase.database().ref().child(dbName);
        // rootRef.push().set({ time: Date.now(), name: name, msg: msg });
        this.setState({ text: '' });
    }

    //Scroll message UI-kit
    scrollToBottom = () => {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        //console.log(messagesContainer.scrollHeight);
        messagesContainer.scroll(0, messagesContainer.scrollHeight);
    };

    //Navigation Open close method
    closeNav = () => {
        let left = document.querySelector('.left__section');
        let cNav = document.querySelector('.closeNav');
        let oNav = document.querySelector('.openNav');
        left.style.flex = '0';
        cNav.style.display = 'none';
        oNav.style.display = 'block';
    }
    openNav = () => {
        let left = document.querySelector('.left__section');
        let cNav = document.querySelector('.closeNav');
        let oNav = document.querySelector('.openNav');
        left.style.flex = '1';
        cNav.style.display = 'block';
        oNav.style.display = 'none';
    }

    render() {
        return (
            <div>

                <div className="main__container">
                    <div className="wrapper">
                        <div className="left__section">
                            <span className="openNav" onClick={this.openNav}>&#9776;</span>
                            <span className="closeNav" onClick={this.closeNav}>&#9776;</span>
                            <div className="userList">
                                <a
                                    onClick={() => { this.groupChat('chatRoom'); }}>
                                    Group Chat
                                </a>
                                <UserList usersList={this.state.users} user={this.state.name} singleChat={this.singleChat.bind(this)}/>
                            </div>
                        </div>
                        <div className="right__section">
                            <div className="message__box" ref={(el) => { this.messagesContainer = el; }}>
                                {this.state.messages.sort(this.srotingMessageFromTime).map(
                                    (message, i) =>
                                        {
                                        if (message.name === this.state.name){
                                                return(
                                                    <div className="msg__text" key={i}>
                                                        <img src="http://i.pravatar.cc/50?img=50" alt="avatar" />
                                                        <span>
                                                            <strong style={{ textTransform: 'capitalize', color: '#9E9E9E' }}>{message.name}</strong><br />
                                                            {message.msg}
                                                            <br />
                                                            <small style={{ color: '#9E9E9E' }}>{moment(message.time).fromNow()}</small>
                                                        </span>
                                                    </div>
                                                )
                                            }else{
                                                return(
                                                    <div className="msg__text__right" key={i}>
                                                        <img src="http://i.pravatar.cc/50" alt="avatar" />
                                                        <span>
                                                            <strong style={{ textTransform: 'capitalize', color: '#9E9E9E' }}>{message.name}</strong><br />
                                                            {message.msg}
                                                            <br/>
                                                            <small style={{ color:'#9E9E9E'}}>{moment(message.time).fromNow()}</small>
                                                        </span>
                                                    </div>
                                                )
                                            }
                                        }
                                    )
                                }

                            </div>
                            <form>
                                <div className="message__type__box">
                                    <input
                                        placeholder="Type Your Message"
                                        onChange={(e) => { this.setState({ text: e.target.value }) }}
                                        value={this.state.text}
                                    />
                                    <button type="submit" onClick={this.pushMsg} >Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}



export default Home;
