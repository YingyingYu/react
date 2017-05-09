import React,{ Component } from "react";
import { RefreshControl, ListView, Icon, Toast } from "antd-mobile";

// 使用 fetch 跨域请求数据
import fetchJsonp from 'fetch-jsonp';

import './movieLists.css'

// 每一行 数据 的 样式
/* 使用fetch 请求 数据 如果 没有 就 Toast.fail("无此资源") */
const Row = ( rowData, sectionID, rowID ) => {

    console.log ( rowData )
    // 由于 豆瓣电影北美票房榜 接口 与 其他接口 不一样 需要 判断
    var hashStr = window.location.hash.split(":")[1].split("?")[0]
    var hashName = hashStr
    var hashArr = ''
    if ( hashStr.indexOf("detail") >=0 ) {
        hashArr = hashName.split("-")
        hashName = hashArr[2]
    }
    const dStr = ''
    const cStr = ''
    return (
        <div key={rowID}
            onClick = { hashName==="three" && hashStr.indexOf("detail") < 0 ? 
                () => fetch(`v2/movie/subject/${rowData.subject.id}`)
                        .then ( res => res.json() )
                        .then ( data => {
                            window.location.hash = "#/detail:"+hashName+"-"+rowData.subject.id
                        })
                        .catch (function (e){
                            Toast.fail ("无此资源")
                        })
              : () => fetch(`v2/movie/subject/${rowData.id}`)
                        .then ( res => res.json() )
                        .then ( data => {
                            window.location.hash = "#/detail:"+hashName+"-"+rowData.id
                        })
                        .catch (function (e){
                            Toast.fail ("无此资源")
                        })
                }
            style={{
                boxSizing:'border-box',
                borderBottom:'2px solid #c3c3c3',
                backgroundColor: '#f3f3f3',
            }}
        >
            <div 
                style={{ 
                    display: '-webkit-box', 
                    display: 'flex',
                    padding: '.4rem .3rem'
                 }}>
                <div
                    style={{ 
                    width: '1.6rem', 
                    height: '2.2rem',
                    marginRight: '.32rem'
                 }}>
                    <img style={{ height: '100%', width: '100%' }} src={ hashName==="three"  && hashStr.indexOf("detail") < 0 ? rowData.subject.images.large : rowData.images.large} />
                </div>
                <div style={{ display: 'inline-block' }}>
                    <p
                        style={{ 
                            fontSize: '.4rem', 
                            fontFamily: 'cursive',
                            fontWeight: 'bold',
                            width: '3.8rem'
                        }}>
                    { hashName==="three" && hashStr.indexOf("detail") < 0 ? rowData.subject.title : rowData.title}</p>
                    <p
                        style={{ 
                            fontSize: '.2rem',
                            lineHeight: '.3rem', 
                            fontFamily: 'cursive',
                            color: '#a0a0a0',
                            fontWeight: 'bold'
                        }}>
                    评分: <span
                        style={{
                            color: '#ffb712'
                        }}
                    >{ hashName==="three" && hashStr.indexOf("detail") < 0 ? rowData.subject.rating.average :  rowData.rating.average}</span></p>
                    <p
                        className = { hashName==="three" && hashStr.indexOf("detail") < 0 ? rowData.subject.directors.length>0 ? "show" : "hide" :  rowData.directors.length>0 ? "show" : "hide"}
                        style={{ 
                            fontSize: '.2rem',
                            lineHeight: '.3rem', 
                            fontFamily: 'cursive',
                            color: '#a0a0a0',
                            fontWeight: 'bold',
                            width: '2.5rem'
                        }}>
                    导演: { hashName==="three" && hashStr.indexOf("detail") < 0 || hashName.indexOf("detail") >= 0 ? rowData.subject.directors.length>0 ? rowData.subject.directors.map(function (item, index){ return index===0 ? dStr+item.name : dStr+" / "+item.name }) : "" : rowData.directors.length>0 ? rowData.directors.map(function (item, index){ return index===0 ? dStr+item.name : dStr+" / "+item.name }) : ""}</p>
                    <p
                        className = { hashStr.indexOf("detail") >= 0 ? rowData.casts.length>0 ? "show" : "hide" : hashName==="three" ? rowData.subject.casts.length>0 ? "show" : "hide" : rowData.casts.length>0 ? "show" : "hide"}
                        style={{ 
                            fontSize: '.2rem',
                            lineHeight: '.3rem', 
                            fontFamily: 'cursive',
                            color: '#a0a0a0',
                            fontWeight: 'bold',
                            width: '2.5rem'
                        }}>
                    演员: { hashName==="three" && hashStr.indexOf("detail") < 0 ? rowData.subject.casts.length>0 ? rowData.subject.casts.map(function (item, index){ return index===0? cStr+item.name : cStr+" / "+item.name }) : '' : rowData.casts.length>0 ? rowData.casts.map(function (item, index){ return index===0? cStr+item.name : cStr+" / "+item.name }) : '' }  </p>
                    <p
                        style={{
                            fontSize: '.25rem',
                            lineHeight: '.4rem',
                            fontFamily: 'cursive',
                            fontWeight: 'bold'
                        }}>
                        { hashName==="three" && hashStr.indexOf("detail") < 0 ? rowData.subject.collect_count : rowData.collect_count}人看过</p>
                </div>
            </div>
        </div>
    );
}

