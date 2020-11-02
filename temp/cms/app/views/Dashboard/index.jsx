import React from 'react'
import { Row, Col,Card,Timeline,Icon} from 'antd'
import { browserHistory } from 'react-router'

import NavPath from '../../components/NavPath'
import EchartsProjects from './EchartsProjects';
import b1 from './b1.jpg';
import './index.less'

class Index extends React.Component {
    
  render () {

    return (
      <div style={{height:'100%'}} className="gutter-example button-demo">
        <NavPath />
        <Row gutter={10}>
          <Col span="4">
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="pull-left mr-m">
                  <Icon type="heart" className="text-2x text-danger"/>
                </div>
                <div className="clear">
                  <div className="text-muted">收藏</div>
                  <h2>301</h2>
                </div>
              </Card>
            </div>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="pull-left mr-m">
                  <Icon type="heart" className="text-2x text-danger"/>
                </div>
                <div className="clear">
                  <div className="text-muted">收藏</div>
                  <h2>301</h2>
                </div>
              </Card>
            </div>            
          </Col>
          <Col span="4">
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="pull-left mr-m">
                  <Icon type="heart" className="text-2x text-danger"/>
                </div>
                <div className="clear">
                  <div className="text-muted">收藏</div>
                  <h2>301</h2>
                </div>
              </Card>
            </div>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="pull-left mr-m">
                  <Icon type="heart" className="text-2x text-danger"/>
                </div>
                <div className="clear">
                  <div className="text-muted">收藏</div>
                  <h2>301</h2>
                </div>
              </Card>
            </div>
          </Col>
          <Col span="16">
            <div className="gutter-box">
                <Card bordered={false} className={'no-padding'}>
                    <EchartsProjects />
                </Card>
            </div>
          </Col>
          <Col span="8">
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="pb-m">
                  <h3>任务</h3>
                  <small>10个已经完成,2个待完成，1个正在进行中</small>
                </div>
                <a className="card-tool"><Icon type="sync" /></a>
                <Timeline>
                  <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                  <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                  <Timeline.Item color="green">
                    <p>联调接口</p>
                    <p>功能验收</p>
                    <p>登录功能权限设计</p>
                    <p>权限验证</p>
                    <p>页面排版</p>
                  </Timeline.Item>
                   <Timeline.Item color="green">
                    <p>登录功能权限设计</p>
                    <p>权限验证</p>
                    <p>页面排版</p>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </div>
          </Col>
          <Col span="8">
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="pb-m">
                    <h3>消息栏</h3>
                </div>
                <a className="card-tool"><Icon type="sync" /></a>
                <ul className="list-group no-border">
                  <li  className="list-group-item">
                    <a href="" className="pull-left w40 mr-m">
                      <img src={b1} className="img-responsive img-circle" alt='test'/>
                    </a>
                    <div className="clear">
                      <a href="" className="block">鸣人</a>
                      <span className="text-muted">终于当上火影了！</span>
                    </div>
                  </li>
                  <li  className="list-group-item">
                    <a href="" className="pull-left w40 mr-m">
                      <img src={b1} className="img-responsive img-circle" alt='test'/>
                    </a>
                    <div className="clear">
                      <a href="" className="block">鸣人</a>
                      <span className="text-muted">终于当上火影了！</span>
                    </div>
                  </li>
                  <li  className="list-group-item">
                    <a href="" className="pull-left w40 mr-m">
                      <img src={b1} className="img-responsive img-circle" alt='test'/>
                    </a>
                    <div className="clear">
                      <a href="" className="block">鸣人</a>
                      <span className="text-muted">终于当上火影了！</span>
                    </div>
                  </li>
                  <li  className="list-group-item">
                    <a href="" className="pull-left w40 mr-m">
                      <img src={b1} className="img-responsive img-circle" alt='test'/>
                    </a>
                    <div className="clear">
                      <a href="" className="block">鸣人</a>
                      <span className="text-muted">终于当上火影了！</span>
                    </div>
                  </li>
                </ul>

              </Card>
            </div>
          </Col>
        </Row>
      </div>  

    )
  }
}


export default Index