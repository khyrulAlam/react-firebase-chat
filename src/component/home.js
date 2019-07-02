import React, { Component } from 'react';
import * as firebase from 'firebase';
import ReactDOM from 'react-dom';
import moment from 'moment'



//mini Components
import UserList from "./min-component/userList";
import UserImg from "./min-component/userImg";
import { emojis } from "./min-component/emoji";


class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: null,
            name: null,
            usersList: [],
            messages: [],
            text: '',
            emoji:emojis,
            dbName: 'chatRoom',
        }
    }

    //React Hook
    componentWillMount() {
        const cachedHits = localStorage.getItem('loginKey');
        if(cachedHits){
            let cc = JSON.parse(cachedHits);
            let uid = cc.uid;
            let username = cc.username;
            this.setState({uid:uid,name:username})
        }else{
            localStorage.setItem('loginKey', []);
            // this.props.isLogout()
            
        }

        //End LoginInfo


        let msgs = this.state.messages;
        let usersList = this.state.usersList;
        let dbName = this.state.dbName;

        //Group Chat Conversation fetch
        const rootRef = firebase.database().ref().child(dbName);
        rootRef.on('child_added', snap => {
            msgs.push({ 
                uid:snap.val().uid,
                time: snap.val().time, 
                name: snap.val().name, 
                msg: snap.val().text
            });
            this.setState({ messages: msgs });
        });

        //User LIst fetch
        const userRef = firebase.database().ref().child('usersTable');
        userRef.on('child_added', snap => {
            usersList.push({ 
                uid: snap.key, 
                name: snap.val().userName, 
                img: snap.val().profile_picture 
            })
            this.setState({ usersList: usersList })
        });
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }

    //Select Group Chat Option
    groupChat = (groupDB) => {
        this.setState({ messages: [] });
        
        let msgs = [];
        let dbName = groupDB;
        this.setState({ dbName: groupDB })
        const rootRef = firebase.database().ref().child(dbName);
        rootRef.on('child_added', snap => {
            msgs.push({
                uid: snap.val().uid,
                time: snap.val().time, 
                name: snap.val().name, 
                msg: snap.val().text
            })
            this.setState({ messages: msgs })
        });
    }
    //Select Single Person
    singleChat = (person) => {

        this.setState({ messages: [] });

        let givenDB = this.state.uid + '+' + person;
        let fromDB = person + '+' + this.state.uid;
        let msgs = [];
        this.setState({ dbName: givenDB });
        const rootRef = firebase.database().ref().child(givenDB);
        rootRef.on('child_added', snap => {
            if (snap.val()) {
                msgs.push({
                    uid: snap.val().uid,
                    time: snap.val().time, 
                    name: snap.val().name, 
                    msg: snap.val().text 
                })
                this.setState({ messages: msgs })
            }
        });
        const rootRef2 = firebase.database().ref().child(fromDB);
        rootRef2.on('child_added', snap => {
            if (snap.val()) {
                msgs.push({
                    uid: snap.val().uid,
                    time: snap.val().time, 
                    name: snap.val().name, 
                    msg: snap.val().text 
                })
                this.setState({ messages: msgs })
            }
        });
        //console.log(givenDB);
        //console.log(fromDB);
    }
    //Send Message
    pushMsg = (event) => {
        event.preventDefault();
        let uid = this.state.uid;
        let name = this.state.name;
        let text = this.state.text;
        let dbName = this.state.dbName;

        if(text.trim() === ''){
            return
        }else{
            //notification
            if (dbName !== 'chatRoom') {
                let uidArr = dbName.split('+');
                const removeNotification = firebase.database().ref('notification').child(uid).child(uidArr[1]);
                const notification = firebase.database().ref().child('notification').child(uidArr[1]);
                notification.child(uid).once('value', snapshot => {
                    if(snapshot.val()){
                        notification.child(uid).set({
                            count: snapshot.val().count + 1
                        })
                    }else{
                        notification.child(uid).set({
                            count: 1
                        })
                    }
                })
                removeNotification.set({
                    count:0
                })
            }

            const rootRef = firebase.database().ref().child(dbName);
            rootRef.push().set({
                uid: uid,
                time: Date.now(),
                name: name,
                text: text
            });
            this.setState({ text: '' });
        }
        //console.log('message send');

    }

    //Scroll message UI-kit
    scrollToBottom = () => {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        //console.log(messagesContainer.scrollHeight);
        messagesContainer.scroll(0, messagesContainer.scrollHeight);
    }
    // emoji open
    openEmoji = ()=>{
        let emoji = document.querySelector('.emoji');
        (emoji.style.display === 'block')
            ? emoji.style.display = "none"
            : emoji.style.display = "block"
    }
    openEmojiClose = ()=>{
        let emoji = document.querySelector('.emoji');
        if(emoji.style.display === 'block'){ emoji.style.display = "none" }
    }

    pickEmoji = (emo)=>{
        let prevText = this.state.text;
        this.setState({text:prevText+emo})
    }


    //Sorting by time
    srotingMessageFromTime = (a, b) => {
        return a.time > b.time;
    }


    render() {
        return (
            <div>

                <div className="main__container">
                    <div className="wrapper">
                        <div className="left__section">
                            <UserList
                                usersList={this.state.usersList}
                                uid={this.state.uid}
                                singleChat={this.singleChat.bind(this)}
                                groupChat={this.groupChat.bind(this)}
                                logout={this.props.isLogout}
                            />
                        </div>
                        <div className="right__section">
                            <div className="message__box" ref={(el) => { this.messagesContainer = el; }}>
                                {this.state.messages.sort(this.srotingMessageFromTime).map(
                                    (message, i) => {
                                        if (message.uid === this.state.uid) {
                                            return (
                                                <div className="msg__text" key={i}>
                                                    <UserImg uid={this.state.uid}/>
                                                    <span>
                                                        <strong style={{ textTransform: 'capitalize', color: '#9E9E9E' }}>{message.name}</strong><br />
                                                        {message.msg}
                                                        <br />
                                                        <small style={{ color: '#9E9E9E' }}>{moment(message.time).fromNow()}</small>
                                                    </span>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className="msg__text__right" key={i}>
                                                    <UserImg uid={message.uid} />
                                                    <span>
                                                        <strong style={{ textTransform: 'capitalize', color: '#9E9E9E' }}>{message.name}</strong><br />
                                                        {message.msg}
                                                        <br />
                                                        <small style={{ color: '#9E9E9E' }}>{moment(message.time).fromNow()}</small>
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
                                        require="true"
                                        onFocus={this.openEmojiClose}
                                    />
                                    <span className="emojiIcon" onClick={this.openEmoji}> ☺ </span>
                                    <button type="submit" onClick={this.pushMsg} > <i className="glyphicon glyphicon-send"></i> </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="emoji">
                        {this.state.emoji.map(
                            (emo, i) =>
                                <a key={i} onClick={() => { this.pickEmoji(emo) }}> <span role="img">{emo}</span> </a>
                        )}
                    </div>
                </div>

            </div>
        )
    }
}

export default Home;
