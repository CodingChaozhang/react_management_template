import React from 'react';
import {Row,Modal,Card,Button} from 'antd';
import './index.less';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal1:false,
            showModal2:false,
            showModal3:false,
            showModal4:false
          };
    }
    handleOpen=(type)=>{
        this.setState({
            [type]:true
        })
    }

    handleConfirm=(type)=>{
        Modal[type]({
            title:"确定？",
            content:"你确定你学会React了吗？",
            onOk(){
                console.log("OK")
            },
            onCancel(){
                console.log("Cancel")
            }
        })
    }
    render() {
        return (
            <Row>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleOpen("showModal1")}>Open</Button>
                    <Button type="primary" onClick={()=>this.handleOpen("showModal2")}>自定义页脚</Button>
                </Card>
                
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleConfirm("confirm")}>Confirm</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm("info")}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm("success")}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm("warning")}>Warning</Button>

                </Card>

                <Modal title="antd" visible={this.state.showModal1} onCancel={()=>{
                    this.setState({
                        showModal1:false
                    })
                }} >
                    <p>Antd Design of React 之弹窗学习</p>
                </Modal>

                <Modal title="antd" okText={"好了"} cancelText={"算了"} visible={this.state.showModal2} onCancel={()=>{
                    this.setState({
                        showModal2:false
                    })
                }} >
                    <p>Antd Design of React 之弹窗学习</p>
                </Modal>
            </Row>
        );
    }
}

export default index;