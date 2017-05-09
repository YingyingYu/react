import React,{Component} from "react";
import { List } from 'antd-mobile';

import './meBackground.css';

const Item = List.Item;
const Brief = Item.Brief;

class LoginImg extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            backImg: require('./../../static/images/classify/cartoon.png'),
            portrait: require('./../../static/images/login.png'),
            user: '您还没登录呢'
        }
    }

    loginOutHandleEvent() {
        // 退出登录
        const obj = {
            "userName": ''
        }
        localStorage.setItem("me", window.JSON.stringify(obj))
        // 退出登录  修改 还没登录 的 状态
        setTimeout( () => {
            this.setState ({
                portrait: require('./../../static/images/login.png'),
                user: '您还没登录呢'
            })

        }, 0)

    }

    render() {
       
        return (
            <div 
                className="meBackImg"
                onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                }} 
            >
                <img className="backImg" src={this.state.backImg} />
                <div 
                className="loginenter"
                onClick={() => { window.location.hash = "#/login" }}
                >
                    <div className="userPortrait" >
                        <img src={this.state.portrait} />
                    </div>
                    <p className="user"> {this.state.user} </p>
                </div>
               <List className="meItem" renderHeader={() => '左侧带图标'}>
                    <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    arrow="horizontal"
                    onClick={() => {console.log("我的评论")}}
                    >我的评论</Item>
                    <Item 
                    thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    arrow="horizontal"
                    onClick={() => {console.log("我的收藏")}}
                    >我的收藏</Item>
                </List>
                <button 
                    className="loginout"
                    type="primary"
                    onClick={e => this.loginOutHandleEvent(e) }
                > 退出登录 </button>
            </div>
        );
    }

    componentDidMount() {
        // 点击登录/注册
        // 从 本地存储里面 获取 用户名
        const meUser = window.JSON.parse( localStorage.getItem("me") ) 
        
        // console.log ( meUser.userName.length )
        // 判断  如果 登录 过了 就显示 用户名
        if ( meUser.userName.length > 0 ) {
    
            setTimeout(() => {
                this.setState({
                    portrait: require('../../static/images/user.png'),
                    user: meUser.userName
                })
            }, 0)
        }
    }

}

export default LoginImg
