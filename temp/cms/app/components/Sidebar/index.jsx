import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router';


const SubMenu = Menu.SubMenu
const { Sider } = Layout;


import './index.less';



class Sidebar extends React.Component {

  state = {
    collapsed: false,
    mode: 'inline',
    openKey: "",
    activeKey: ""
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      mode: !this.state.collapsed ? 'vertical' : 'inline',
    });
  }

  componentDidMount () {
    this.setMenuOpen(this.props)
  }

  setMenuOpen(){

  }
  componentWillReceiveProps(nextProps) {
  
  }

  menuClickHandle = (item) => {
    /*this.setState({
      activeKey: item.key
    })
    this.props.updateNavPath(item.keyPath, item.key)*/
  }

  openMenu =v=>{
    console.log(v);
    this.setState({
        openKey: v[v.length - 1]
    })
  }

  render () {
    let {activeKey,openKey}=this.state;

    return (
      <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={{}}
          style={{overflowY:'auto'}}
        >
        <div className="ant-layout-logo"></div>
        <Menu
          mode={this.state.mode} 
          theme="dark"
          selectedKeys={[activeKey]}
          openKeys={[openKey]}
          onOpenChange={this.openMenu}
        >
          <Menu.Item key="/dashboard">
            <Link to={'/'}>
              <Icon type="mobile" /><span className="nav-text">首页</span>
            </Link>
          </Menu.Item>
          <SubMenu  key="/app/ui"
            title={<span><Icon type="scan" /><span className="nav-text">UI</span></span>}
          >
            <Menu.Item key="/buttons"><Link to={'/buttons'}>按钮</Link></Menu.Item>
          </SubMenu>
          <SubMenu  key="/site/tables"
            title={<span><Icon type="copy" /><span className="nav-text">表格</span></span>}
          >
            <Menu.Item key="/tables"><Link to={'/tables'}>基楚表格</Link></Menu.Item>
          </SubMenu>
          <SubMenu  key="/site/forms"
            title={<span><Icon type="edit" /><span className="nav-text">表单</span></span>}
          >
            <Menu.Item key="/forms"><Link to={'/forms'}>基楚表单</Link></Menu.Item>
          </SubMenu>          
          <SubMenu  key="/site/NewsManage"
            title={<span><Icon type="edit" /><span className="nav-text">新闻中心</span></span>}
          >
            <Menu.Item key="/NewsManage"><Link to={'/NewsManage'}>新闻列表</Link></Menu.Item>
          </SubMenu>
        </Menu>
        <div className="sider-trigger">
          <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
        </div>
      </Sider>
    )
  }
}




export default Sidebar