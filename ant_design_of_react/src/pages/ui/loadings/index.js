import React from 'react';
import {Row,Modal,Card,Button,Spin, Alert} from 'antd';
import './index.less';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }
    render() {
        return (
            <Row>
                <Card title="Spin的用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin/>
                    <Spin size="large"/>
                </Card>

                <Card title="内容遮罩" className="card-wrap">
                    <Alert  message="React" description="Antd Pro Design of React教程学习" type="info">
                    </Alert>

                    <Alert  message="React" description="Antd Pro Design of React教程学习" type="warning">
                    </Alert>

                    <Spin tip="加载中">
                        <Alert  message="React" description="Antd Pro Design of React教程学习" type="warning">
                        </Alert>
                    </Spin>
                </Card>
            </Row>
        );
    }
}

export default index;