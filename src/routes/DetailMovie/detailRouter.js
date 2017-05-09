import React,{Component} from "react"
import { NavBar, Icon } from 'antd-mobile'

import DetailMovie from './../../components/detailMovie/detailMovie'

import './detailRouter.css'

// 分类
const classifyArr = ["经典","豆瓣高分","冷门佳片","爱情","喜剧","科幻","动作","悬疑","治愈","青春","文艺","日本","韩国"]
// recommond 
const recommondArr = ["one","two","three","four"]

class DetailMovieRouter extends Component {
    
    backHandleEvent() {
        
        const judjeName = window.location.hash.split(":")[1].split("?")[0].split("-")[0]
        const idName = window.location.hash.split(":")[1].split("?")[0].split("-")[1]
        

        const arr1 = classifyArr.filter ( function (item){
            return item === judjeName
        })
        const arr2 = recommondArr.filter (function (item) {
            return item === judjeName
        })

        if ( judjeName === "recommend" ) {    // recommend
            window.location.hash = "#/"
        }
        else if ( judjeName === "search" ) {  // search
            window.location.hash = "#/search"
        }
        else if ( arr1.length === 0 && arr2.length === 0 ) { // search  list列表
            window.location.hash = "#/list:"+judjeName
        }
        else if (arr1.length > 0 ) {                    // 分类  list列表
            window.location.hash = "#/list:"+judjeName
        }
        else if ( arr2.length > 0 ) {                   // recommond list列表
            window.location.hash = "#/list:"+judjeName
        }
        
    }

    render() {
        return (
            <div>
                <NavBar  className="listNavBar" leftContent="back" mode="light" onLeftClick={ e => this.backHandleEvent(e) }
                > 电影详情 </NavBar>
                <DetailMovie />
            </div>
        );
    }
}
export default DetailMovieRouter