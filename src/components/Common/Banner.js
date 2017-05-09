import React from 'react';
import { Carousel, WhiteSpace, WingBlank, Toast  } from 'antd-mobile';
import { Link } from 'react-router';

import fetchJsonp from "fetch-jsonp";

console.log (fetchJsonp)
import "./Banner.css";


class Banner extends React.Component {

  state = {
    data: ['', '', '', '', ''],
    initialHeight: 328
  }

   render() {
    
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    return (
      <WingBlank>
        <Carousel
          className="my-carousel carouselStyle " autoplay={false} infinite selectedIndex={0}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.data.map(ii => (
            <a href={"#/detail:recommend"+"-"+ii.id} key={ii} style={hProp}>
              <img
								src={ii.image}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({
                    initialHeight: this.state.initialHeight,
                  });
                }}
              />
            </a>
          ))}
        </Carousel>

        <WhiteSpace />
        
      </WingBlank>
    );
  }

  componentDidMount() {
  
    // 显示loading 
    Toast.loading('加载中...',0, () => {
        console.log ("加载完成！！！")
    });
        
    // 使用ajax 请求数据
    // 数据请求 （服务器地址"http://api.douban.com/"）
    // var url = "http://api.douban.com/v2/movie/in_theaters"
    
    fetch(`v2/movie/in_theaters`)
    .then(res => res.json())
    .then(data => {
        // 数据请求下来 就将 加载隐藏
        Toast.hide()
        // 修改 state
        this.setState({
              data: [
                {
                  id: data.subjects[0].id,
                  image: data.subjects[0].images.large
                },
                {
                  id: data.subjects[1].id,
                  image: data.subjects[1].images.large
                },
                {
                  id: data.subjects[2].id,
                  image: data.subjects[2].images.large
                },
                {
                  id: data.subjects[3].id,
                  image: data.subjects[3].images.large
                },
                {
                  id: data.subjects[4].id,
                  image: data.subjects[4].images.large
                }
              ]
            });
    })
    .catch ( function(e){
      Toast.fail("无此资源")
    })   
  }
  
}

export default Banner