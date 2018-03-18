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
                    this.props.users.map(
                        (user, i) =>
                            <a onClick={() => { this.singleChat(user.name) }} key={i}>
                                <img src="http://i.pravatar.cc/30" alt="avatar" />
                                <span>{user.name}</span>
                            </a>
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