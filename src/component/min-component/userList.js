import React,{ Component } from "react";


class UserList extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
        
    }

    render(){
        return(
            <div style={styleDiv}>
                
                {
                    this.props.usersList.map(
                        (user, i) =>
                            {if(user.name !== this.props.user){
                                return (
                                    <a onClick={() => { this.props.singleChat(user.name) }} key={i}>
                                        <img src="http://i.pravatar.cc/30" alt="avatar" />
                                        <span>{user.name}</span>
                                    </a>
                                )
                            }else{
                                return(
                                    <span key={i}></span>
                                )
                            }}
                    )
                }

            </div>
        )
    }


}

let styleDiv = {
    display:'grid'
}
export default UserList;