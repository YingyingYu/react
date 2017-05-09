import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

// TabBar 
// import 引入 js 文件 时 不必在 后面 添加 .js
// import 引入 css 文件 需要 在后面 添加 .css
import TabBarExample from "./components/Common/TabBar";
import Recommend from "./routes/Recommend/recommend";
import Classify from "./routes/Classify/classify";
import Search from "./routes/Search/search";
import Me from "./routes/Me/me";

// 登录/注册
import LoginEnter from "./routes/Me/loginEnter";
import RegisterEnter from "./routes/Me/registerEnter";

// 列表
import ListMovieRouter from "./routes/DetailMovie/listMovieRouter";
// 详情
import DetailMovieRouter from "./routes/DetailMovie/detailRouter";

import './index.css';
import "./../src/static/css/reset.css";

// 二级路由下面 path="" 不需要加 "/" 直接写 hash值就好了 
// <Route path="*" component={Index} />  path="*" 设置默认路由（otherwise）
const App = () => <Router history={ hashHistory }>
  <Route  path="/" component={TabBarExample} >
    <IndexRoute component={Recommend} />
    <Route path="classify" component={Classify} />
    <Route path="search" component={Search} />
    <Route path="me" component={Me} />
  </Route>
  <Route path="/login" component={LoginEnter} />
  <Route path="/register" component={RegisterEnter} />
  <Route path="/list:id" component={ListMovieRouter} />
  <Route path="/detail:id" component={DetailMovieRouter} />
  <Route path="*" component={Recommend} />
</Router>


ReactDOM.render(
  <App/>
, document.getElementById('root'));


