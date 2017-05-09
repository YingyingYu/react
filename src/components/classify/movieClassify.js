import React from 'react';
import { Toast } from 'antd-mobile';

import { Link } from 'react-router';

import './movieClassify.css'

class MovieClassify extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: ['','','','','','','','','','','','']
        }
    }

    componentDidMount() {
        // 显示loading 
        Toast.loading('加载中...',0, () => {
            console.log ("加载完成！！！")
        });
        
        setTimeout (() => {
            // 数据请求下来 就将 加载隐藏
            Toast.hide()
            // 修改 state
            this.setState({
                data: [
                    {
                        image: require("../../static/images/classify/jindian.png"),
                        title: "经典"
                    },
                    {
                        image: require("../../static/images/classify/lengmenjiapian.png"),
                        title: "冷门佳片"
                    },
                    {
                        image: require("../../static/images/classify/aiqing.png"),
                        title: "爱情"
                    },
                    {
                        image: require("../../static/images/classify/xiju.png"),
                        title: "喜剧"
                    },
                    {
                        image: require("../../static/images/classify/kehuan.png"),
                        title: "科幻"
                    },
                    {
                        image: require("../../static/images/classify/dongzuo.png"),
                        title: "动作"
                    },
                    {
                        image: require("../../static/images/classify/xuanyi.png"),
                        title: "悬疑"
                    },
                    {
                        image: require("../../static/images/classify/zhiyu.png"),
                        title: "治愈"
                    },
                    {
                        image: require("../../static/images/classify/qingchun.png"),
                        title: "青春"
                    },
                    {
                        image: require("../../static/images/classify/wenyi.png"),
                        title: "文艺"
                    },
                    {
                        image: require("../../static/images/classify/riben.png"),
                        title: "日本"
                    },
                    {
                        image: require("../../static/images/classify/hanguo.png"),
                        title: "韩国"
                    }
                ]
            })
        }, 1000)
    }

    render() {
        console.log (this.state.data)
        return (
            <div className="classify"
            onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                }}
            >
            {this.state.data.map(ii => (
                <div className="classifyTip">
                    {/* 拼接地址 {"#/list:"+ii.title} */}
                    <a href={"#/list:"+ii.title} key={ii} >
                        <img
                            src={ii.image}
                        />
                        <h2 className="title">{ii.title}</h2>
                    </a>
                </div>
            ))}
           
            </div>
        );
    }
}
export default MovieClassify

