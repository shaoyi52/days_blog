/**
*新增更新行模态框
**/
import React, { Component } from 'react'
import {Button,Modal, Form, Input, Radio } from 'antd';
import './index.less'
import { connect } from 'react-redux';
import {closeFormModal,updataRow,addNews} from '../../actions/rowFormModal'

const FormItem = Form.Item;

const RowFormModalUI = (props) => {

  const { visible, title, row } = props.rowFormModal
  const { dispatch } =props;
  const { getFieldDecorator } = props.form
  
  //点保存按钮保存数据
  const handleOk = (e) =>{
    e.preventDefault()
    props.form.validateFields((err,fieldsValue)=>{
      if(err){
        return
      }

      if( title==="新增"){
        dispatch(addNews(fieldsValue))
      }else{
        dispatch(updataRow(fieldsValue))
      }

    })
  }
  const onCancel=(e) =>{
    dispatch(closeFormModal())
  }
  const onCreate=(e)=>{
    const form= this.form;
    const _this=this;
    form.validateFields((err,values) =>{
      if(err) {
        return;
      }
      let data=JSON.stringify(values);

      console.log('Received values of form:',values);
    })
  }

  // form 样式
  const formItemLayout = {
    labelCol:{ span:6 },
    wrapperCol: {span:16}
  }

  //重置表单
  const resetForm=()=> {
    console.log("resetForm")
    //props.form.resetFields()
  }

  const switchItem=(item) =>{
    switch (item.type){
      case 'InputNumber':
        return <InputNumber min={item.min} max={item.max} style={{width: '100%'}} />
      case 'Input':
        return <Input/>
      case 'DatePicker':
        return <DatePicker style={{width: '100%'}}/>
      case 'select':
        return (
        <Select>
          {
            item.options.map((option, index) => {
              return (<Option key={index} value={option}>{option}</Option>)
            })
          }
        </Select>
        ) 
      default: 
        return <Input/>     
    }
  }

  return (
    <Modal
      visible={visible}
      title="发布新闻"
      okText="发布"
      onCancel={onCancel}
      visible={visible}
      title={title}
      afterClose={resetForm()}
      footer={[
        <Button key="cancel" size="large" onClick={()=>dispatch(closeFormModal())}>取消</Button>,
        <Button key="save" type="primary" size="large" onClick={handleOk}>保存</Button>
        ]}
    >
          <Form layout="vertical">
            <FormItem label="标题" >
              {getFieldDecorator('title',{
                initialValue:row.title,
                rules: [{ required: true, message: '请输入新闻的标题！'}]
              })(<Input/>)}
            </FormItem>
             <FormItem label="发布人">
               {getFieldDecorator('author',{initialValue:row.author})(<Input/>)}
            </FormItem>
            <FormItem label="内容">
              {getFieldDecorator('content',{initialValue:row.content})(<Input type="textarea"/>)}
            </FormItem>
          </Form>  
    </Modal>

    )
}

const RowFormModal=Form.create()(RowFormModalUI);
const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(RowFormModal)
