import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router';


const SubMenu = Menu.SubMenu
const { Sider } = Layout;
const allMenu = [
  {
    name:'首页',
    url:'dashboard',
    icon:'mobile'
  },{
    name:'UI',
    url:'/app/ui',
    icon:'scan',
    children:[
      {name:'按钮',url:'buttons'}
    ]
  },{
    name:'表格',
    url:'/site/tables',
    icon:'copy',
    children:[
      {name:'基楚表格',url:'tables'}
    ]
  },{
    name:'表单',
    url:'/site/forms',
    icon:'edit',
    children:[
      {name:'基楚表单',url:'forms'}
    ]
  },{
    name:'新闻中心',
    url:'/site/NewsManage',
    icon:'edit',
    children:[
      {name:'新闻列表',url:'NewsManage'}
    ]
  }
]

import './index.less';

class Sidebar extends React.Component {

   state = {
    theme: 'dark',
    current: 'index',
    collapsed: false,
    mode: 'inline',  // 水平垂直展现
  }
  onCollapse=(collapsed)=>{
     console.log(collapsed);
    this.setState({ collapsed });
  }

  render(){
    return(
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <Menu
          mode='inline' 
          theme="dark"
        >
          {
            allMenu.map((subMenu)=>{
              if(subMenu.children && subMenu.children.length){
                return(
                  <SubMenu key={subMenu.url}  title={
                    <span><Icon type={subMenu.icon} /><span className="nav-text" >{subMenu.name}</span></span>}
                  >
                    {subMenu.children.map(menu => (
                      <Menu.Item key={menu.url}><Link to={`/${menu.url}`}>{menu.name}</Link></Menu.Item>
                      ))}
                  </SubMenu>  
                  )
              }

              return (
                <Menu.Item key={subMenu.url}>
                  <Link to={`/${subMenu.url}`}>
                    <Icon type={subMenu.icon} /> <span>{subMenu.name}</span>
                  </Link>  
                </Menu.Item>
                )
            })
          }

        </Menu>
      </Sider>

      )
  }
}




export default Sidebar