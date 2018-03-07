import React,{Component} from "react";
import {NavLink} from 'react-router-dom';

class Nav extends Component {
    openNav = () => {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
    render(){
        return(
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <span onClick={this.openNav}>&#9776; </span>
                        </div>
                        <div>
                            <ul className="nav navbar-nav">
                                <li><NavLink exact activeClassName='active' to="/">
                                    Login
                                </NavLink></li>
                                
                                <li><NavLink exact activeClassName='active' to="/home">
                                    Home
                                </NavLink></li>
                                    
                                {/*<li><NavLink exact activeClassName='active' to="/single/:name">
                                    Single
                                </NavLink></li>*/}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;