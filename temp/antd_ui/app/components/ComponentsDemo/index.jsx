/***
 * Created by yuyi 2017/09/25
 *
 * example:
 *  input Components
 *  
 */
 
import React from 'react';
import classNames from 'classnames';
import omit from 'omit.js'; //语法：omit(obj,[attr1,attr2]) 功用：去除不需要的属性
import './index.less';


function fixControlledValue(value) {
  if(typeof value === 'undefined' || value ===null){
    return '';
  }
  return value;
}

class ComponentDemo extends React.Component {
  constructor (props) {
    super(props)
  }

  getInputClassName(){
    const { prefixCls,size,disabled } = this.props;
    return classNames(prefixCls,{
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-disabled`] :disabled,
    });
  }
  renderLabeledIcon(children) {
    const {props} = this;
    if( !('prefix' in props || 'suffix' in props)){
      return children
    }

    const prefix = props.prefix? (<span className={`${props.prefixCls}-suffix`}>
        {props.suffix}
        </span>
      ):null;
    return (
      <span
        className={classNames(props.className,`${props.prefixCls}-affix-wapper`)}
        style={props.style}
      >
        {prefix}
        {cloneElement(children,{style:null,className:this.getInputClassName()})}
        {suffix}
      </span>
      )
  }

  renderInput(){
    const {value,className} = this.props;
    const otherProps=omit(this.props,['prefixCls','onPressEnter'])
    if(value in this.props){

      otherProps.value=fixControlledValue(value);
    }  
    return <input
      {...otherProps}
      className={classNames(this.getInputClassName(),className)}
      ref="input"
    />
  }

  render () {
    return this.renderInput()
  }
}


export default ComponentDemo