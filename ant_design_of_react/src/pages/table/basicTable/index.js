import React from 'react';
import {Button,Modal,Card,Table, message} from 'antd';
import './index.less';
import axios from '../../../axios/index';
import Utils from '../../../utils/utils';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                dataSource2:[]
          };
    }
    
    param = {
        page :1
    }
    componentDidMount(){
        const dataSource = [
            {
              key: '1',
              id:'1',
              name: '胡彦斌',
              age: 32,
              address: '西湖区湖底公园1号',
              hobby:'1'
            },
            {
              id:'2',
              key: '2',
              name: '胡彦祖',
              age: 42,
              address: '西湖区湖底公园1号',
              hobby:'2'
            },
          ];
        
          this.setState({
              dataSource:dataSource
          })

          this.request();
    }


    // request=()=>{
    //     let baseUrl = " https://www.easy-mock.com/mock/5f640a22d75a98083f498fb2/admin";
    //     axios.get(baseUrl+"/table/list").then((res)=>{
    //         if(res.status=='200'){
    //             this.setState({
    //                 dataSource2:res.data.result
    //             })
    //         }
    //     })
    // }

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
                    dataSource2:res.result.list,
                    pagination:Utils.pagination(res,(current)=>{
                        _this.param.page = current;
                        this.request();
                    })
                   
                })
            }
        })
    }

    onRowClick=(record,index)=>{
        let selectKey = [index+1]

        Modal.info({
            titl:"信息",
            content:`用户:${record.name}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }
    handleDelete=()=>{
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title:"删除提示",
            content:`您确定要删除这些数据吗？${ids.join(',')}`,
            onOk:()=>{
                message.success("删除成功")
                this.setState({
                    selectedRowKeys:[],
                    selectedRows:null
                })
            }
        })
    }

    render() {
        const columns = [
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
              title: '年龄',
              dataIndex: 'age',
              key: 'age',
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
                        '1':"跑步",
                        "2":"散步"
                    }
                    return config[hobby]
                }
            }
          ];
          
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection ={
            type:'radio',
            selectedRowKeys
        }

        const rowCheckSelection ={
            type:"checkbox",
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                // selectedRows.map(()=>{
                //     let ids = [];
                //     selectedRows.map((item)=>{
                //         ids.push(item.id)
                //     })
                    this.setState({
                        selectedRowKeys,
                        selectedRows
                })
            }
        }
        
        return (
            <div>
                <Card title="基础表格" className="wrap">
                    <Table bordered dataSource={this.state.dataSource} columns={columns}/>
                </Card>

                <Card title="动态表格渲染" className="wrap">
                    <Table bordered dataSource={this.state.dataSource2} columns={columns}/>
                </Card>

                <Card title="动态表格嵌套单选按钮" className="wrap">
                    <Table rowSelection={rowSelection} 
                           bordered 
                           dataSource={this.state.dataSource2} 
                           columns={columns}
                           onRow={(record,index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record,index);
                                }, // 点击行
                                onDoubleClick: event => {},
                                onContextMenu: event => {},
                                onMouseEnter: event => {}, // 鼠标移入行
                                onMouseLeave: event => {},
                            };
                          }}/>
                </Card>


                <Card title="动态表格嵌套多选按钮" className="wrap">
                    <div>
                        <Button type="primary" onClick={this.handleDelete}>删除</Button>
                    </div> 
                    <Table rowSelection={rowCheckSelection} 
                           bordered 
                           dataSource={this.state.dataSource2} 
                           columns={columns}
                    />
                </Card>


                <Card title="动态表格分页功能" className="wrap">
 
                    <Table 
                           bordered 
                           dataSource={this.state.dataSource2} 
                           columns={columns}
                           pagination={this.state.pagination}
                    />
                </Card>
            </div>
        );
    }
}

export default index;
