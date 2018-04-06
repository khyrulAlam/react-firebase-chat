import React,{ Component } from "react";


class UserList extends Component{
    constructor(props){
        super(props);
        //console.log(this.props.usersList)
        this.state = {
            noState: null,
        }
    }


    onUser = (userName)=>{
        //let noState = this.state.noState;
        //console.log(userName, noState)
    }


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

            </div>
        )
    }


}

let styleDiv = {
    display:'grid'
}
export default UserList;