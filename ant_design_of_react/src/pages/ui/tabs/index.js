import React from 'react';
import {Row,Tabs,Card,Button,message} from 'antd';
import './index.less';
import { PlusOutlined,EditOutlined,DeleteOutlined,DownloadOutlined,SearchOutlined,LeftOutlined,RightOutlined } from '@ant-design/icons';

const {TabPane} = Tabs;



class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
           
         };
    }
    newTabIndex = 0;
    handleCallback = (key)=>{
        message.info("Hi,您选择了页签："+key)
    }
    componentWillMount(){
        const panes = [
            {
                title:'Tab 1',
                content: 'Tab 1',
                key:'1'
            },
            {
                title: 'Tab 2',
                content: 'Tab 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Tab 3',
                key: '3'
            }
        ]
        this.setState({
            activeKey: panes[0].key,
            panes
        })
    }
    onChange = (activeKey)=>{
        this.setState({
            activeKey
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    render() {
        return (
            <div>
                <Row>
                    <Card title="Tab基础演示" className="base_button" >
                        <Tabs>
                            <TabPane tab="tab1" key="1">
                                content of tabl
                            </TabPane>
                            
                            <TabPane tab="tab2" key="2">
                                content of tab2
                            </TabPane>

                            <TabPane tab="tab3" key="3">
                                content of tab3
                            </TabPane>
                        </Tabs>
                    </Card>


                    <Card title="Tab带图标演示" className="base_button" >
                        <Tabs>
                            <TabPane tab={<span><PlusOutlined/>"tab1"</span>} key="1">
                                content of tabl
                            </TabPane>
                            
                            <TabPane tab={<span><EditOutlined/>"tab2"</span>} key="2">
                                content of tab2
                            </TabPane>

                            <TabPane tab={<span><DeleteOutlined/>"tab3"</span>} key="3">
                                content of tab3
                            </TabPane>
                        </Tabs>
                    </Card>


                    <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs 
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((panel)=>{
                                return <TabPane 
                                    tab={panel.title}
                                    key={panel.key}

                                />
                            })
                        }
                    </Tabs>
                </Card>

                </Row>
            </div>
        );
    }
}

export default index;