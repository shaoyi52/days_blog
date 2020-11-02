import React, { Component } from 'react'
import {Button,Modal,message, Form, Input, Radio } from 'antd';
import fetch from 'isomorphic-fetch'
import './index.less'
import { connect } from 'react-redux';

import {fetchNewsList,receiveNews} from '../../actions'
import {openFormModal,changeTitle} from '../../actions/rowFormModal'

const FormItem= Form.Item;

class Search extends React.Component{
  create(){
    console.log('create');
    this.props.dispatch(openFormModal());
    this.props.dispatch(changeTitle("新增"));
  }

  render(){
    return(
      <div>
        <Form layout="inline">
          <FormItem label="标题">
              <Input  placeholder="标题"/>
          </FormItem>
           <FormItem label="作者">
              <Input placeholder="作者"/>
          </FormItem>
          <FormItem>
            <Button type="primary" 
              htmlType="submit"
              className="login-form-button"
            >
              搜索
            </Button>
          </FormItem>
          <FormItem>
             <Button type="primary" onClick={()=>this.create()}>发布</Button>            
          </FormItem>
        </Form>
      </div>
      )
  }
}


const mapStateToProps = (state) => {
    return { newslist: state.newslist };
};

export default connect(mapStateToProps)(Search);
