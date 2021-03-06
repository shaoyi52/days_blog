import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Row, Col, Icon, Badge,Popover,Dropdown,Avatar,Menu } from 'antd'
import './index.less'

const { Header} = Layout;

class commonHeader extends React.Component {
  constructor () {
    super()
    this.state={
      collapsed:false
    }
  }

  handleLogOut(){

  }

  render() {
     const menu = (
      <Menu>
        <Menu.Item>
          选项1
        </Menu.Item>
        <Menu.Item>
          选项2
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.handleLogOut}>注销</a>
        </Menu.Item>
      </Menu>
    );

    const content = (
      <div>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
      </div>
    );

    const username="";

    return (
      <Header style={{ background:'#fff', padding: 0}}>
        <Icon
            className="trigger custom-trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.toggle}
        />
       {/* <Row type="flex" justify="end" align="middle">
          <Col span={3}>
            <Badge className="header-icon" count={5}>
              <Icon type="mail"/>
            </Badge>
            <Popover content={content} title="Title" trigger="click">
              <Badge className="header-icon" dot>
                <a href="#">
                  <Icon type="notification" />
                </a>
              </Badge>
            </Popover>
          </Col>
          <Col span={3}>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                <Avatar style={{ verticalAlign: 'middle'}}>{username}</Avatar> <Icon type="down" />
              </a>
            </Dropdown>
          </Col>
        </Row>*/}
      </Header>
    )
  }

}

export default commonHeader