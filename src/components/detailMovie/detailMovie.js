import React,{ Component } from "react";
import { Link, Toast } from 'antd-mobile';

// 使用 fetch 跨域请求数据
import fetchJsonp from 'fetch-jsonp';
// 引入 swiper 三方插件
import Swiper from 'swiper';
import './../../static/css/swiper.min.css';

import './detailMovie.css'

// console.log ( Swiper )

class DetailMovie extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            data: { title: '', original_title: '', year: '', wish_count: '', ratings_count: '', summary: '', aka: [], genres: [], images: {}, countries: [], directors: [], casts: [] }
        }
    }

    render() {
        // 为什么 全部数据请求的data数据 请求images中的 large 请求不到 必须 把图片数据存在state里面 才能取到
        // 由于第一次 先 render 再来 将 数据请求到 所以 没取到值之前 执行map 自然就错了
        const genresStr = ''
        const countriesStr = ''
        const  directorsLen = this.state.data.directors.length
        const arr = this.state.data.directors.concat( this.state.data.casts )
        console.log ( arr )
        const hashName = window.location.hash.split(":")[1].split("?")[0].split("-")[0]
        const idName = window.location.hash.split(":")[1].split("?")[0].split("-")[1]

        return(
           <div
                style={{
                    padding: '.4rem'
                }}
                onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    }}>
                <div
                    style= {{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <div
                        style={{
                            width: '3.8rem'
                        }}>
                        <p
                            style={{
                                fontSize: '.4rem',
                                fontFamily: 'cursive',
                                fontWeight: 'bold'
                            }}>
                            {this.state.data.title}
                        </p>
                        <p
                            style={{
                                fontSize: '.2rem',
                                fontFamily: 'cursive',
                                fontWeight: 'bold',
                                color: '#9b9b9b',
                                marginTop: '.1rem',
                                marginLeft: '.03rem',
                                lineHeight: '.3rem'
                            }}>
                            { this.state.data.year }{ this.state.data.genres.map (function (item){ return genresStr+" / "+item }) }
                        </p>
                        <p
                            style={{
                                fontSize: '.2rem',
                                fontFamily: 'cursive',
                                fontWeight: 'bold',
                                color: '#9b9b9b',
                                marginLeft: '.03rem',
                                lineHeight: '.3rem'
                            }}>
                            原名: { this.state.data.original_title}
                        </p>
                        <p
                            style={{
                                fontSize: '.2rem',
                                fontFamily: 'cursive',
                                fontWeight: 'bold',
                                color: '#9b9b9b',
                                marginLeft: '.03rem',
                                lineHeight: '.3rem'
                            }}>
                            别名: { this.state.data.aka.map (function (item, index) { return item+" / " }) }
                        </p>
                        <p
                            style={{
                                fontSize: '.2rem',
                                fontFamily: 'cursive',
                                fontWeight: 'bold',
                                color: '#9b9b9b',
                                marginLeft: '.03rem',
                                lineHeight: '.3rem'
                            }}>
                            上映时间: { this.state.data.year }({ this.state.data.countries.map (function (item, index) { return index===0 ? countriesStr+item : countriesStr+" / "+item })})
                        </p>
                    </div>
                    <div
                        style={{ 
                            width: '1.6rem', 
                            height: '2.2rem'
                         }}
                    >
                        <img src={ this.state.data.images.large }
                            style={{
                                border: '1px solid #ccc'
                            }}
                         />
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '.6rem',
                        marginBottom: '.7rem'
                    }}
                >
                    <div
                        style={{
                            width: '2.6rem',
                            height: '.6rem',
                            border: '1px solid #ffaf34',
                            borderRadius: '.2rem',
                            fontSize: '.25rem',
                            fontFamily: 'cursive',
                            lineHeight: '.6rem',
                            textAlign: 'center',
                            color: '#ffaf34'
                        }}
                    >
                        { this.state.data.wish_count } 想看
                    </div>
                    <div
                        style={{
                            width: '2.6rem',
                            height: '.6rem',
                            border: '1px solid #ffaf34',
                            borderRadius: '.2rem',
                            fontSize: '.25rem',
                            fontFamily: 'cursive',
                            lineHeight: '.6rem',
                            textAlign: 'center',
                            color: '#ffaf34'
                        }}
                    >   
                        { this.state.data.ratings_count } 看过
                    </div>
                </div>
                <div
                    style={{
                        marginBottom: '.8rem'
                    }}
                >
                    <dl>
                        <dt
                            style={{
                                fontSize: '.24rem',
                                fontFamily: 'cursive',
                                color: '#9b9b9b',
                            }}
                        >
                            简介
                        </dt>
                        <dd
                            style={{
                                fontSize: '.26rem',
                                fontFamily: 'cursive',
                                lineHeight: '.42rem',
                                color: '#000',
                                marginTop: '.22rem'
                            }}
                        >
                            { this.state.data.summary }
                        </dd>
                    </dl>
                </div>
                <div>
                    <div className="swiper-container"
                        style={{
                            height: '3rem'
                        }}
                    >
                        <div className="swiper-wrapper">
                            { this.state.data.directors.concat( this.state.data.casts ).map (function (item, index) {
                                return  index < directorsLen ? <div className="swiper-slide"
                                            onClick = { item.id===null ? () => Toast.fail("无此资源") : () => window.location.hash="#/list:detail-"+item.name+"-"+hashName+"-"+idName }
                                            style={{
                                                width: '1.6rem',
                                                height: '2.2rem',
                                                
                                            }}
                                        >
                                            <img src={ item.avatars===null ? 'http://img7.doubanio.com/f/movie/30c6263b6db26d055cbbe73fe653e29014142ea3/pics/movie/movie_default_large.png' : item.avatars.large }
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    border: '1px solid #ccc'
                                                }}
                                             />
                                             <p
                                                style={{
                                                    fontSize: '.2rem',
                                                    fontFamily: 'cursive',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowarp',
                                                    overflow: 'hidden',
                                                    lineHeight: '.35rem',
                                                    textAlign: 'center'
                                                }}
                                             > { item.name } </p>
                                             <p
                                                style={{
                                                    fontSize: '.2rem',
                                                    fontFamily: 'cursive',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowarp',
                                                    overflow: 'hidden',
                                                    lineHeight: '.35rem',
                                                    textAlign: 'center',
                                                    color: '#9d9f9e'
                                                }}
                                             > 导演 </p>
                                        </div> 
                                        : <div className="swiper-slide"
                                            onClick = {  item.id===null ? () => Toast.fail("无此资源") : () => window.location.hash="#/list:detail-"+item.name+"-"+hashName+"-"+idName }
                                            style={{
                                                width: '1.6rem',
                                                height: '2.2rem'
                                            }}
                                        >
                                            <img src={ item.avatars===null ? 'http://img7.doubanio.com/f/movie/30c6263b6db26d055cbbe73fe653e29014142ea3/pics/movie/movie_default_large.png' : item.avatars.large }
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    border: '1px solid #ccc'
                                                }}
                                             />

                                             <p
                                                style={{
                                                    fontSize: '.2rem',
                                                    fontFamily: 'cursive',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowarp',
                                                    overflow: 'hidden',
                                                    lineHeight: '.35rem',
                                                    textAlign: 'center'
                                                }}
                                             > { item.name } </p>
                                             <p
                                                style={{
                                                    fontSize: '.2rem',
                                                    fontFamily: 'cursive',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowarp',
                                                    overflow: 'hidden',
                                                    lineHeight: '.35rem',
                                                    textAlign: 'center',
                                                    color: '#9d9f9e'
                                                }}
                                             > 演员 </p>
                                        </div>
                            }) }
                        </div>
                    </div>
                </div>
           </div> 
        );
    }

    componentDidMount() {

        // 显示loading 
        Toast.loading('加载中...',0, () => {
            console.log ("加载完成！！！")
        });

        var mySwiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 20
        })
        console.log (mySwiper)

        // 从地址栏上 获取 hash值 的 id
        const hashName = window.location.hash.split(":")[1].split("?")[0].split("-")[1]
        console.log ( hashName )
        // fetch 获取数据
        // 数据请求 （服务器地址"http://api.douban.com/"）
        fetch(`v2/movie/subject/${hashName}`)
         .then( res => res.json() )
         .then( data => {
            // 数据请求下来 就将 加载隐藏
            Toast.hide()
            // 修改 state
            this.setState({
                data: data
            })
         })
         .catch( function(e) {
             Toast.fail ( "无此资源" )
         })

    }


}

export default DetailMovie

/*
<img src={item.avatars.large}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    border: '1px solid #ccc'
                                                }}
                                             />
<img src={  item.avatars.large}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    border: '1px solid #ccc'
                                                }}
                                             />

*/