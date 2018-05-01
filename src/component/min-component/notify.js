import React, { Component } from "react";
import * as firebase from 'firebase';


class Notify extends Component{
    constructor(props){
        super(props)
        //console.log(this.props.person)
        this.state = {
            uid: this.props.uid,
            personId:this.props.person,
            notify: null
        }
    }

    componentWillMount() {
        const rootRef = firebase.database()
        .ref().child('notification')
        .child(this.state.uid)
        .child(this.state.personId)
        .child('count');

        rootRef.on('value', snap => {
            this.setState({ notify: snap.val() });
        });
    }


    render(){
        if(this.state.notify>0){
            return (
                <span className="notify">
                    {this.state.notify}
                </span>
            )
        }else{
            return(
                <span></span>
            )
        }
    }
}



export default Notify;


