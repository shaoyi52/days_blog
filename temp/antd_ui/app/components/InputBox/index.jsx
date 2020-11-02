import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Row, Col, Icon, Badge,Popover,Dropdown,Avatar,Menu } from 'antd'
import './index.less'


class Input extends React.Component {
  constructor () {
    super()
  }

  handleLogOut(){

  }
  renderInput(){
    const {value, className}=this.props;
    const otherProps = omit(this.props,[
      'prefixCls',
      ]);

  }

  render() {
    const { className,grid,type,size,readOnly,value,...other} = this.props
    if(this.props.type === 'textarea'){
      return <TextArea {...this.props as any} ref="input" />
    }
    return this.renderLabeledInput(this.renderInput());
  }

}

export default Input