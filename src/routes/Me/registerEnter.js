import React,{Component} from "react";

import { Link } from 'react-router';
// 注册 组件
import Register from "../../components/Me/register";
// 登录/注册 界面 的 样式
import './loginRegisterEnter.css';

class RegisterEnter extends Component {

    render(){
        return (
            <div>
                <div className="header">
                   <div className="navBar">
                        <Link to="/login"> &lt; </Link>
                        <div className="loginTitle"> 注册 </div>
                        <a href="#"></a>
                    </div>
                </div>
                <div className="content">
                    <Register />
                </div>
            </div>
        );
    }
}
export default RegisterEnter

//  antd-mobile 中 Icon 只能使用一次 
//  <Icon size="md" key="0" className="icon" type="left" />