import React,{Component} from "react";
import { Link } from "react-router";
import { Toast, Button } from 'antd-mobile';

import $ from 'jquery';

import './loginRegister.css'

import successIcon from './../../static/images/comfirm.jpg'

// 本地存储 存储 用户名 和 密码
const STORAGE_KEY = 'douban'
const userName = ''
const password = ''
const rePassword = ''

const doubanMovieStorage = {
    fetch: function () {
        const movies = window.JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        movies.forEach(function (item, index){
            item.id = index
        })
        return movies 
    },
    save: function (item) {
        localStorage.setItem(STORAGE_KEY, window.JSON.stringify(item))
    } 
}

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginObj: {
                userName: '',
                password: '',
                rePassword: ''
            },
            loginTest: {
                phoneNum: '0',
                pwdNum: '0',
                rePwdNum: '0'
            }
        }
    }

    userNameChange() {
        // 手机号码 验证
        userName = this._userNameElement.value;
        // console.log (this._userNameElement.value)
        // 为了 改动 input 框里面 的 value
        this.setState({ 
            loginObj: {
                userName: this._userNameElement.value,
                password: this.state.loginObj.password,
                rePassword: this.state.loginObj.rePassword
            }
        })
        const userReg = /^1[34578]\d{9}$/g;
        // 为了下次 从第一位开始验证 （使用test 正则验证）
        userReg.lastIndex = 0;
        
        if ( userReg.test(userName) ) {
            // 手机号匹配成功了 显示 成功的 图标
            setTimeout ( () => {
                this.setState({
                    loginTest: {
                        phoneNum: '1',
                        pwdNum: this.state.loginTest.pwdNum,
                        rePwdNum: this.state.loginTest.rePwdNum
                    }
                })
            }, 0)

        }else {
            // 手机号匹配失败了 不显示 成功的 图标 
            setTimeout ( () => {
                this.setState({
                    loginTest: {
                        phoneNum: '0',
                        pwdNum: this.state.loginTest.pwdNum,
                        rePwdNum: this.state.loginTest.rePwdNum
                    }
                })
            }, 0)
        }
        
    }

    passwordChange() {
        // 密码验证 6-12位  全是字母 或  全是数字 或 既有字母和数字
        // console.log(this._passwordElement.value) 
        password = this._passwordElement.value;
        // 为了 改动 input 框里面 的 value
        this.setState({ 
            loginObj: {
                userName: this.state.loginObj.userName,
                password: this._passwordElement.value,
                rePassword: this.state.loginObj.rePassword
            }
        })
        const passwordReg = /^[0-9A-Za-z]{6,12}$/g;
        // 为了下次 从第一位开始验证 （使用test 正则验证）
        passwordReg.lastIndex = 0;

        if ( passwordReg.test(password) ) {
            // 密码成功了 显示 成功 的 图标
            setTimeout ( () => {
                this.setState({
                    loginTest: {
                        phoneNum: this.state.loginTest.phoneNum,
                        pwdNum: '1',
                        rePwdNum: this.state.loginTest.rePwdNum
                    }
                })
            }, 0)

        }else {
            // 密码失败了 不显示 成功 的 图标
            setTimeout ( () => {
                this.setState({
                    loginTest: {
                        phoneNum: this.state.loginTest.phoneNum,
                        pwdNum: '0',
                        rePwdNum: this.state.loginTest.rePwdNum
                    }
                })
            }, 0)

        }
    }
    
    rePasswordChange() {
        // 再次密码 输入 验证
        rePassword = this._rePasswordElement.value;
        // 为了 改动 input 框里面 的 value
        this.setState({ 
            loginObj: {
                userName: this.state.loginObj.userName,
                password: this.state.loginObj.password,
                rePassword: this._rePasswordElement.value
            }
        })
        const rePasswordReg = /^[0-9A-Za-z]{6,12}$/g;
        // 与 密码 的值 是否一眼
        if ( rePassword == password && rePasswordReg.test(rePassword) ) {
            // 验证 密码 与 确认密码 一样 显示 成功的 图标
            setTimeout ( () => {
                this.setState({
                    loginTest: {
                        phoneNum: this.state.loginTest.phoneNum,
                        pwdNum: this.state.loginTest.pwdNum,
                        rePwdNum: '1'
                    }
                })
            }, 0)

        }else {
            // 验证 密码 与 确认密码 不一样 不显示 成功的 图标
            setTimeout ( () => {
                this.setState({
                    loginTest: {
                        phoneNum: this.state.loginTest.phoneNum,
                        pwdNum: this.state.loginTest.pwdNum,
                        rePwdNum: '0'
                    }
                })
            }, 0)

        }

    }

    registerHandleEvent() {
        // 本地存储 用户名 和 密码
        userName = this._userNameElement.value;
        password = this._passwordElement.value;
        rePassword = this._rePasswordElement.value;
        console.log (doubanMovieStorage.fetch())

        setTimeout( () => {
    
            // 判断 注册 的 用户名 和 密码 是否 存在 
            // 注册 的 地址 http://datainfo.duapp.com/shopdata/userinfo.php
            // 手机号 验证 密码 是否一样
            
            // 没办法 设置 不了 proxy 代理 只能 用 ajax 跨域
            $.get("http://datainfo.duapp.com/shopdata/userinfo.php",
                {"status":"register","userID":userName,"password":password},function(data){
                    // console.log (data)
                    // 在比较 一次  确认 用户名 密码 和 确认密码 匹配 成功 就可以 存数据了 
                    if (data == "1"){
                        if (this.state.loginTest.phoneNum == "1" && this.state.loginTest.pwdNum == "1" && this.state.loginTest.rePwdNum == "1"){
                            //注册 成功
                            var objStorage = {
                                userName: userName,
                                password: password
                            }
                            // 取 数据 从 本地存储里面
                            var arrStorage = doubanMovieStorage.fetch()
                            arrStorage.push(objStorage)
                            // 存进 本地存储里面
                            doubanMovieStorage.save(arrStorage)
                            // router 路由跳转
                            window.location.hash = "#/login"
                        }else {
                            userName = ''
                            password = ''
                            rePassword = ''
                            Toast.info('用户名或密码错误', 1);
                        }
        
                    }
                    if(data == "0") {
                        // 用户名 重名了
                        // alert("用户名或密码错误,请重新输入")
                        // antd-mobile 轻提示
                        // 将 用户名 密码 和 确认密码 置空 
                        userName = ''
                        password = ''
                        rePassword = ''
                        Toast.info('用户名重名了或是用户名和密码错误', 1);
                    }
                    if(data == "2") {
                        // 数据库报错
                        // alert("请重新刷新")
                        // antd-mobile 轻提示
                        // 将 用户名 密码 和 确认密码 置空 
                        userName = ''
                        password = ''
                        rePassword = ''
                        Toast.info('请重新刷新', 1);
                    }
                    // 改变 state 
                    this.setState({
                        loginObj: {
                            userName: userName,
                            password: password,
                            rePassword: rePassword
                        },
                        loginTest: {
                            phoneNum: '0',
                            pwdNum: '0',
                            rePwdNum: '0'
                        }
                    })

            }.bind(this))
            
        }, 0)
        
    }

    render() {
        
        return (
            <div>
                <form
                onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                }} 
                className="loginIn" 
                autocomplete="off">
				  <div className="loginType">
				    <label className="userLabel">手 机 号:</label>
				    <input className="userName"
                      type="text"
                      value = { this.state.loginObj.userName }
                      onChange = { e => this.userNameChange(e) }
                      placeholder="请输入你的手机号"
                      ref = { a => this._userNameElement = a }
                      required />
                      <div className={this.state.loginTest.phoneNum == "1" ? "successIcon" : "error" }>
                        <img src={successIcon} />
                      </div>
				  </div>
                  <div className="loginType">
				    <label className="pwdLabel">密&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
				    <input className="password" 
                      type="password"
                      value = { this.state.loginObj.password }
                      onChange = { e => this.passwordChange(e) }
                      ref = { a => this._passwordElement = a }  
                      placeholder="请输入6-12位密码" 
                      required />
                      <div className={this.state.loginTest.pwdNum == "1" ? "successIcon" : "error" }>
                        <img src={successIcon} />
                      </div>
				  </div>
                  <div className="loginType">
				    <label className="rePwdLabel">确认密码:</label>
				    <input className="rePassword"
                      type="password"
                      value = { this.state.loginObj.rePassword }
                      onChange = { e => this.rePasswordChange(e) }
                      ref = { a  => this._rePasswordElement = a }   
                      placeholder="请再次输入你的密码" 
                      required />
                      <div className={this.state.loginTest.rePwdNum == "1" ? "successIcon" : "error" }>
                        <img src={successIcon} />
                      </div>
				  </div>
                  <Button
                    onClick = {e => this.registerHandleEvent(e)} 
                    className="btn" type="primary"> 注　册 </Button>
                　{/*<button　
                    onClick = {() => {window.location.hash="#/me"}}
                    className="loginBtn"> 注　册 </button>() => {window.location.hash="#/me"}*/}
                </form>
                
            </div>
        );
    }
    
} 
export default Register

