import React, { Component } from "react";
import {
    NavLink
} from 'react-router-dom';


class Single extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            animation:'none'
        }

        console.log(this.props.match.params.name);
        
    }
    render() {
        return (
            <div>
                
                <div id="main">
                    <div className="chatSection">
                        <div className="container-fluid">
                            <div className="row">
                                <div ref={(el) => { this.messagesContainer = el; }}>
                                    {this.state.messages.map(

                                        (message, i) =>
                                            <div key={i}>
                                                <div className="media">
                                                    <div className="media-left">
                                                        <a>
                                                            <img className="media-object img-circle" src="http://via.placeholder.com/50x50" alt="" />
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <h4 className="media-heading">{message.name}</h4>
                                                        <div className="single-text"> {message.msg} </div>
                                                    </div>
                                                </div>
                                            </div>

                                    )}
                                    <div className='spinner' style={{ display: this.state.animation }}>
                                        <div className='bounce1'></div>
                                        <div className='bounce2'></div>
                                        <div className='bounce3'></div>
                                    </div>
                                </div>




                                <div className="bottom-fixed-top">
                                    <div>
                                        <form>
                                            <div className="input-box">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    onChange={(e) => { this.setState({ text: e.target.value }) }}
                                                    value={this.state.text}
                                                    onFocus={this.displayBlock}
                                                    onBlur={this.displayNone}
                                                />
                                            </div>
                                            <button type="submit" className="hidden" onClick={this.pushMsg} > Submit </button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Single;