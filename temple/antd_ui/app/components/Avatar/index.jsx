import * as React from 'react';
import classNames from 'classnames';
import './styles/index.less'
class Avatar extends React.Component {
  static propTypes = {};
  static defaultProps = {
    prefixCls: 'ant-avatar',
    shape: 'circle',
  }
  constructor(props) {
    super(props);
  
    this.state = {
      isImgExist: true,
    };
  }

  onClick = () => {};
  handleImgLoadError = () => this.setState({isImgExist: false})
  
  render() {
    const {
      prefixCls,shape,size,src,icon,className, ...others
    } = this.props;

    const sizeCls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    });

    const classString = classNames(prefixCls,className,sizeCls,{
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-image`]: src,
      [`${prefixCls}-icon`]: icon,
    });

    let children = this.props.children;

    if(src){
      children=(
        <img
          src={src}
          onError={this.handleImgLoadError}
        />
      )
    }else if (icon) {

    }else {

    }
    return (
      <span className={classString} > 
         {children}
      </span>
    );
  }
}


export default Avatar