import React, { Component } from 'react';
//import Header from '../components/Header'
//import Navigation from '../components/Navigation'
import './App.less';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;


class App extends Component {

  constructor(props) {
    super(props);  
    this.state = {};
  }

 
  render() { 
      return(
        <div> 
        <Layout>
          <Header className="header">
            <div className="logo" />
            {/*<Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>*/}
          </Header>
          {this.props.children}
          <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2016 Created by Ant UED
    </Footer>
        </Layout>  
        </div>
        
      )
  }


}



export default App;
