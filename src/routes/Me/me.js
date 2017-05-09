import React,{Component} from "react";
// 登录/注册 的 背景
import MeBackground from "../../components/Me/meBackground";
// tabBar
import Footer from "./../../components/Common/Footer";
// me 的 样式 css
import './me.css';

class Me extends Component{
    
	render(){
		return(
			<div>
                <div className="header">
                    <div className="navBar">
                        <a></a>
                        <div className="me"> 我的 </div>
                        <a></a>
                    </div>
				</div>
                <div className="contentMe">
                    <MeBackground />
                </div>
				<Footer active="3" />
			</div>
		)
	}
}
export default Me