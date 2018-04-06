import React, { Component } from 'react'
import * as firebase from 'firebase';


class UserImg extends Component{

    constructor(props){
        super(props)
        this.state = {
            userList: [],
            uid: this.props.uid
        }
    }

    componentWillMount(){
        const userList = this.state.userList;
        //User LIst fetch
        const userRef = firebase.database().ref().child('usersTable');
        userRef.on('child_added', snap => {
            userList.push({ uid: snap.key, name: snap.val().userName, img: snap.val().profile_picture })
            this.setState({ userList: userList })
            //console.log(snap.key);
        });
    }

    render(){
        return(
            <div>
                {this.state.userList.map(
                    (ul,i) => 
                    (ul.uid === this.state.uid)
                    ? <img src={ul.img} alt={ul.uid} key={i}/>
                    : ''
                )}       
            </div>
        )
    }

}



export default UserImg;