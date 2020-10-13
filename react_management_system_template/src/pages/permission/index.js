import { Button, Card,Table,Form, Input,Select, message,Tree,Transfer } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import axios from '../../axios';
import Utils from '../../utils/utils';
import menuConfig from '../../config/menuConfig';

const {Option} = Select;

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource:[],
            selectedRowKey:"",
            selectedRow:null,
            visible:false,
            visiblePer:false,
            visibleUser:false,
            roleInfo:{
                id:"",
                role_name:"",
                create_time:"",
                status:"",
                authorize_time:"",
                authorize_user_name:"",
                userListData:[]
            }
         };
    }
    // 创建一个ref
    formRef = React.createRef();
    formRef_User = React.createRef();


    componentDidMount(){
        // this.getRoleList();
    }
    // 获取table
    getRoleList=()=>{
        axios.ajax({
            url:"/role/list",
        }).then((res)=>{
            this.setState({
                dataSource:res.result.item_list.map((item,key)=>{
                    item.key = key;
                    return item;
                })
            })
        })
    }
    // // 点击每一行时
    // onRowClick=(record,index)=>{
    //     let selectedKey = index+1;
    //     console.log(record,selectedKey);
    //     this.setState({
    //         selectedRowKey:selectedKey,
    //         selectedRow:record
    //     })
    // }

    // 创建角色
    onhandleAddRole=(title)=>{
        this.setState({
            title:title,
            visible:true
        })
    }
    // 取消提交
    handleCancel=()=>{
        this.setState({
            visible:false
        })
    }
    // 提交
    handleOk=(info)=>{
        console.log(info);
        message.success("添加角色成功");
        this.setState({
            visible:false
        })
        // 发送请求
        // axios.ajax({
        //     url:"role/add",
        //     data:{
        //         param:{
        //             info
        //         }
        //     }
        // }).then((res)=>{
        //     if(res.code=='0'){
        //         message.success(res.msg);
        //         this.setState({
        //             visible:false
        //         })
        //     }
        // })

    }

    // 设置权限
    onhandleAddPerm=(title)=>{
        let item = this.state.selectedRow;
        if(!item){
            message.error("请先选择一个角色")
            return;
        }
        console.log(item)
        let role_id = item.role_name;
        let role_name = "";
        if(role_id==1){
            role_name="管理人员";
        }else if(role_id==2){
            role_name="财务人员";
        }else if(role_id==3){
            role_name="市场人员";
        }
        let state = item.status;
        this.formRef.current.setFieldsValue({
            role_name:role_name,
            state:state
        })

        // let data = Object.assign({},this.state.roleInfo,{id:item.id,role_name:role_name,create_time:item.create_time,status:item.status,authorize_time:item.authorize_time,authorize_user_name:item.authorize_user_name});

        this.setState({
            title:title,
            visiblePer:true,
            menuInfo:item.menus
        })      

    }

    // 用户设置权限
    onhandleAddUser=(title)=>{
        let item = this.state.selectedRow;
        if(!item){
            message.error("请先选择一个角色")
            return;
        }

        let role_id = item.role_name;
        let role_name = "";
        if(role_id==1){
            role_name="管理人员";
        }else if(role_id==2){
            role_name="财务人员";
        }else if(role_id==3){
            role_name="市场人员";
        }
        
        this.formRef_User.current.setFieldsValue({
            role_name:role_name,
        })

        this.setState({
            title:title,
            visibleUser:true
        })
         // 筛选出符合要求的
        this.getUserRole();


    }

    componentDidMount(){
        // 获取所有数据
        this.getUserRoleList();
       
    }

    // 获取用户框
    getUserRoleList=()=>{
        axios.ajax({
            url:"/role/add_user"
        }).then((res)=>{
            if(res.code=='0'){
                this.setState({
                    userListData:res.result.item_list
                })
            }
        })
    }
    // 筛选出符合要求的用户
    getUserRole=()=>{
        const dataSource = this.state.userListData;
        const targetKeys = [];
        const mockData = [];
        for(let i=0;i<dataSource.length;i++){
            const data = {
                key:dataSource[i].user_id,
                title:dataSource[i].user_name,
                status:dataSource[i].status
            }
            if(data.status==1){
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }

        this.setState({
            mockData,targetKeys
        });

        console.log(mockData)
        console.log(targetKeys)

    }

    // 设置权限确认框
    handleCancelPer=()=>{
        this.setState({
            visiblePer:false
        })
    }

    // 渲染结点
    // renderTreeNodes=(data)=>{
    //     return data.map((item)=>{
    //         if(item.children){
    //             return <TreeNode title={item.title} key={item.key}> 
    //                 {this.renderTreeNodes(item.children)}
    //             </TreeNode>
    //         }else{
    //             return <TreeNode {...item}/>
    //         }
    //     })
    // }


    onCheck=(checkedKeys)=>{
        // console.log(checkedKeys)
        this.setState({
            menuInfo:checkedKeys
        })
    }

    // 提交
    handleOkPer=(info)=>{
        let role_name = info.role_name;
        let state = info.state;
        let menuPer = this.state.menuInfo;
        console.log(role_name,state,menuPer);
        this.setState({
            visiblePer:false
        })
    }

    handleCancelUser=()=>{
        this.setState({
            visibleUser:false
        })
    }
    
    
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    }
    
    handleChange = targetKeys => {
        this.setState({ targetKeys });
      };
    
    
    // 提交
    handleOkUser=(info)=>{
        let role_name = info.role_name;
        let targetKeys = this.state.targetKeys;
        console.log(role_name,targetKeys);
        // 发送请求
        axios.ajax({
            url:"role/role_edit",
            data:{
                role_name:role_name,
                targetKeys:targetKeys
            }
        }).then((res)=>{
            if(res.code=='0'){
                message.success(res.msg)
            }
            this.setState({
                visibleUser:false
            })
        })
    }

    render() {
        const columns = [
            {
                title:"角色ID",
                dataIndex:"id",
            },
            {
                title:"角色名称",
                dataIndex:"role_name",
                render(role_name){
                    if(role_name==1){
                        return "管理人员";
                    }else if(role_name==2){
                        return "财务人员";
                    }else if(role_name==3){
                        return "市场人员";
                    }
                }
            },
            {
                title:"创建时间",
                dataIndex:"create_time",
                render:Utils.formateDate
            },
            {
                title:"使用状态",
                dataIndex:"status",
                render(status){
                    if(status==0){
                        return "弃用";
                    }else if(status==1){
                        return "启用";
                    }
                }
            },
            {
                title:"授权时间",
                dataIndex:"authorize_time",
            },
            {
                title:"授权人",
                dataIndex:"authorize_user_name",
            }
        ]
        
        const dataSource = [
            {
              key: '1',
              id:'1',
              role_name: '1',
              create_time: '2020-10-2',
              status: '1',
              authorize_time:'2020-10-12',
              authorize_user_name:"小天",
              menus:[
                "/admin/home",
                "/admin/publish_articles",
                "/admin/manage_blog",
                "/admin/manage_articles",
                "/admin/manage_comment",
                "/admin/manage_column",
                "/admin/subscribe_colum",
                "/admin/move_blog",
                "/admin/reward_blog",
                "/admin/setting_blog",
                "/admin/card"
              ]
            },
            {
                key: '2',
                id:'2',
                role_name: '2',
                create_time: '2020-10-2',
                status: '1',
                authorize_time:'2020-10-12',
                authorize_user_name:"小天",
                menus:[
                    "/admin/statistics",
                    "/admin/manage_download",
                    "/admin/activities"
                ]
              },
              {
                key: '3',
                id:'3',
                role_name: '3',
                create_time: '2020-10-2',
                status: '0',
                authorize_time:'2020-10-12',
                authorize_user_name:"小天",
                menus:[
                    "/admin/manage_echarts",
                    "/admin/manage_echarts/bar",
                    "/admin/manage_echarts/pie",
                    "/admin/manage_echarts/line"
                ]
              },
          ];

    
        const rowSelection = {
            type:"radio",
            
            onSelect:(selectedRow,selected)=>{
                this.setState({
                    selectedRow:selectedRow
                })
            
            }
        }

        // 弹出框样式
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:19}
        }

        
        return (
            <div>
                <Card className="card-wrap">
                    <Button type="primary" onClick={()=>this.onhandleAddRole("创建角色")}>创建角色</Button>
                    <Button type="primary" onClick={()=>this.onhandleAddPerm("设置权限")}>设置权限</Button>
                    <Button type="primary" onClick={()=>this.onhandleAddUser("用户授权")}>用户授权</Button>
                </Card>
                <Card className="card-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={dataSource}
                       
                        // onRow={(record,index) => {
                        //     return {
                        //         onClick: () => {
                        //             this.onRowClick(record,index);
                        //         }, // 点击行
                        //         onDoubleClick: event => {},
                        //         onContextMenu: event => {},
                        //         onMouseEnter: event => {}, // 鼠标移入行
                        //         onMouseLeave: event => {},
                        //     };
                        //   }}
                        rowSelection={rowSelection}
                    >
                    </Table>
                </Card>
                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Form onFinish={this.handleOk}>
                        <Form.Item   label="角色名称" name="role_name" {...formItemLayout} >
                            <Input  placeholder="请输入角色名称"/>
                        </Form.Item>

                        <Form.Item label="状态" name="state" {...formItemLayout} rules={[{required:true,message:"请选择角色状态！"}]}>
                            <Select placeholder="启用">
                                <Option value="1">启用</Option>
                                <Option value="2">弃用</Option>
                            </Select>
                        </Form.Item>
                        
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{margin:'0 60px'}}>确认</Button>
                            <Button type="primary" onClick={this.handleCancel}>取消</Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title={this.state.title}
                    visible={this.state.visiblePer}
                    footer={null}
                    onCancel={this.handleCancelPer}
                    forceRender={true}
                >   
                    {/*ref绑定到form*/}
                    <Form ref={this.formRef} onFinish={this.handleOkPer}>
                        <Form.Item label="角色名称" name="role_name" {...formItemLayout} rules={[{required:true,message:"请输入用户名！"}]}>
                            <Input disabled placeholder="请输入角色名称"/>
                        </Form.Item>

                        <Form.Item label="状态" name="state" {...formItemLayout} rules={[{required:true,message:"请选择角色状态！"}]}>
                            <Select placeholder="启用">
                                <Option value="1">启用</Option>
                                <Option value="2">弃用</Option>
                            </Select>
                        </Form.Item>
                        
                            <Tree
                                checkable
                                defaultExpandAll
                                treeData={menuConfig}
                                checkedKeys={this.state.menuInfo}
                                onCheck={(checkedKeys)=>{
                                    this.onCheck(checkedKeys);
                                }}
                            >
                                {/* <TreeNode title="平台权限" key="platform_all">
                                    {this.renderTreeNodes(menuConfig)}
                                </TreeNode> */}
                            </Tree>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{margin:'0 60px'}}>确认</Button>
                            <Button type="primary" onClick={this.handleCancelPer}>取消</Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title={this.state.title}
                    visible={this.state.visibleUser}
                    footer={null}
                    onCancel={this.handleCancelUser}
                    forceRender={true}
                >  
                    {/*ref绑定到form*/}
                    <Form ref={this.formRef_User} onFinish={this.handleOkUser}>
                        
                        <Form.Item label="角色名称" name="role_name" {...formItemLayout} >
                            <Input disabled/>
                        </Form.Item>

                        <Form.Item label="选择用户"{...formItemLayout} >
                            <Transfer
                                listStyle={{width:200,height:400}}
                                title={["待选用户","已选用户"]}
                                dataSource={this.state.mockData}
                                targetKeys={this.state.targetKeys}
                                showSearch
                                searchPlaceholder="输入用户名"
                                filterOption={this.filterOption}
                                onChange={this.handleChange}	
                                render={item => item.title}
                            />
                        </Form.Item>
                        
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{margin:'0 60px'}}>确认</Button>
                            <Button type="primary" onClick={this.handleCancelUser}>取消</Button>
                        </Form.Item>

                    </Form>
                </Modal>

            </div>
        );
    }
}

export default index;