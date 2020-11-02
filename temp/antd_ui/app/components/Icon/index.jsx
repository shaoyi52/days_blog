/***
 * Created by yuyi 2017/09/25
 *
 * example:
 *  
 *  
 */
 
import React from 'react';
import classNames from 'classnames';
import './index.less';


class Icons extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const classString = classNames({
      'anticon': true,
      'anticon-step-forward': true,
    });

    return(
      <i  className={classString} />
      )
    
  }
}


export default Icons