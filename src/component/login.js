import React, { Component } from "react";
import { auth, database } from "firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      display: "inline-block"
    };
  }

  loginWithGmail = e => {
    e.preventDefault();

    let provider = new auth.GoogleAuthProvider();
    auth()
      .signInWithPopup(provider)
      .then(result => {
        let additionalUserInfo = result.additionalUserInfo;
        if (additionalUserInfo.isNewUser) {
          this.addUserList(result);
          localStorage.setItem(
            "loginKey",
            JSON.stringify({
              uid: result.user.uid,
              username: additionalUserInfo.profile.given_name
            })
          );
          this.props.isLogin();
        } else {
          let userRef = database()
            .ref()
            .child("usersTable")
            .child(result.user.uid);
          userRef.once("value", snapshot => {
            var isAvailable = snapshot.val();
            if (!isAvailable) {
              this.addUserList(result);
            } else {
              userRef.update({ profile_picture: result.user.photoURL });
            }
          });
          localStorage.setItem(
            "loginKey",
            JSON.stringify({
              uid: result.user.uid,
              username: additionalUserInfo.profile.given_name
            })
          );
          this.props.isLogin();
        }
      })
      .catch(error => {
        var errorMessage = error.message;
        this.setState({ error: errorMessage });
      });
  };
  addUserList = result => {
    const rootRef = database()
      .ref()
      .child("usersTable")
      .child(result.user.uid);
    rootRef.set({
      userName: result.additionalUserInfo.profile.given_name,
      profile_picture: result.user.photoURL,
      fullName: result.user.displayName,
      email: result.user.email
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3" style={styleDiv}>
              <h3>Welcome To Chat Application</h3>
              <br />
              <button
                type="button"
                className="btn"
                onClick={this.loginWithGmail}
                style={{ display: this.state.display }}
              >
                <img
                  src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"
                  alt="signin-google"
                />
              </button>
              <br />
              <br />

              {this.state.error ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.error}
                </div>
              ) : (
                  ""
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styleDiv = {
  marginTop: "15rem",
  background: "#dfe9f7",
  borderRadius: "4px",
  padding: "15px",
  textAlign: "center"
};

export default Login;
