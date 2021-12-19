import Block from '@components/Block';
import Heading from '@components/Heading';
import withEditable from '@components/hoc/withEditable';
import Tip from '@components/Tip';
import { Button, Checkbox, DatePicker, Form, Input, Tabs } from 'antd';
import React, { FC, useState } from 'react';
// import './style';

const { TabPane } = Tabs;
const UserNameHeading = withEditable(Heading, { level: 2, weight: false, style: { marginBottom: 0 }});
const SignatureTip = withEditable(Tip);
const UserBasisInfo: FC<ComponentProps> = (props) => {
    const [userInfo, setUserInfo] = useState({
        userNick: '云淡风轻',
        remember: true
    });
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Block className='user-basis-info form-wrapper mv-10 ph-20 pv-40'>
            <Form
                name='userBasisInfo'
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 6 }}
                initialValues={userInfo}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
            >
                <Form.Item
                    label='昵称'
                    name='userNick'
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='出生日期'
                    name='birthDay'
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label='电话号码'
                    name='phone'
                >
                    <Input type={'tel'} />
                </Form.Item>
                <Form.Item
                    label='电子邮件'
                    name='email'
                >
                    <Input type={'email'} />
                </Form.Item>
                <Form.Item
                    label='出生日期'
                    name='birthDay'
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label='Password'
                    name='password'
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type='primary' htmlType='submit'>
          Submit
                    </Button>
                </Form.Item>
            </Form>
        </Block>
    );
};

export default UserBasisInfo;
