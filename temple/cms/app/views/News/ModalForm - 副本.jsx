/**
*新增更新行模态框
**/
import React, { Component } from 'react'
import {Button,Modal, Form, Input, Radio } from 'antd';
import './index.less'

const FormItem = Form.Item;

const RowFormModalUI = (props) => {
  const { visible, title, row } = props.RowFormModal
  const { dispatch } =props;
  const { getFieldDecorator } = props.Form

  //点保存按钮保存数据
  const handleOk = (e) =>{
    e.preventDefault()
    props.form.validateFields((err,fieldsValue)=>{
      if(err){
        return
      }

      if( title==="新增"){
        dispatch(createRow(fieldsValue))
      }else{
        dispatch(updateRow(fieldsValue))
      }

    })
  }

  // form 样式
  const formItemLayout = {
    labelCol:{ span:6 },
    wrapperCol: {span:16}
  }

  //重置表单
  const resetForm=()=> {
    props.form.resetFields()
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
      title={title}
      closable={false}
      afterClose={resetForm}
      footer={[
        <Button key="cancel" size="large" onClick={()=>dispatch(closeFormModal())}>取消</Button>
        <Button key="save" type="primary" size="large" onClick={handleOk}>保存</Button>
        ]}
    >
      <Form>
        {
          row.map((item)=> {
            return (
              <FormItem
                label={item.title}
                {...formItemLayout}
                key={item.dataIndex}
              >
                {getFieldDecorator(item.dataIndex,{
                  initialValue: item.value,
                  rules:[{
                    required: item.required,
                    message: item.errorMessage
                  }]
                })(
                  switchItem(item)
                )}
              </FormItem>
              )
          })
        }
      </Form>
    </Modal>

    )
}

const RowFormModal=Form.create()(RowFormModalUI);

export default connect(mapStateToProps)(RowFormModal)
