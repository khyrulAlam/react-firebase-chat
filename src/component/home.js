import React, { Component } from 'react';
import * as firebase from 'firebase';
import ReactDOM from 'react-dom';



class Home extends Component {
    constructor(props) {
        super(props);
        let name =null;
        if(props.location.state){
            name = props.location.state.name
            console.log(props.location.state.name);
        }
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.checkName = this.checkName.bind(this);
        this.state = {
            messages: [],
            text: '',
            name:name,
            users:[],
            animation: 'none',
            dbName:'chatRoom',
        }
    }

    closeNav = () => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.body.style.backgroundColor = "white";
    }
    
    componentWillMount() {
        let msgs = this.state.messages;
        let users = this.state.users;
        let dbName = this.state.dbName;
        const rootRef = firebase.database().ref().child(dbName);
        rootRef.on('child_added', snap => {
            msgs.push({ name: snap.val().name, msg: snap.val().msg })
            this.setState({ messages: msgs })
        });
        const rootRef2 = firebase.database().ref().child('animation');
        //const animRef = rootRef2.child('display')
        rootRef2.on('child_added', snap => {
            this.setState({ animation: snap.val() })

        })

        const userRef = firebase.database().ref().child('usersTable');
        userRef.on('child_added',snap=>{
            users.push({name:snap.val().name})
            this.setState({users: users })
            //console.log(snap.val());
            
        })

        //this.setState({ messages: [] });
    }
    componentDidMount() {
        this.scrollToBottom();
        this.checkName();

    }
    componentDidUpdate() {
        this.scrollToBottom();
        //this.setState({ messages: [] });
    }

    checkName = () => {
        if (this.state.name == null) {
            // let name = prompt('Please Enter Your Name', '');
            // if (name == null) {
            //     this.checkName();
            // } else {
            //     this.setState({ name: name });
            // }
            this.props.history.push('/')
        }
    }
    scrollToBottom = () => {

        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        //messagesContainer.scrollTop = messagesContainer.scrollHeight;
        // const messagesContainer = document.body;
        // messagesContainer.scrollTop = messagesContainer.scrollHeight;
        // var elem = document.getElementById('yourId'); 
        // elem.scrollTop = elem.scrollHeight;
        // console.log(elem.scrollHeight);
        window.scroll(0, messagesContainer.scrollHeight);
    };
    pushMsg = (event) => {
        event.preventDefault();
        let name = this.state.name;
        let msg = this.state.text;
        let dbName = this.state.dbName;
        const rootRef = firebase.database().ref().child(dbName);
        rootRef.push().set({ name: name, msg: msg });
        this.setState({ user:this.state.name,text: '' });
        // var ScrollBox = document.getElementById('chartBox');
        // var scrollHeight = ScrollBox.offsetHeight;
        // console.log(scrollHeight);
        // scrollHeight.scrollTo(0, scrollHeight);
    }
    displayBlock = () => {
        const rootRef2 = firebase.database().ref().child('animation');
        rootRef2.push().set('block')
    }
    displayNone = () => {
        const rootRef2 = firebase.database().ref().child('animation');
        rootRef2.push().set('none')
    }
    groupChat = (groupDB)=>{
        //let blank = [];
        //this.setState({ messages:blank});
        //let rules = this.state.messages.slice();
        //rules.push('');
        //console.log(rules);
        let msggg = [];
        this.setState({messages:[...msggg]});
        let msgs = this.state.messages;
        let dbName = groupDB;
        this.setState({ dbName: groupDB })
        const rootRef = firebase.database().ref().child(dbName);
        rootRef.on('child_added', snap => {
            msgs.push({ name: snap.val().name, msg: snap.val().msg })
            
        });
        this.setState({ messages: msgs })
        console.log(msgs);
        //console.log(this.state.dbName);  
        //console.log(groupDB);  
        
    }
    singleChat = (person)=>{
        let blank = [];
        this.setState({ messages:[ ...blank] });
        // let rules = this.state.messages.slice();
        // rules.push('');
        // let name = this.state.name; 
        let msgs = this.state.messages;
        // let singleDB = name+'_'+person;
        // this.setState({ dbName: singleDB });
        // const rootRef = firebase.database().ref().child(singleDB);
        // rootRef.on('child_added', snap => {
        //     msgs.push({ name: snap.val().name, msg: snap.val().msg })
        //     this.setState({ messages: msgs })
        // });

        console.log(this.state.messages);
        console.log(this.state.dbName);
        console.log(msgs);

    }

    render() {
        //console.log(this.state.name);
        //console.log(this.state.dbName);
        //console.log(this.state.messages);
        return (
            <div>

                <div id="mySidenav" className="sidenav">
                    <div>
                    <a className="closebtn" onClick={this.closeNav}>&times;</a>
                        <a 
                            onClick={() => { this.groupChat('chatRoom');}}>
                            Group Room
                        </a>
                    {this.state.users.map(
                            (user, i) => 
                            <a onClick={() => { this.singleChat(user.name)}} key={i}>{user.name}</a>
                    )}
                    </div>
                </div>

                <div id="main">
                    <div className="chatSection">
                        <div className="container-fluid">
                            <div className="row">
                                <div ref={(el) => { this.messagesContainer = el; }}>
                                    {this.state.messages.map(

                                        (message, i) =>
                                            <div key={i}>
                                                <div className="media">
                                                    <div className="media-left">
                                                        <a>
                                                            <img className="media-object img-circle" src="http://via.placeholder.com/50x50" alt="" />
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <h4 className="media-heading">{message.name}</h4>
                                                        <div className="single-text"> {message.msg} </div>
                                                    </div>
                                                </div>
                                            </div>

                                    )}
                                    <div className='spinner' style={{ display: this.state.animation }}>
                                        <div className='bounce1'></div>
                                        <div className='bounce2'></div>
                                        <div className='bounce3'></div>
                                    </div>
                                </div>




                                <div className="bottom-fixed-top">
                                    <div>
                                        <form>
                                            <div className="input-box">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    onChange={(e) => { this.setState({ text: e.target.value }) }}
                                                    value={this.state.text}
                                                    onFocus={this.displayBlock}
                                                    onBlur={this.displayNone}
                                                />
                                            </div>
                                            <button type="submit" className="hidden" onClick={this.pushMsg} > Submit </button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}



export default Home;
