import React, { Component } from "react";
import { connect } from "react-redux";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        phone: "",
        pass: "",
      },
    };
  }
  Login(){
    //   发请求
  }
  onchangeUser(e,attr){
    this.setState({
      ...this.user,
      [attr]:this.state.attr
    })
  }
  render() {
    return (
      <div>
        <div>
          账号：<input type="text" onClick={(e)=>this.onchangeUser(e,"phone")}/>
        </div>
        <div>
          密码：<input type="text" onClick={(e)=>this.onchangeUser(e,"pass")}/>
        </div>
        
          {/* <input >手机号：</input> */}
          <div>
             <button onClick={() => Login()}>登录</button>
          </div>
       
      </div>
    );    
  }
}
