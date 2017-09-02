import React, { Component } from 'react'
import {Button,Modal,message, Form, Input, Radio } from 'antd';
import fetch from 'isomorphic-fetch'
import './index.less'
import { connect } from 'react-redux';

import {fetchNewsList,receiveNews} from '../../actions'


const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    (props) => {
      const { visible,onCancel,onCreate,form } = props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="发布新闻"
          okText="发布"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="标题" >
              {getFieldDecorator('title',{
                rules: [{ required: true, message: '请输入新闻的标题！'}]
              })(<Input/>)}
            </FormItem>
             <FormItem label="发布人">
               {getFieldDecorator('author')(<Input/>)}

              
            </FormItem>
            <FormItem label="内容">
              {getFieldDecorator('content')(<Input type="textarea"/>)}
            </FormItem>
          </Form>

        </Modal>
        )
    }
)
const info=(msg)=>{
  message.info(msg);
}

class ModalForm extends Component{
  state = {
    visible: false,
    errtips:false,
  };
  componentWillMount(){
    const {dispatch,newslist} = this.props;
  }

  showModal=() =>{
    this.setState({visible:true});
  };

  handleCancel=() =>{
    this.setState({visible:false});
  };

  handleCreate=() =>{
    const form= this.form;
    const _this=this;
    form.validateFields((err,values) =>{
      if(err) {
        return;
      }
      let data=JSON.stringify(values);

      fetch("http://localhost:3000/api/news/add",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:data,
      }).then(res=>{
        if(res.ok){
          return res.json()
        }
        
      }).then(json=>{
        if(json.code==0){
           info(json.message);
            form.resetFields();
            _this.setState({visible:false})
            _this.props.dispatch(fetchNewsList())
          }else{
            info(json.message);
          }
      })

      console.log('Received values of form:',values);
    })
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  render(){
    return(
      <div>
        <Button type="primary" onClick={this.showModal}>发布</Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
      )
  }
}

const mapStateToProps = (state) => {
    return { newslist: state.newslist };
};

export default connect(mapStateToProps)(ModalForm);
