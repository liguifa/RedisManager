import React from "react";
import "./component.css";

export class LoginComponent extends React.Component {
    constructor(){
        super();
        this.vm = {
            username:null,
            password:null
        }
    }

    render(){
        return (
            <div className="rm-login">
                <div className="rm-login-form">
                    <h1 className="rm-login-title">Redis Manager</h1>
                    <input type="text" className='rm-input rm-login-username' placeholder="Username" onChange={this.ChangeUsername} />
                    <input type="password" className='rm-input rm-login-username' placeholder="Password" onChange={this.ChangePassword} />
                    <button className="rm-button rm-login-button" onClick={this.LoginIn}>登录</button>
                </div>
            </div>
        )
    }

    ChangeUsername(e){
        this.vm.username = e;
    }

    ChangePassword(e){
        this.vm.password = e;
    }

    LoginIn(){

    }
}