import React,{ Component } from 'react';

import { Link } from 'react-router';
import { Icon } from 'antd-mobile';

import './Footer.css';
/* eslint global-require: 0 */
 
class Footer extends Component {

  constructor(props) {
    super(props);
  }

  // 设置默认 props  es6 写法
  static defaultProps = {
    footerData: [
      {title: "精选", path: "/", icon: <Icon key="0" size="md" className="icon"  type="koubei-o" />},
      {title: "分类", path: "/classify", icon: <Icon key="0" size="md" className="icon" type="check-circle-o" />},
      {title: "搜素", path: "/search", icon: <Icon key="0" size="md" className="icon" type="search"  />},
      {title: "我的", path: "/me", icon: <Icon key="0" size="md"  className="icon" type="ellipsis" />}
    ]
  };
//<Icon size="md" className="icon" type={require('./../../icon-core/adduser.svg')} />
  render() {
    const { footerData, active, onChangeTabIndex } = this.props;
    // console.log (active)
    return (
      <div className="footer">
        <ul>
          {
            footerData.map((ele,i) => <li key={i} className={i==active?"active":""} >
              {/*<a href={"#"+ele.path}>{ele.title}</a>*/}
              <Link to={ele.path} >
                <dl className="tabs">
                  <dt>
                    {ele.icon}
                  </dt>
                  <dd>
                    {ele.title}
                  </dd>
                </dl>
              </Link>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default Footer