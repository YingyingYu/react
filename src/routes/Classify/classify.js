import React,{Component} from "react"
import {Icon} from 'antd-mobile'
import { Link } from 'react-router'
import MovieClassify from '../../components/classify/movieClassify'

import Footer from "./../../components/Common/Footer"

import './classify.css'

class Classify extends Component {

    render(){
		return(
			<div>
                <div className="header">
                    <div className="navBar">
                        <a href="#"> 豆瓣 </a>
                        <div className="classType"> 分类 </div>
                        <Link to="/search">
                            <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />
                        </Link>
                    </div>
				</div>
                <div className="content">
                    <MovieClassify />
                </div>
                <div className="complete">
					<p> 已全部加载完 </p>
				</div>
                <Footer active="1" />
			</div>
		)
	}
    
}
export default Classify