import React from 'react';
import {Card,Button, Table,Modal,Form,Input,Radio,Select,DatePicker,message,Popconfirm} from 'antd';
import axios from '../../axios';
import './index.less';
import moment from 'moment';
import 'moment/locale/zh-cn';

const { Option } = Select;

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource:[],
            selectedRowKeys:[],
            selectedRows:null,
            visible:false,
            title:"",
            userInfo:{
                username:"",
                sex:"",
                state:"",
                birthday:"",
                address:""
            },
            modifiable:true,
            confirm_visible:false,
            flag:false
         };
    }
    
 


    componentDidMount(){
        this.getUserList();
    }

    // 获取数据接口数据
    getUserList=()=>{
        let _this= this;

        axios.ajax({
            url:"/order/user_list",
            
        }).then((res)=>{
            this.setState({
                dataSource:res.result.item_list.map((item,index)=>{
                    item.key = index;
                    return item;
                })
            })
        })
    }

    // 点击每行便可获取行信息
    onRowClick=(record,index)=>{
        let selectedKey = [index];

        // Modal.info({
        //     title:"信息",
        //     content:`用户:${record.userName}`
        // })
        console.log(selectedKey,record)
        this.setState({
            selectedRowKey:selectedKey,
            selectedItem:record,
        })

    }

    //创建员工的模态框
    onhandleAddUser(title){
        this.setState({
            title:title,
            visible:true,
            modifiable:true,
        })

    }
    
    // 员工详情的模态框
    onhandleUserInfo(title){
        // 员工详情需先判断是否选定员工了
        if(this.state.selectedRowKeys.length==1){
            // console.log(this.state.selectedRows);
            // 对其赋值
            var selectedRow = this.state.selectedRows;
            let data = Object.assign({},this.state.userInfo,{username:selectedRow[0].username,sex:selectedRow[0].sex,state:selectedRow[0].state,birthday:selectedRow[0].birthday,address:selectedRow[0].address})
            console.log(selectedRow[0])
            this.setState({                
                userInfo:data,
                title:title,
                visible:true,
                modifiable:false
            })
            // console.log(this.state.userInfo);

        }else if(this.state.selectedRowKeys.length>1){
            message.error("请只选择一个员工来查看")
        }else if(this.state.selectedRowKeys.length<1){
            message.error("请选择一个要查看的员工");
        }   
        
    }

    // 成员编辑功能
    onhandleEditUser=(title)=>{
        if(this.state.selectedRowKeys.length==1){
            var selectedRow = this.state.selectedRows;
            let data = Object.assign({},this.state.userInfo,{username:selectedRow[0].username,sex:selectedRow[0].sex,state:selectedRow[0].state,birthday:selectedRow[0].birthday,address:selectedRow[0].address})
            console.log(selectedRow[0])
            this.setState({                
                userInfo:data,
                title:title,
                visible:true,
                modifiable:true,
            })
        }else if(this.state.selectedRowKeys.length>1){
            message.error("请只选择一个员工来编辑")
        }else if(this.state.selectedRowKeys.length<1){
            message.error("请选择一个要编辑的员工");
        }   
    }

    // 删除员工
    onhandleDeleteUser=(title)=>{
        if(this.state.selectedRowKeys.length==1){
            let _this = this;
            Modal["confirm"]({
                title:"确定？",
                content:"你确定要删除该成员了吗？",
                okText:"确认",
                cancelText:"取消",
                onOk(){
                    var selectedRow = _this.state.selectedRows;
                    var userInfo = selectedRow[0];
                        axios.ajax({
                            url:"/order/delete_user",
                            data:{
                                param:{
                                    userInfo
                                }
                            }
                        }).then((res)=>{
                            message.success(res.msg);
                            _this.getUserList();
                        })
                },
                onCancel(){
                    
                }
            })

        }else if(this.state.selectedRowKeys.length>1){
            message.error("请只选择一个员工来删除")
        }else if(this.state.selectedRowKeys.length<1){
            message.error("请选择一个要删除的员工");
        }   
    }


    // 模态框取消
    handleCancel=()=>{
        this.setState({
            visible:false
        })


    }
    // 模态框的确认
    handleOk=(info)=>{

        const state_list = ["工作","在校","待业"]
        var username = info.username;
        var sex = info.sex==1?"男":"女";
        var state = state_list[info.state-1];
        var birthday = info.birthday.format('YYYY-MM-DD');
        var address = info.address;
        console.log(username,sex,state,birthday,address);
        // 模拟发送请求
        axios.ajax({
           url:"/order/add_user",
           data:{
               param:{
                  info
               }
           } 
        }).then((res)=>{
           if(res.code=='0'){
               message.success(res.msg);
               this.setState({
                   visible:false
               })
               this.getUserList();
           }
        })


    }
    
    render() {
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        const columns = [
            {
                title:"id",
                dataIndex:"id",
            },
            {
                title:"用户名",
                dataIndex:"username",
            },
            {
                title:"性别",
                dataIndex:"sex",
                render(sex){
                    return sex==1?"男":"女";
                }
            },
            {
                title:"状态",
                dataIndex:"state",
                render(state){
                    if(state == 1){
                        return "工作";
                    }else if(state == 2){
                        return "在校";
                    }else if(state == 3){
                        return "待业";
                    }
                }
            },
            {
                title:"爱好",
                dataIndex:"hobby",
                render(hobby){
                    return hobby==1?"跑步":"散步";
                }
            },
            {
                title:"生日",
                dataIndex:"birthday",
            },
            {
                title:"联系地址",
                dataIndex:"address",
            }
        ]

        // 多选框
        const selectedRowKeys = this.state.selectedRowKeys;
        
        const rowCheckSelection = {
           type:"checkbox",
           selectedRowKeys,
           onChange:(selectedRowKeys,selectedRows)=>{
               this.setState({
                   selectedRowKeys,
                   selectedRows
               })
           }
        }

        // 弹出框的样式
        const forItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }

    
        return (
            
            <div>
                <Card className="card-wrap">
                    <Button type="primary" onClick={()=>this.onhandleAddUser("新增员工")}>创建员工</Button>
                    <Button type="primary" onClick={()=>this.onhandleEditUser("编辑员工")}>编辑员工</Button>
                    <Button type="primary" onClick={()=>this.onhandleUserInfo("员工详情")}>员工详情</Button>
                    <Button type="primary" onClick={()=>this.onhandleDeleteUser("删除员工")}>删除员工</Button>
                </Card>
                <Card className="card-table">
                    <Table bordered
                           columns={columns}
                           dataSource={this.state.dataSource}
                           onRow={(record,index)=>{
                               return{
                                onClick: ()=>{
                                    this.onRowClick(record,index);
                                }, // 点击行
                                onDoubleClick: event => {},
                                onContextMenu: event => {},
                                onMouseEnter: event => {}, // 鼠标移入行
                                onMouseLeave: event => {},
                               };
                           }}
                           rowSelection={rowCheckSelection}
                           >
                    </Table>
                </Card>

                <Modal 
                    title={this.state.title}
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Form onFinish={this.handleOk}
                          
                        //   initialValues={{
                        //         ["username"]:this.state.userInfo.username,
                        //         ["sex"]:this.state.userInfo.sex,
                        //         ["state"]:this.state.userInfo.state,
                        //         ["birthday"]:moment(this.state.userInfo.birthday==''?date:this.state.userInfo.birthday, 'YYYY-MM-DD'),
                        //         ["address"]:this.state.userInfo.address
                        //   }}
                    >
                        <Form.Item initialValue={this.state.userInfo.username} label="用户名" name="username" {...forItemLayout} rules={[{ required: true, message: '请输入用户名!' }]} >
                           <Input placeholder="请输入用户名" disabled={!this.state.modifiable}/>
                        </Form.Item>
                        
                        <Form.Item  initialValue={this.state.userInfo.sex}  label="性别" name="sex" {...forItemLayout} rules={[{ required: true, message: '请选择您的性别!' }]}>
                            <Radio.Group disabled={!this.state.modifiable}>
                                <Radio value={1} >男</Radio>
                                <Radio value={2} >女</Radio>
                           </Radio.Group>
                        </Form.Item>

                        <Form.Item initialValue={this.state.userInfo.state} label="状态" name="state" {...forItemLayout} rules={[{ required: true, message: '请选择您目前的状态!' }]}>
                           <Select placeholder="工作" disabled={!this.state.modifiable}>
                               <Option value="1" >工作</Option>
                               <Option value="2">在校</Option>
                               <Option value="3">待业</Option>
                           </Select>
                        </Form.Item>
                        
                        <Form.Item initialValue={moment(this.state.userInfo.birthday==''?date:this.state.userInfo.birthday, 'YYYY-MM-DD')} label="生日" name="birthday" {...forItemLayout} rules={[{ required: true, message: '请选择您的生日!' }]}> 
                           <DatePicker disabled={!this.state.modifiable}/>
                        </Form.Item>

                        <Form.Item initialValue={this.state.userInfo.address}  label="联系地址" name="address" {...forItemLayout} rules={[{ required: true, message: '请输入您的联系地址!' }]}>
                           <Input.TextArea disabled={!this.state.modifiable}/>
                        </Form.Item>

                        <Form.Item>
                           <Button type="primary" htmlType="submit" style={{margin:'0 120px'}} disabled={!this.state.modifiable} >确认</Button>
                           <Button type="primary" onClick={this.handleCancel} >取消</Button>
                        </Form.Item>
                    </Form>
                </Modal>

            </div>
        );
    }
}

export default index;