import React from 'react'
import { Form, Input,  Icon,  Row, Col,Card } from 'antd';
import './index.less'
import NavPath from '../../components/NavPath'
import LoginForm from './LoginForm'
import RegistForm from './RegistForm'
import HorizontalForm from './HorizontalForm'
import ModalForm from './ModalForm'

class RegistrationForm extends React.Component {

  render() {
    const navData=[{kye:1,name:'表单'},{kye:2,name:'基楚表单'}]

    return (
      <div className="gutter-example">
        <NavPath data={navData} />
        <Row gutter={16}>
          <Col className="gutter-row" md={12}>
            <div className="gutter-box">
              <Card title="注册表单" bordered={false}>
                <RegistForm/>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={12}>
            <div className="gutter-box">
              <Card title="登录表单" bordered={false}>
                 <LoginForm />
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" md={12}>
            <div className="gutter-box">
              <Card title="水平表单" bordered={false}>
                <HorizontalForm/>
              </Card>
            </div>  
          </Col>
          <Col className="gutter-row" md={12}>
            <div className="gutter-box">
              <Card title="弹层表单" bordered={false}>
                <ModalForm/>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm