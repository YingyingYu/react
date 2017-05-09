import React,{Component} from "react"
import { Toast  } from 'antd-mobile';
import fetchJsonp from "fetch-jsonp";

import './hotSearch.css'


class LoginImg extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: ['','','','','','','','','','']
        }
    }
    
    render() {
        return (
            <div 
            className="hotMovieName"
            onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                }}
            >
                <h1 className="hot"> 热门搜索 </h1>
                {this.state.data.map(ii => (
                    <div className="cellSearch">
                        <a href={"#/detail:search"+"-"+ii.id} key={ii} >
                            <h2 className="searchIndex"> {ii.index} </h2>
                            <p className="searchTitle"> {ii.title} </p>
                        </a>
                    </div>
                ))}
            </div>
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

        fetch(this.props.source)
        .then( res => res.json())
        .then( data => {
            // 数据请求下来 就将 加载隐藏
            Toast.hide()
            // 修改 state
            this.setState({
                data:[
                    {
                        index: 1,
                        title: data.subjects[0].title,
                        id: data.subjects[0].id
                    },
                    {
                        index: 2,
                        title: data.subjects[1].title,
                        id: data.subjects[1].id
                    },
                    {
                        index: 3,
                        title: data.subjects[2].title,
                        id: data.subjects[2].id
                    },
                    {
                        index: 4,
                        title: data.subjects[3].title,
                        id: data.subjects[3].id
                    },
                    {
                        index: 5,
                        title: data.subjects[4].title,
                        id: data.subjects[4].id
                    },
                    {
                        index: 6,
                        title: data.subjects[5].title,
                        id: data.subjects[5].id
                    },
                    {
                        index: 7,
                        title: data.subjects[6].title,
                        id: data.subjects[6].id
                    },
                    {
                        index: 8,
                        title: data.subjects[7].title,
                        id: data.subjects[7].id
                    },
                    {
                        index: 9,
                        title: data.subjects[8].title,
                        id: data.subjects[8].id
                    },
                    {
                        index: 10,
                        title: data.subjects[9].title,
                        id: data.subjects[9].id
                    }
                ]
            })
        })
        .catch ( function(e){
            Toast.fail("无此资源")
        })
    }

}
export default LoginImg