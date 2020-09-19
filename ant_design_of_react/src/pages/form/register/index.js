import React from 'react';
import { Form, Input, Button, Checkbox,Card,Radio,InputNumber,Select,Switch,DatePicker,Upload } from 'antd';
import { UserOutlined, LockOutlined,LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import './index.less';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }

    getBase64=(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              userImg:imageUrl,
              loading: false,
            }),
          );
        }
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          };

        const offsetLayout={
            wrapperCol:{
                xs:24,
                sm:{
                    span:16,
                    offset:6
                }
            }
        }
        
        const RadioGroup = Radio.Group;
        const { Option } = Select;
        const TextArea = Input.TextArea;
 
        

        return (
            <div>
                <Card title="注册表单" className="card-wrap">
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }}>
                            <Form.Item {...formItemLayout} name="username" label="用户名" rules={[{ required: true, message: '请输入用户名！！！' }]}>
                                <Input name="username" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" onChange={this.onInputChange} />
                            </Form.Item>
                            <Form.Item {...formItemLayout} name="password" label="密码" rules={[{ required: true, message: '请输入密码！！！' }]}>
                                <Input name="password" prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" onChange={this.onInputChange}/>
                            </Form.Item>

                            <Form.Item {...formItemLayout} name="sex" label="性别" rules={[{ required: true }]}>
                                <RadioGroup defaultValue="1">
                                    <Radio value="1">男</Radio>
                                    <Radio value="2">女</Radio>
                                </RadioGroup>
                            </Form.Item>

                            <Form.Item {...formItemLayout} name="age" label="年龄" rules={[{ required: true }]}>
                                <InputNumber min={1} max={100} defaultValue={18}/>
                            </Form.Item>

                            <Form.Item {...formItemLayout} name="state"  label="状态" rules={[{ required: true }]}>
                                <Select defaultValue="3">
                                    <Option value="1">上学</Option>
                                    <Option value="2">工作</Option>
                                    <Option value="3">财富自由</Option>
                                </Select>
                            </Form.Item>
                            
                            <Form.Item {...formItemLayout} name="hobby"  label="爱好" rules={[{ required: true }]}>
                                <Select mode="multiple" defaultValue="4">
                                    <Option value="1">游泳</Option>
                                    <Option value="2">打篮球</Option>
                                    <Option value="3">踢足球</Option>
                                    <Option value="4">跑步</Option>
                                    <Option value="5">爬山</Option>
                                    <Option value="6">骑行</Option>
                                    <Option value="7">桌球</Option>
                                    <Option value="8">麦霸</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item {...formItemLayout} name="is_married" label="是否已婚">
                               <Switch defaultChecked/>
                            </Form.Item>

                            <Form.Item {...formItemLayout} name="time" label="生日">
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
                            </Form.Item>

                            <Form.Item {...formItemLayout} name="address" label="地址">
                               <TextArea/>
                            </Form.Item>


                            <Form.Item {...formItemLayout} name="icon" label="头像">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    onChange={this.handleChange}
                                >
                                {this.state.userImg ? <img src={this.state.userImg} alt="avatar" style={{ width: '100%' }} /> : <PlusOutlined />}
                                </Upload>
                            </Form.Item>

                            <Form.Item {...offsetLayout} name="xieyi" >
                                <Checkbox>我已阅读过<a href="#">协议</a></Checkbox>
                            </Form.Item>

                            <Form.Item {...offsetLayout} name="register" >
                               <Button type="primary" >注册 </Button>
                            </Form.Item>

                        </Form>
                </Card>
            </div>
        );
    }
}

export default index;