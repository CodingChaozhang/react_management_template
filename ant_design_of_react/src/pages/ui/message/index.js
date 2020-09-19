import React from 'react';
import {Row,Modal,Card,Button,message, Alert} from 'antd';
import './index.less';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    onMessage=(type)=>{
        message[type]({
            content:"恭喜你中了500万"
        })
    }


    render() {
        return (
            <div>
                <Row>
                    <Card title="全局Message提示框的用法" className="card-wrap">
                        <Button type="primary" onClick={()=>this.onMessage("success")}>success</Button>
                        <Button type="primary" onClick={()=>this.onMessage("info")}>info</Button>
                        <Button type="primary" onClick={()=>this.onMessage("warning")}>warning</Button>
                        <Button type="primary" onClick={()=>this.onMessage("error")}>error</Button>
                        <Button type="primary" onClick={()=>this.onMessage("loading")}>loading</Button>
                    </Card>
                </Row>
            </div>
        );
    }
}

export default index;