import React,{Component} from "react";
import { Link } from "react-router";
import { Toast, Button } from 'antd-mobile';

import $ from 'jquery';

import './loginRegister.css'

import successIcon from './../../static/images/comfirm.jpg'

const userName = ''
const password = ''

// 存储用户名 是一个对象 
const STORAGE_KEY = 'me'

const doubanMeStorage = {
    fetch: function () {
        const meUser = window.JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
        return meUser 
    },
    save: function (item) {
        localStorage.setItem(STORAGE_KEY, window.JSON.stringify(item))
    } 
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginObj: {
                userName: '',
                password: ''
            },
            loginTest: {
                phoneNum: '0',
                pwdNum: '0'
            }
        }
    }

    userNameChange() {
        // 手机号 正则验证
        userName = this._userNameElement.value
        // 为了 改动 input 框里面 的 value
        this.setState({
            loginObj: {
                userName: this._userNameElement.value,
                password: this.state.loginObj.password
            }
        })
        const userReg = /^1[34578]\d{9}$/g;
        // 为了下次 从第一位开始验证 （使用test 正则验证）
        userReg.lastIndex = 0

        if ( userReg.test(userName) ) {
            // 手机号匹配成功了 显示 成功的 图标
            setTimeout ( () => {
                this.setState({
                    loginTest: ({
                        phoneNum: '1',
                        pwdNum: this.state.loginTest.pwdNum
                    })
                })
            }, 0)

        }else {
            // 手机号匹配失败了 不显示 成功的 图标
            setTimeout ( () => {
                this.setState({
                    loginTest: ({
                        phoneNum: '0',
                        pwdNum: this.state.loginTest.pwdNum
                    })
                })
            }, 0)
        } 

    }

    passwordChange() {
        // 密码验证 6-12位  全是字母 或  全是数字 或 既有字母和数字
        password = this._passswordElement.value
        // 为了 改动 input 框里面 的 value
        this.setState({
            loginObj: {
                userName: this.state.loginObj.userName,
                password: this._passswordElement.value
            }
        })
        const passwordReg = /^[0-9A-Za-z]{6,12}$/g;
        // 为了下次 从第一位开始验证 （使用test 正则验证）
        passwordReg.lastIndex = 0;

        if ( passwordReg.test(password) ) {
            // 密码成功了 显示 成功 的 图标
            setTimeout ( () => {
                this.setState({
                    loginTest: ({
                        phoneNum: this.state.loginTest.phoneNum,
                        pwdNum: '1'
                    })
                })
            }, 0)

        }else {
            // 密码失败了 不显示 成功 的 图标
            setTimeout ( () => {
                this.setState({
                    loginTest: ({
                        phoneNum: this.state.loginTest.phoneNum,
                        pwdNum: '0'
                    })
                })
            }, 0)
        }  
    }

    loginHandleEvent() {
        // 通过 reducer 取得 用户名 和 密码 值
        userName = this._userNameElement.value
        password = this._passswordElement.value

        setTimeout( () => {

            // 判断 登录 的 用户名 和 密码 是否 存在
            const url = 'http://datainfo.duapp.com/shopdata/userinfo.php'
            // 从reducer里面取值   判断 用户名和密码 是否 与 reducer 里面 用户名和密码 一样吗
            // 用来筛选 在 reducer 信息里 是否 符合 所输入 的 用户名 和 密码 一样的值 就存进数组里面 

            // 使用 reducer  必须 先刷新 才能 更新 新的数据
            // console.log ( this.props.loginObj.login.loginObj )
            // console.log ( window.JSON.parse(localStorage.getItem('douban')) )
            // console.log ( userName )
            // console.log ( password )
            const loginArr = []  
            window.JSON.parse(localStorage.getItem('douban')).forEach( function (item, index) {
                if ( item.userName == userName && item.password == password ) {
                    loginArr.push(item)
                }
            })
            console.log ( loginArr )
            // 没办法 设置 不了 proxy 代理 只能 用 ajax 跨域
            if ( loginArr.length == 0 ) {
                // 遍历 reducer 里的 值 没有 在 reducer 里面  符合 用户名和密码
                userName = ''
                password = ''
                // antd-mobile 轻提示
                Toast.info('用户名或密码错误', 1);
                // 改变 state 
                this.setState({
                    loginObj: {
                        userName: userName,
                        password: password
                    },
                    loginTest: {
                        phoneNum: '0',
                        pwdNum: '0'
                    }
                })  
            }else {

                $.get("http://datainfo.duapp.com/shopdata/userinfo.php",
                    {"status":"login","userID":loginArr[0].userName,"password":loginArr[0].password},function(data){
                    
                    if ( data == "0" ) {
                        userName = ''
                        password = ''
                        Toast.info('用户名不存在', 1);
                    }
                    if ( data == "2" ) {
                        userName = ''
                        password = ''
                        Toast.info('用户名或密码错误', 1);
                    }
                    if ( data.length > 0) {
                        console.log ( this.state.loginTest.phoneNum == "1" && this.state.loginTest.pwdNum == "1" )
                        if ( this.state.loginTest.phoneNum == "1" && this.state.loginTest.pwdNum == "1" ) {
                            // 如果 已经 登录 就 不能 登录 了
                            console.log ( window.JSON.parse(localStorage.getItem('me')).userName )

                            if ( window.JSON.parse(localStorage.getItem('me')).userName == '' ) {
                                const meObj = {
                                    "userName": userName
                                }
                                // 本地存储  存 用户名
                                doubanMeStorage.save( meObj )
                                // console.log ( doubanMeStorage.fetch() )
                                // router 路由跳转
                                window.location.hash = "#/me"
                            }else {
                                // 轻提示 
                                Toast.info ( "你已经登录过了", 1 );
                            }
                            
                        }else {
                            userName = ''
                            password = ''
                            Toast.info('用户名或密码错误', 1);
                        }
                    }
                    // 改变 state 
                    this.setState({
                        loginObj: {
                            userName: userName,
                            password: password
                        },
                        loginTest: {
                            phoneNum: '0',
                            pwdNum: '0'
                        }
                    })  
                      
                }.bind(this))  
            }  
            
            }, 0)

    }

    //  个人认为 登录注册 不适合 用 redux 做 但是 为了 熟悉 redux 故只在登录使用 redux
    // 所以 我将条件设置为 只有 在 注册 过的 用户名 和 密码 才能 登录 进去
    // onMe 是用来 判断 是否已经登录过了  第一次 派发dispatch 是 默认值 那时候还没有 存 用户名 进去 第二次 派发 才取到 用户名 
    // onLogin 取得 注册 过 的 数组 （用户名 和 密码 ）
    render() {
        const { loginObj, onLogin, onMe } = this.props
        return (
            <div>
                <form 
                    className="loginIn"
                    onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                    }}  
                    autocomplete="off">
				  <div className="loginType">
				    <label className="userLabel">手 机 号:</label>
				    <input className="userName" 
                       type="text"
                       value = { this.state.loginObj.userName }
                       onBlur = { onMe }
                       onChange = { e => this.userNameChange(e) }
                       ref = { a => this._userNameElement = a }  
                       placeholder="请输入你的手机号" 
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
                       onFocus = { onLogin }
                       onChange = { e => this.passwordChange(e) }
                       ref = { a => this._passswordElement = a }  
                       placeholder="请输入你的密码" 
                       required />
                       <div className={this.state.loginTest.pwdNum == "1" ? "successIcon" : "error" }>
                        <img src={successIcon} />
                      </div>
				  </div>
                  <Button
                    onClick = {e => this.loginHandleEvent(e)} 
                    className="btn" type="primary"> 登　录 </Button>
                　{/*<button　
                    onClick = {() => {window.location.hash="#/me"}}
                    className="loginBtn"> 登　录 </button>*/}
                  <div className="registerIn">
                    <ul>
                        <li>
                            <Link to="/register">注册豆瓣</Link>
                        </li>
                        <li>|</li>
                        <li>忘记密码</li>
                    </ul>
                  </div>
                </form>
                
            </div>
        );
    }
    
} 
export default Login
