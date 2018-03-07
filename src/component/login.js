import React, { Component } from "react";
//import { Link, Redirect } from 'react-router-dom';
import firebase from 'firebase';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: null
        }
    }

   userLogin = (e)=>{
    e.preventDefault();
    let userName = this.state.userName;
    let dbRef = firebase.database().ref('users');
    dbRef.on('value', snap => {
        if (snap.hasChild(userName)) {
            this.props.history.push({
                pathname: '/home',
                state: { name: userName }
            });
        }else{
            console.log('here');
        }
    })
    
   }

    render(){
        return(
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3" style={{ marginTop: '15rem', background:'#dfe9f7',borderRadius:'4px'}}>
                            <form style={{padding:'25px 20px'}}>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input 
                                        type="text" 
                                        onChange={(e)=>{this.setState({userName:e.target.value}) }} 
                                        className="form-control" placeholder="Email" 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Password" />
                                </div>
                                <button onClick={this.userLogin} className="btn btn-default">Submit</button>
                                
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Login;