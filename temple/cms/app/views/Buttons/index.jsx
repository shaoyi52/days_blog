import React from 'react'
import { Row, Col,Card,Button, Radio,Icon,Menu,Dropdown} from 'antd'
import { browserHistory } from 'react-router'

import NavPath from '../../components/NavPath'


import './index.less'

class Index extends React.Component {
  state = {
    size: 'default',
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }  

  handleMenuClick = (e)=> {
    console.log('click', e);
  }

  render () {
    const navData=[{kye:1,name:'UI'},{kye:2,name:'按钮'}]
    const size = this.state.size;
    const menu =(<Menu onClick={this.handleMenuClick}>
                  <Menu.Item key="1">1st item</Menu.Item>
                  <Menu.Item key="2">2nd item</Menu.Item>
                  <Menu.Item key="3">3rd item</Menu.Item>
                </Menu>)
    return (
      <div className="gutter-example button-demo">
        <NavPath data={navData} />
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <div className="gutter-box">
                <Card bordered={false}>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                </Card>
            </div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div className="gutter-box">
                <Card bordered={false}>
                    <Button type="primary" shape="circle" icon="search" />
                    <Button type="primary" icon="search">Search</Button>
                    <Button shape="circle" icon="search" />
                    <Button icon="search">Search</Button>
                    <br />
                    <Button shape="circle" icon="search" />
                    <Button icon="search">Search</Button>
                    <Button type="dashed" shape="circle" icon="search" />
                    <Button type="dashed" icon="search">Search</Button>                </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col  className="gutter-row" span={12}>
            <div className="gutter-box">
              <Card bordered={false}>
                <Radio.Group value={size} onChange={this.handleSizeChange}>
                  <Radio.Button value="large">Large</Radio.Button>
                  <Radio.Button value="default">Default</Radio.Button>
                  <Radio.Button value="small">Small</Radio.Button>
                </Radio.Group>
                <br /><br />
                <Button type="primary" shape="circle" icon="download" size={size} />
                <Button type="primary" icon="download" size={size}>Download</Button>
                <Button type="primary" size={size}>Normal</Button>
                <br />
                <Button.Group size={size}>
                  <Button type="primary">
                    <Icon type="left" />Backward
                  </Button>
                  <Button type="primary">
                    Forward<Icon type="right" />
                  </Button>
                </Button.Group>
              </Card>  
            </div>  

          </Col>
          <Col className="gutter-row" span={12}>
            <div className="gutter-box">
              <Card bordered={false}>
                <Button type="primary">primary</Button>
                <Button>secondary</Button>
                <Dropdown overlay={menu}>
                  <Button>
                    more <Icon type="down" />
                  </Button>
                </Dropdown>                
              </Card>
            </div> 
            <div className="gutter-box">
              <Card bordered={false}>
                <Button type="primary">Primary</Button>
                <Button type="primary" disabled>Primary(disabled)</Button>
                <br />
                <Button>Default</Button>
                <Button disabled>Default(disabled)</Button>
                <br />
                <Button>Ghost</Button>
                <Button disabled>Ghost(disabled)</Button>
                <br />
                <Button type="dashed">Dashed</Button>
                <Button type="dashed" disabled>Dashed(disabled)</Button>
              </Card>
            </div>          
          </Col>
        </Row>
      </div>  

    )
  }
}


export default Index