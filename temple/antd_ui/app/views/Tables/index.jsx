import React from 'react'
import { Row, Col,Card,Button, Radio,Icon,Menu,Dropdown} from 'antd'
import { browserHistory } from 'react-router'

import NavPath from '../../components/NavPath'
import BasicTable from './BasicTable';

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
    const navData=[{kye:1,name:'表格'},{kye:2,name:'基楚表格'}]

    return (
      <div className="gutter-example button-demo">
        <NavPath data={navData} />
        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <div className="gutter-box">
                <Card  title="基础表格" bordered={false}>
                  <BasicTable/>
                </Card>
            </div>
          </Col>
         
        </Row>
    
      </div>  

    )
  }
}


export default Index