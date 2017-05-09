import React,{Component} from "react"
import {Icon} from 'antd-mobile'
import { Link } from 'react-router'
import Banner from "../../components/Common/Banner"
import MovieType1 from "./../../components/recommend/movieType1"
import MovieType2 from "./../../components/recommend/movieType2"

import Footer from "./../../components/Common/Footer";

import './recommend.css'

class Index extends Component {
	
	render(){
		return(
			<div>
				<div className="header">
					<div className="navBar">
                        <a href="#"> 豆瓣 </a>
                        <div className="index"> 精选 </div>
                        <Link to="/search">
							<Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />
						</Link>
                    </div>
				</div>
				<div className="content">
					<Banner/>
					<MovieType1 hashUrl="one" source="v2/movie/in_theaters?start=0&count=10" />
					<MovieType1 hashUrl="two" source="v2/movie/coming_soon?start=0&count=10" />
					<MovieType2 hashUrl="three" source="v2/movie/us_box" />
					<MovieType1 hashUrl="four" source="v2/movie/top250?start=0&count=10" />
				</div>
				<div className="complete">
					<p> 已全部加载完 </p>
				</div>
				<Footer active="0" />
			</div>
		)
	}
}
export default Index