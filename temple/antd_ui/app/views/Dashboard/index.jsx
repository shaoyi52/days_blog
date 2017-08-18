import React from 'react'
import { Row, Col} from 'antd'
import { browserHistory } from 'react-router'

import NavPath from '../../components/NavPath'


import './index.less'

class Index extends React.Component {
    
  render () {

    return (
      <div className="gutter-example button-demo">
        <NavPath />
        <Row className="register-row" type="flex" justify="space-around" align="middle">
          <Col span="8">
           <div>Dashboard</div>
          </Col>
        </Row>
      </div>  

    )
  }
}


export default Index