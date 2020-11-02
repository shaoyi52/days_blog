import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import './styles/index.less';

function noop() {}

export interface AlertProps {
  /**
  * Type of Alert styles, options: 'success', 'info','warning','error'
  */
/*  type?:'success'|'info'|'warning'|'error';
  closable?:boolean;
  closeText?: React.ReactNode;
  message: React.ReactNode;
  description?: React.ReactNode;
  onClose?: React.MouseEventHandler<HTMLAnchorElement>;
  showIcon?:boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  banner?: boolean;*/
}

class Alert extends React.Component {
  constructor () {
    super()
    this.state={
      closing: true,
      colosed:false,
    }
  }

  handleClose=(e: React.MouseEvent<HTMLAnchorElement>)=>{
    console.log("dd");
     let dom = ReactDOM.findDOMNode(this) ;
     dom.style.height = `${dom.offsetHeight}px`;
    // Magic code
    // 重复一次后才能正确设置 height
    dom.style.height = `${dom.offsetHeight}px`;
    this.setState({
      closing: false,
    });
     e.preventDefault();
  }

  render() {
    let { 
      description,closeText,closable,prefixCls = 'ant-alert',message,type,showIcon,banner,className='',style,
    }=this.props;

    // banner 模式默认有Icon
    showIcon = banner && showIcon===undefined? true : showIcon;
    // banner 模式默认为警告
    type= banner && type===undefined? 'warning':type || 'info';

    let iconType = '';
    switch(type){
      case 'success':
        iconType = 'check-circle';
        break;
      case 'info':
        iconType = 'info-circle';
        break;
      case 'error':
        iconType = 'cross-circle' 
        break;
      case 'warning':
        iconType = 'exclamation-circle';
        break;
      default:
        iconType = 'default';
    }

    //use outline icon in alert with description
    if(!!description){
      iconType += '-o';
    } 

    let alertCls = classNames(prefixCls,{
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-close`]: !this.state.closing,
      [`${prefixCls}-with-description`]: !!description,
      [`${prefixCls}-no-icon`]: !showIcon,
      [`${prefixCls}-banner`]: !!banner,
    },className)
    if (closeText) {
      closable = true;
    }

    const closeIcon = closable? (
      <a onClick={this.handleClose} className={`${prefixCls}-close-icon`}>
        {closeText || '点此关闭'}
      </a>
      ):null

    return this.state.closed? null : (
     <div data-show={this.state.closing} className={alertCls}>
        <span className={`${prefixCls}-message`}>{message}</span>
        {closeIcon}
     </div>
    )
  }

}

export default Alert