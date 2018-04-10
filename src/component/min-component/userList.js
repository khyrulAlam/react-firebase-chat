import React, { Component } from "react";
import Notify from "../min-component/notify";


class UserList extends Component{
    constructor(props){
        super(props);
        //console.log(this.props)
        this.state = {
            noState: null,
        }
    }


    //Navigation Open close method
    closeNav = () => {
        let left = document.querySelector('.left__section');
        let rightsection = document.querySelector('.right__section');
        let cNav = document.querySelector('.closeNav');
        let oNav = document.querySelector('.openNav');
        left.style.flex = '0';
        cNav.style.display = 'none';
        oNav.style.display = 'block';
        if (window.innerWidth <= 600){
            left.style.minWidth = "0px"
            rightsection.style.minWidth = "99%";
        }
    }
    openNav = () => {
        let left = document.querySelector('.left__section');
        let rightsection = document.querySelector('.right__section');
        let cNav = document.querySelector('.closeNav');
        let oNav = document.querySelector('.openNav');
        left.style.flex = '1';
        cNav.style.display = 'block';
        oNav.style.display = 'none';
        if (window.innerWidth <= 600) {
            left.style.minWidth = "40%";
            rightsection.style.minWidth = "59%";
        }
    }

    signout = ()=>{
        localStorage.setItem('loginKey', []);
        this.props.logout()
    }

    render(){
        return(
            <div>

                <span className="openNav" onClick={this.openNav}>&#9776;</span>
                <span className="closeNav" onClick={this.closeNav}>&#9776;</span>
                <div className="userList">
                    <a
                        onClick={() => { this.props.groupChat('chatRoom'); }}>
                        Group Chat
                    </a>
                    <div style={styleDiv}>
                        {
                            this.props.usersList.map(
                                (user, i) => {
                                    if (user.uid !== this.props.uid) {
                                        return (
                                            <a 
                                                onClick={
                                                    () => { 
                                                        this.props.singleChat(user.uid);
                                                    }
                                                } 
                                                key={i}
                                            >
                                                <Notify uid={this.props.uid} person={user.uid}/>
                                                <img src={user.img} alt="avatar" width="36"/>
                                                <span>{user.name}</span>
                                            </a>
                                        )
                                    } else {
                                        return (
                                            <span key={i}></span>
                                        )
                                    }
                                }
                            )
                        }

                    </div>
                </div>

                <button className="signout" onClick={this.signout}> Signout </button>

            </div>
        )
    }


}

let styleDiv = {
    display:'grid'
}
export default UserList;