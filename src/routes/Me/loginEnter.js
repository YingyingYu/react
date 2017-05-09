import React,{Component} from "react";
import { Link } from 'react-router';
// 登录 组件
import Login from "../../components/Me/login";
// 登录/注册 界面 的 样式
import './loginRegisterEnter.css';

// reducer
import { createStore, applyMiddleware } from "redux";
import reducer from "./../../reducer/reducer"

import { createLogger } from 'redux-logger';

/* reducer 的 日志 */
const loggerMiddleware = createLogger()
const store = createStore(reducer, applyMiddleware(loggerMiddleware));

class LoginEnter extends Component {

    render(){
        return (
            <div>
                <div className="header">
                   <div className="navBar">
                        <Link to="/me"> &lt; </Link>
                        <div className="loginTitle"> 登录 </div>
                        <a href="#"></a>
                    </div>
                </div>
                <div className="content">
                    <Login
                        loginObj = { store.getState() }
                        onMe = { () => { store.dispatch({ type: "ME" }) } }
                        onLogin = { () => { store.dispatch({ type: "LOGIN" }) } }
                     />
                </div>
            </div>
        );
    }

}

export default LoginEnter