import React from 'react';
import {Button,Modal,Card,Table, message, Badge} from 'antd';
import './index.less';
import axios from '../../../axios/index';
import Utils from '../../../utils/utils';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSource:[]
         };
    }

    param = {
        page :1
    }
    componentDidMount(){
          this.request();
    }


    request=()=>{
        let _this = this
        axios.ajax({
            url:'table/list',
            data:{
                param:{
                    page:this.param.page
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    dataSource:res.result.list,
                    pagination:Utils.pagination(res,(current)=>{
                        _this.param.page = current;
                        this.request();
                    })
                   
                })
            }
        })
    }

    handleChange=(pagination, filters, sorter)=>{
        this.setState({
            sortOrder:sorter.order
        })
    }
   
    handleDelete=(item)=>{
        let id = item.id;
        Modal.confirm({
            title:"确定",
            content:"你确定要删除吗？",
            onOk:()=>{
                message.success("删除成功");
                this.request();
            }
        })
    }

    render() {

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width:80
            },
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
              width:80
            },
            {
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
              width:80
            },
            {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
              width:80
            },
            {
                title:'爱好',
                dataIndex:'hobby',
                width:80,
                key:'hobby',
                render(hobby){
                    let config = {
                        '1':"跑步",
                        "2":"散步"
                    }
                    return config[hobby]
                }
            }
          ];

          const columns2 = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width:80
            },
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
              width:80
            },
            {
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
              width:80
            },
            {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
              width:80
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width:80
              },
              {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width:80
              },
              {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width:80
              },
              {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width:80
              },
              {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width:80
              },
              {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width:80
              },
              {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width:80
              },
              {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width:80
              },
              {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width:80
              },
              {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width:80
              },
              {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width:80
              },
              {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width:80
              },
              {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width:80
              },
            {
                title:'爱好',
                dataIndex:'hobby',
                width:80,
                key:'hobby',
                render(hobby){
                    let config = {
                        '1':"跑步",
                        "2":"散步"
                    }
                    return config[hobby]
                }
            }
          ];
          
          const columns3 = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width:80
            },
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
              width:80
            },
            {
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
              width:80,
              sorter:(a,b)=>{
                  return a.age-b.age;
              },
              sortOrder:this.state.sortOrder
            },
            {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
              width:80
            },
            {
                title:'爱好',
                dataIndex:'hobby',
                width:80,
                key:'hobby',
                render(hobby){
                    let config = {
                        '1':"跑步",
                        "2":"散步"
                    }
                    return config[hobby]
                }
            }
          ];

          const columns4 = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              render:(text,item)=>{
                  return <Button  size="small" onClick={()=>this.handleDelete(item)}>删除</Button>
              }
            },
            {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
            },
            {
                title:'爱好',
                dataIndex:'hobby',
                key:'hobby',
                render(hobby){
                    let config = {
                        '1':<Badge status="success" text="跑步"/>,
                        "2":<Badge status="error" text="散步"/>
                    }
                    return config[hobby]
                }
            }
          ];

        return (
            <div>
                <Card title="高级表格-头部固定" className="wrap">
                    <Table bordered dataSource={this.state.dataSource} columns={columns} scroll={{y:240}}/>
                </Card>

                <Card title="左部表格渲染" className="wrap">
                    <Table bordered dataSource={this.state.dataSource} columns={columns2} scroll={{x:1700}}/>
                </Card>

                <Card title="表格排序" className="wrap">
                    <Table bordered dataSource={this.state.dataSource} columns={columns3} scroll={{y:240}}
                           onChange={this.handleChange}/>
                </Card>


                <Card title="表格嵌套按钮" className="wrap">
                    <Table bordered dataSource={this.state.dataSource} columns={columns4}/>
                </Card>
            </div>
        );
    }
}

export default index;