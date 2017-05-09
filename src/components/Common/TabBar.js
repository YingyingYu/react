import React from 'react';
import ReacDOM from 'react-dom';

import Footer from './Footer';

// 在渲染 render 中 做注释 使用 {/* 注释的内容 */}
// 使用antd-mobile 中的 tabBar 有个 缺点 每次刷新的时候 总会 指向 默认 的 页面 

class TabBarExample extends React.Component {

  constructor(props) {
    super(props);
  }

	// <Icon size="md" type={require('../../icon-core/chats.svg')} />  可以 自定义 svg

  render() {
    return (
    	<div>
			  {this.props.children}
      </div>
    );
  }
}

export default TabBarExample