class MovieList extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
        };
    }
    static defaultProps = {
        name: "11"
    }
    onRefresh = () => {
        this.setState({ refreshing: true });
        this.props.getMovieData()
        setTimeout( () => {
            this.setState({
                refreshing: false
            });
        }, 1000)
    };
    onScroll = () => {
        console.log ("ss")
    };
    onEndReached() {
        // 10
        // 当滚到底部的时候，而且分段数据全部显示（加载更多的方法）
        this.props.getMovieData(true)
    }
    render() {
        // react-native ListView 需要特殊的数据， 不能只是一个数组，要用dataSource
        const dataSource = new ListView.DataSource({
            rowHasChanged: ( row1, row2 ) => row1 !== row2,
        });
        const { style,listData,size } = this.props
        // renderRow 相当于 map 
        // 上拉刷新 有问题
        var hashHeaderStr = window.location.hash.split(":")[1].split("?")[0]
        var hashHeader = ''
        var hashHeaderArr = []
        hashHeader = hashHeaderStr
        if ( hashHeaderStr.indexOf("detail") >= 0 ) {  // detail
            hashHeaderArr = hashHeaderStr.split("-")
            hashHeader = hashHeaderArr[1]
        }
        else if ( hashHeaderStr === "one" ) {           // recommond
            hashHeader = "正在上映的电影-北京"
        }
        else if ( hashHeaderStr === "two" ) {
            hashHeader = "即将上映的电影"
        }
        else if ( hashHeaderStr === "three" ) {
            hashHeader = "豆瓣电影北美票房榜"
        }
        else if ( hashHeaderStr === "two" ) {
            hashHeader = "豆瓣电影Top250"
        }

        return (
            <ListView
                dataSource = { dataSource.cloneWithRows(listData||[]) }
                renderHeader={() => <span> { hashHeader } </span>}
                renderRow = { Row }
                initialListSize = { size || 10 }
                pageSize = { size || 10 }
                onScroll = { this.onScroll }
                style = { style }
                onEndReached={()=>this.onEndReached()}
                onEndReachedThreshold = { -10 }
                scrollerOptions = {{ scrollbars: true }}
                RefreshControl = {<RefreshControl
                    refreshing = { this.state.refreshing }
                    onRefresh = { this.onRefresh }
                    icon = {[
                        <div key="0" className="am-refresh-control-pull" >
                            <span
                                style={{
                                    fontSize: '.26rem',
                                    fontFamily: 'cursive',
                                    fontWeight: 'bold',
                                    marginRight: '.2rem'
                                }}
                            >下拉可以刷新</span>
                            <Icon size="md" type={require('./../../icon-core/drop-down.svg')} />
                        </div>,
                        <div key="1" className="am-refresh-control-release" >
                            <Icon type="loading" />
                        </div>
                    ]}
                />}
            />
        );
    }
}

export default MovieList