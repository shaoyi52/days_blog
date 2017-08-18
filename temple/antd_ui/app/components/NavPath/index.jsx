/***
 * Created by yuyi 2017/08/18
 *
 * example:
 *  const navData=[{key:1,name:'',link:''},{key:1,name:'',link:''}]
 *  <NavPath data={navData}  />
 */
 
import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb} from 'antd'
import { Link } from 'react-router';
import './index.less'

const defaultProps = {
  data: []
}

const propTypes = {
  data: PropTypes.array
}
class NavPath extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {data}=this.props;    
    const bread = data.map((item)=>{
      return (
        <Breadcrumb.Item key={'bc-'+item.key}>
          <Link to={item.link}>{item.name}</Link>
        </Breadcrumb.Item>
      )
    })

    return(
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item key='bc-0'>
          <Link to={'/'}>首页</Link>
        </Breadcrumb.Item>
        {bread}
      </Breadcrumb>
      )
    
  }
}

NavPath.propTypes = propTypes;
NavPath.defaultProps = defaultProps;

export default NavPath