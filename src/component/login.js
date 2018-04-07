import React, { Component } from "react";
import firebase from 'firebase';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            display: 'inline-block',
        }
    }

   loginWithGmail = (e)=>{
        e.preventDefault();
    
       let provider = new firebase.auth.GoogleAuthProvider();
       firebase.auth().signInWithPopup(provider).then((result) =>{
           //console.log(result)
           let additionalUserInfo = result.additionalUserInfo;
           let user = result.user;
           if (additionalUserInfo.isNewUser){
                const uid = user.uid;
                const fullName = user.displayName;
                const userName = additionalUserInfo.profile.given_name;
                const email = user.email;
                const img = user.photoURL;
                this.addUserList(uid,fullName,userName,email,img);
               localStorage.setItem('loginKey', JSON.stringify({ uid: user.uid,username: userName}));
               this.props.isLogin()
           }else{
               localStorage.setItem('loginKey', JSON.stringify({ uid: user.uid, username: additionalUserInfo.profile.given_name }));
               this.props.isLogin()
           }
          
       }).catch( (error) =>{
           var errorMessage = error.message;
           this.setState({error:errorMessage})
       });
   }
    addUserList = (uid, fullName, userName, email, img)=>{
        const rootRef = firebase.database().ref().child('usersTable').child(uid);
        rootRef.set({
            userName: userName,
            profile_picture: img,
            fullName: fullName,
            email: email
        });
    }

    render(){
        return(
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3" style={styleDiv}>
                            <h3>Welcome To Chat Application</h3>
                            <br/>
                            <button type="button" className="btn" onClick={this.loginWithGmail} style={{display:this.state.display}}>
                                <img src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" alt="signin-google"/>
                            </button>
                            <br/>
                            <br/>

                            {(this.state.error) ? 
                                
                                <div className="alert alert-danger" role="alert">
                                    
                                    {this.state.error}
                                </div>
                            : 
                                ''
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const styleDiv = {
    marginTop: '15rem',
    background: '#dfe9f7',
    borderRadius:'4px',
    padding: '15px',
    textAlign: 'center'
}


export default Login;