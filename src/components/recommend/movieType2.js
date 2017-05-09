import React,{Component} from 'react';
import { Carousel, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import { Link } from 'react-router';

import fetchJsonp from "fetch-jsonp";
// 引入 swiper 三方插件
import Swiper from 'swiper';
import './../../static/css/swiper.min.css';
// 引入 共同 的 样式
import './movieTypeCommon.css';


class MovieType2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            data: ['','','','','','','','','',''],
            initialHeight: 400,
        }
    }

    render() {

        return (
            <WingBlank
                onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    }}
            >
                <div className="subMovie">
                    <h1 className="title">{this.state.title}</h1>
                    <Link to={"/list:"+this.props.hashUrl}  className="more" >  更多  </Link>
                </div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {this.state.data.map(ii => (
                            <div className="swiper-slide">
                                <a href={"#/detail:recommend"+"-"+ii.id} key={ii} >
                                    <img
                                        src={ii.image}
                                    />
                                    <h2 className="subTitle">{ii.subTitle}</h2>
                                    <h3 className="point">评分：<span> {ii.rating} </span></h3>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
                
            </WingBlank>
        );
    }

    componentDidMount() {

        // 显示loading 
        Toast.loading('加载中...',0, () => {
            console.log ("加载完成！！！")
        });
        
        // fetch 获取数据 
        // console.log (this.props.source)
        // 数据请求 （服务器地址"http://api.douban.com/"）
        // var url = "http://api.douban.com/v2/movie/in_theaters"
        var mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 20
        })
        console.log (mySwiper)

        fetch(this.props.source)
        .then(res => res.json())
        .then(data => {
            // 数据请求下来 就将 加载隐藏
            Toast.hide()
            // 修改 state
            this.setState({
                title: data.title,
                data: [
                    {
                        id: data.subjects[0].subject.id,
                        subTitle: data.subjects[0].subject.title,
                        image: data.subjects[0].subject.images.large,
                        rating: data.subjects[0].subject.rating.average
                    },
                    {
                        id: data.subjects[1].subject.id,
                        subTitle: data.subjects[1].subject.title,
                        image: data.subjects[1].subject.images.large,
                        rating: data.subjects[1].subject.rating.average
                    },
                    {
                        id: data.subjects[2].subject.id,
                        subTitle: data.subjects[2].subject.title,
                        image: data.subjects[2].subject.images.large,
                        rating: data.subjects[2].subject.rating.average
                    },
                    {
                        id: data.subjects[3].subject.id,
                        subTitle: data.subjects[3].subject.title,
                        image: data.subjects[3].subject.images.large,
                        rating: data.subjects[3].subject.rating.average
                    },
                    {
                        id: data.subjects[4].subject.id,
                        subTitle: data.subjects[4].subject.title,
                        image: data.subjects[4].subject.images.large,
                        rating: data.subjects[4].subject.rating.average
                    },
                    {
                        id: data.subjects[5].subject.id,
                        subTitle: data.subjects[5].subject.title,
                        image: data.subjects[5].subject.images.large,
                        rating: data.subjects[5].subject.rating.average
                    },
                    {
                        id: data.subjects[6].subject.id,
                        subTitle: data.subjects[6].subject.title,
                        image: data.subjects[6].subject.images.large,
                        rating: data.subjects[6].subject.rating.average
                    },
                    {
                        id: data.subjects[7].subject.id,
                        subTitle: data.subjects[7].subject.title,
                        image: data.subjects[7].subject.images.large,
                        rating: data.subjects[7].subject.rating.average
                    },
                    {
                        id: data.subjects[8].subject.id,
                        subTitle: data.subjects[8].subject.title,
                        image: data.subjects[8].subject.images.large,
                        rating: data.subjects[8].subject.rating.average
                    },
                    {
                        id: data.subjects[9].subject.id,
                        subTitle: data.subjects[9].subject.title,
                        image: data.subjects[9].subject.images.large,
                        rating: data.subjects[9].subject.rating.average
                    }
                    
                ]
            })
        })
        .catch ( function(e){
            Toast.fail("无此资源")
        })

    }
}
export default MovieType2
