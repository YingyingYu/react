import React,{Component} from "react"
import { RefreshControl, ListView , NavBar, Icon, Toast } from 'antd-mobile';
import MovieList from "./../../components/detailMovie/movieLists"
import fetchJsonp from 'fetch-jsonp'

import './listMovieRouter.css'

// 分类
const classifyArr = ["经典","豆瓣高分","冷门佳片","爱情","喜剧","科幻","动作","悬疑","治愈","青春","文艺","日本","韩国"]
// recommond 
const recommondArr = ["one","two","three","four"]


class ListMovieRouter extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            dataSource: [],
            loading: false,
            hasMore: true
        };
    }

    backHandleEvent() {
        
        // 地址 的 hash 值
        var hashArr = ''
        var backHashName = window.location.hash.split(":")[1].split("?")[0]
        
        if ( backHashName.indexOf("detail") >= 0 ) {
            hashArr = backHashName.split("-")
            backHashName = hashArr[0]
        }   
        console.log (backHashName)
        console.log (hashArr[2])
        console.log (hashArr[3])
        // 分类
        const arr1 = classifyArr.filter ( function (item){
            return item === backHashName
        })
        const arr2 = recommondArr.filter (function (item) {
            return item === backHashName
        })

        if ( arr1.length === 0 && arr2.length === 0 && backHashName !== "detail" ) { // search
            window.location.hash = "#/search"
        }
        else if (arr1.length > 0 ) {                    // 分类
            window.location.hash = "#/classify"
        }
        else if ( arr2.length > 0 ) {                   // recommond
            window.location.hash = "#/"
        }
        else if ( backHashName === "detail" ) {
            window.location.hash = "#/detail:"+hashArr[2]+"-"+hashArr[3]
        }

    }

    render() {
        console.log (document.documentElement.clientHeight)
        return (
            <div>
                <NavBar  className="listNavBar" leftContent="back" mode="light" onLeftClick={ e => this.backHandleEvent(e) }
                > 电影列表 </NavBar>
                <MovieList listData={ this.state.dataSource } getMovieData={(params)=>this.getMovieData(params)} style = {{height: document.documentElement.clientHeight-90}} />
            </div>
        );
    }
    componentDidMount () {
        this.getMovieData()
    }
    getMovieData(more) {
        // 判断是否加载数据 或者 已经 没有 更多数据
        if( this.loading || !this.state.hasMore ) return;
        // 显示loading 
        Toast.loading('加载中...',0, () => {
            console.log ("加载完成！！！")
        });
        // 判断如果不是记载更多就 使其 start=0
        this.start = more ? this.start : 0;
        // 正在loading
        this.loading = true

        // 地址 的 hash 值
        var hashName = window.location.hash.split(":")[1].split("?")[0]
        if ( hashName.indexOf("-") >= 0 ) {
            hashName = hashName.split("-")[1]
        }
        //数据请求　（服务器地址＂http://api.douban.com/v2/＂）
        console.log (this.start)
        console.log ( hashName )

        // 需要 判断 地址 是来自于 首页 还是 分类 或是 搜索
        var url = ''
        classifyArr.forEach (function (item) {

            if (item === hashName) {     // 分类
                // url = hashName
                url = `v2/movie/search?tag=${hashName}&start=${this.start}&count=10`
            }
            else if (hashName === "one") { // recommond
                url = 'v2/movie/in_theaters?start=0&count=10'
            }
            else if (hashName === "two") {
                url = 'v2/movie/coming_soon?start=0&count=10'
            }
            else if (hashName === "three") {
                url = 'v2/movie/us_box'
            }
            else if (hashName === "four") {
                url = 'v2/movie/top250?start=0&count=10'
            }else {                        // search
                url = `v2/movie/search?q=${hashName}&start=${this.start}&count=10`
            }   

        }.bind(this))
       

        fetch(url)
         .then( res => res.json())
         .then(data => {
             console.log (data)
             console.log ( this.state.dataSource )
           
            //  data = data.subjects;
            // 下次请求数据start+10
            this.start+=10;

             this.setState({
                 //加载更多就进行数据拼接
                 dataSource: more ? this.state.dataSource.concat(data.subjects) : data.subjects,
                 // 判断还有没有数据更多数据
                 hasMore: this.start <= data.total
             })
             // 关闭loading 
             this.loading = false;
             Toast.hide()
         })
    }
}
export default ListMovieRouter