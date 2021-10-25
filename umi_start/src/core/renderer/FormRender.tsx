import React, {memo,RefObject,useEffect} from 'react';
import {Form,InputNumber,Input} from 'antd';

const formItemLayout = {
    labelCol:{span:6},
    wrapperCol:{span:16}
}

const FormEditor = (props)=>{
    const {config,defaultValue,onSave,uid,rightPananelRef} = props;
    const onFinish=(values)=>{
        onSave&&onSave(values);
    }

    const [form]=Form.useForm();

    useEffect(()=>{
        return ()=>{
            form.resetFields();
        }
    },[uid,form])

    const handlechange=()=>{
        onFinish(form.getFieldsValue())
    }

    
    return (
    <Form
        form={form}
        name={'form_editor'}
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={defaultValue}
        onValuesChange={handlechange}
    >
        {config.map((item,i)=>{
            return(
                <React.Fragment key={i}>
                    {item.type==='Number'&&(
                        <Form.Item label={item.name} name={item.key}>
                            <InputNumber max={item.range&&item.range[1]}/>
                        </Form.Item>
                    )}
                    {item.type==='Text'&&(
                        <Form.Item label={item.name} name={item.key}>
                            <Input/>
                        </Form.Item>
                    )}

                </React.Fragment>
            )
        })}
    </Form>)
}
export default FormEditor;