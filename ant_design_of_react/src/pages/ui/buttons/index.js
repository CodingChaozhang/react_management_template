import React from 'react';
import {Row,Radio,Card,Button} from 'antd';
import './index.less';
import { PlusOutlined,EditOutlined,DeleteOutlined,DownloadOutlined,SearchOutlined,LeftOutlined,RightOutlined } from '@ant-design/icons';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading:true,
            size:"default"
         };
    }

    handleCloseLoading=()=>{
        this.setState({
            loading:false
        })
    }
    handleChange=(e)=>{
        this.setState({
            size:e.target.value
        })
    }
    render() {
        return (
            <div>
                <Row>
                    <Card title="基础按钮" className="base_button" >
                        <Button type="primary">按钮</Button>
                        <Button>按钮</Button>
                        <Button type="dashed">按钮</Button>
                        <Button type="danger">按钮</Button>
                        <Button disabled>按钮</Button>
                    </Card>

                    <Card title="图形按钮" className="base_button" >
                        <Button icon={<PlusOutlined />}>创建</Button>
                        <Button icon={<EditOutlined />}>编辑</Button>
                        <Button icon={<DeleteOutlined />}type="dashed">删除</Button>
                        <Button icon={<SearchOutlined />} type="primary">搜索</Button>
                        <Button icon={<DownloadOutlined />}  type="primary">下载</Button>
                    </Card>


                    <Card title="Loading按钮" className="base_button" >
                        <Button type="primary" loading={this.state.loading}>确定</Button>
                        <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                        <Button loading={this.state.loading}>点击加载</Button>
                        <Button shape="circle" loading={this.state.loading}></Button>
                        <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                    </Card>

                    <Card title="按钮组" className="base_button" >
                        <Button.Group>
                            <Button type="primary" icon={<LeftOutlined/>}>返回</Button>
                            <Button  type="primary" icon={<RightOutlined/>}>前进</Button>
                        </Button.Group>
                    </Card>


                    <Card title="按钮尺寸" className="base_button" >
                        <Radio.Group value={this.state.size} onChange={this.handleChange}>
                            <Radio value="small">小</Radio>
                            <Radio value="default">中</Radio>
                            <Radio value="large">大</Radio>
                        </Radio.Group>

                        <Button size={this.state.size} type="primary">按钮</Button>
                        <Button size={this.state.size} >按钮</Button>
                        <Button size={this.state.size} type="dashed">按钮</Button>
                        <Button size={this.state.size} type="danger">按钮</Button>
                        <Button size={this.state.size} disabled>按钮</Button>
                    </Card>
                </Row>
            </div>
        );
    }
}

export default index;