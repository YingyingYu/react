import React,{Component} from "react"
import { SearchBar, Button, WhiteSpace, WingBlank, Icon } from 'antd-mobile';
import HotSearch from '../../components/search/hotSearch'
import Footer from './../../components/Common/Footer'


import './search.css'
import searchImg from "../../static/images/inputSearch.png"

class Search extends Component {

    searchNameHandle() {
        const searchItem = this._searchElement.value
        console.log (searchItem)
        window.location.hash = "#/list:"+searchItem
    }

    render() {
        return (
            <div>
                <div className="header">
                    <div className="navBarSearch">
                        <img className="imgSearch" src={searchImg} />
                        <input 
                            ref = { a => this._searchElement = a } 
                            className="searchItem" 
                            placeholder="搜索影人/导演名" 
                            type="text" />
                        <button onClick={ e => this.searchNameHandle(e)} className="btn"> 搜索 </button>
                    </div>
                </div>
                <div className="content">
                    <HotSearch source="v2/movie/in_theaters" />
                </div>
                <Footer active="2" />
            </div>
        );
    }

}
export default Search
