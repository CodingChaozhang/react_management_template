import React from 'react';
import {Row,Modal,Card,Button,notification} from 'antd';
import './index.less';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }
    handleNotice=(type,direction)=>{
        if(direction){
            notification.config({
                placement:direction
            })
        }
        notification[type]({
            message:"天气播报",
            description:"今天晴转多云，温度28度，注意保暖！！！"
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Card title="消息通知框" className="card-wrap">
                        <Button type="primary" onClick={()=>this.handleNotice("success")}>success</Button>
                        <Button type="primary" onClick={()=>this.handleNotice("info")}>info</Button>
                        <Button type="primary" onClick={()=>this.handleNotice("warning")}>warning</Button>
                        <Button type="primary" onClick={()=>this.handleNotice("error")}>error</Button>
                    </Card>

                    <Card title="消息通知框的出现位置" className="card-wrap">
                        <Button type="primary" onClick={()=>this.handleNotice("success","topLeft")}>success</Button>
                        <Button type="primary" onClick={()=>this.handleNotice("info","topRight")}>info</Button>
                        <Button type="primary" onClick={()=>this.handleNotice("warning","bottomLeft")}>warning</Button>
                        <Button type="primary" onClick={()=>this.handleNotice("error","bottomRight")}>error</Button>
                    </Card>
                </Row>
            </div>
        );
    }
}

export default index;