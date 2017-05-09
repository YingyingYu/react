import React,{Component} from 'react';
import { Carousel, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import { Link } from 'react-router';

// 使用 fetch 跨域请求数据
import fetchJsonp from "fetch-jsonp";
// 引入 swiper 三方插件
import Swiper from 'swiper';
import './../../static/css/swiper.min.css';
// 引入 共同 的 样式
import './movieTypeCommon.css';


class MovieType1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            data: ['','','','','','','','','','']
            // initialHeight: 400,
        }
    }

    render() {
        return (
            <WingBlank
                onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    }}>
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
                        id: data.subjects[0].id,
                        subTitle: data.subjects[0].title,
                        image: data.subjects[0].images.large,
                        rating: data.subjects[0].rating.average
                    },
                    {
                        id: data.subjects[1].id,
                        subTitle: data.subjects[1].title,
                        image: data.subjects[1].images.large,
                        rating: data.subjects[1].rating.average
                    },
                    {
                        id: data.subjects[2].id,
                        subTitle: data.subjects[2].title,
                        image: data.subjects[2].images.large,
                        rating: data.subjects[2].rating.average
                    },
                    {
                        id: data.subjects[3].id,
                        subTitle: data.subjects[3].title,
                        image: data.subjects[3].images.large,
                        rating: data.subjects[3].rating.average
                    },
                    {
                        id: data.subjects[4].id,
                        subTitle: data.subjects[4].title,
                        image: data.subjects[4].images.large,
                        rating: data.subjects[4].rating.average
                    },
                    {
                        id: data.subjects[5].id,
                        subTitle: data.subjects[5].title,
                        image: data.subjects[5].images.large,
                        rating: data.subjects[5].rating.average
                    },
                    {
                        id: data.subjects[6].id,
                        subTitle: data.subjects[6].title,
                        image: data.subjects[6].images.large,
                        rating: data.subjects[6].rating.average
                    },
                    {
                        id: data.subjects[7].id,
                        subTitle: data.subjects[7].title,
                        image: data.subjects[7].images.large,
                        rating: data.subjects[7].rating.average
                    },
                    {
                        id: data.subjects[8].id,
                        subTitle: data.subjects[8].title,
                        image: data.subjects[8].images.large,
                        rating: data.subjects[8].rating.average
                    },
                    {
                        id: data.subjects[9].id,
                        subTitle: data.subjects[9].title,
                        image: data.subjects[9].images.large,
                        rating: data.subjects[9].rating.average
                    }
                    
                ]
            })
        })
        .catch ( function(e){
            Toast.fail ("无此资源")
        })
    }
}
export default MovieType1
