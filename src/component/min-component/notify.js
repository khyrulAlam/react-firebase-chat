import React, { Component } from "react";
import * as firebase from 'firebase';


class Notify extends Component{
    constructor(props){
        super(props)
        //console.log(this.props.person)
        this.state = {
            uid: this.props.uid,
            personId:this.props.person,
            notify: []
        }
    }

    componentWillMount() {
        let notify = this.state.notify;
        const rootRef = firebase.database().ref('notification').child(this.state.uid);
        rootRef.on('child_added', snap => {
            notify.push({
                key: snap.key,
                count: snap.val().count
            })
            //console.log(snap.numChildren())
            this.setState({ notify: notify });
        });
        //console.log(this.state.notify)
    }


    render(){
        return(
            <span>
                {this.state.notify.map(
                    (noti,i)=> { 
                        if(this.state.personId === noti.key && noti.count>0){ 
                            return <span key={i} className="notify"> {noti.count} </span> 
                        }
                    }
                )}
            </span>
        )
    }
}



export default Notify;


