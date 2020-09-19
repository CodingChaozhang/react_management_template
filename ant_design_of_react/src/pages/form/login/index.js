import React from 'react';
import { Form, Input, Button, Checkbox,Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:'',
            password:''
         };
    }

    onInputChange=(e)=>{
        let inputname = e.target.name;
        let inputvalue = e.target.value;
        this.setState({
            [inputname]:inputvalue
        })
    }

    onhandleSubmit=()=>{
        console.log(this.state.username,this.state.password)
    }

    render() {
        return (
            <div>
                <Card title="内敛表单" className="card-wrap-login">
                    <Form  name="horizontal_login" layout="inline">
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="外联表单" className="card-wrap">
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }}>
                        <Form.Item  rules={[{ required: true, message: '请输入用户名！！！' }]}>
                            <Input name="username" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" onChange={this.onInputChange} />
                        </Form.Item>
                        <Form.Item rules={[{ required: true, message: '请输入密码！！！' }]}>
                            <Input name="password" prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" onChange={this.onInputChange}/>
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.onhandleSubmit}>
                             登录
                            </Button>
                        
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default index;