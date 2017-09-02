import React from 'react';
import PropTypes from 'prop-types'
import { Route} from 'react-router';

import {Layout, Affix , Row, Col} from 'antd';

//import { childRoutes } from '../../routes'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'


import './index.less';

const { Content, Footer } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
   
  }

  render() {
    const {auth, navpath, actions} = this.props;
   
    return (
      <Layout className="ant-layout-has-sider">
        <Sidebar />
        <Layout>
          <Header profile={auth} logout={{}} />
           <Content style={{ margin: '0', padding:'0 16px', background:'#eee'}}>
            
            <div style={{ minHeight: 360 }}>
              {this.props.children}
            </div>
           </Content>
           <Footer style={{ textAlign: 'center' }}>
              React-Admin ©2017 Created by 827048849@qq.com
            </Footer>
          
        </Layout>
        
        {/*<Layout>
          <Header profile={auth} logout={actions.logout} />
          <Content style={{ margin: '0 16px' }}>
            <NavPath data={navpath} />
            <div style={{ minHeight: 360 }}>
              <Redirect to="/home"/>
              {childRoutes.map((route, index) => (
                <Route key={index} path={route.path} component={authHOC(route.component)} exactly={route.exactly} />
              ))}
            </div>
          </Content>
          <Footer />
        </Layout>*/}
      </Layout>
    );
  }
}


export default App;