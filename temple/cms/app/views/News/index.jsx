import React from 'react'
import { Row, Col,Card,Button, Form, Input,Radio,Icon,Menu,Dropdown} from 'antd'
import { browserHistory } from 'react-router'

import NavPath from '../../components/NavPath'
import BasicTable from './BasicTable';
//import NewsAdd from './NewsAdd';
import ModalForm from './ModalForm';
import Search from './Search';

import './index.less'

const FormItem= Form.Item;



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
    const navData=[{kye:1,name:'新闻中心'},{kye:2,name:'新闻列表'}]

    return (
      <div className="gutter-example button-demo">
        <NavPath data={navData} />
        <Row gutter={16}>
          <Col className="gutter-row" span={24}>
            <div className="gutter-box">
                <Card  title="基础表格" bordered={false}>
                  <Search/>
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