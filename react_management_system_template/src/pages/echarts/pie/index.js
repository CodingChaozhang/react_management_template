import React from 'react';
import {Card} from 'antd';
// 引入echarts
// 加载echart主题色
import echartTheme from '../echartTheme';
// 按需加载
import echarts from 'echarts/lib/echarts';
// 导入柱形图
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
// 引入react-for-echarts
import ReactEcharts from 'echarts-for-react';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }

    componentWillMount(){
        echarts.registerTheme("template",echartTheme);
    }

    getOption=()=>{
        let option = {
            title:{
                text:"用户阅读时长",
                x:"center"
            },
            legend:{
                orient:"vertical",
                left:"right",
                data:["周一","周二","周三","周四","周五","周六","周日",]
            },
            tooltip:{
                trigger:"item",
                formatter:"{a}<br/>{b}:{c}({d}%)"
            },

            series:[
                {
                    name:"学习时长",
                    type:"pie",
                    radius:'80%',
                    center:["50%","60%"],
                    data:[
                        {
                            value:3,
                            name:"周一"
                        },
                        {
                            value:5,
                            name:"周二"
                        },
                        {
                            value:7,
                            name:"周三"
                        },
                        {
                            value:10,
                            name:"周四"
                        },
                        {
                            value:9,
                            name:"周五"
                        },
                        {
                            value:5,
                            name:"周六"
                        },
                        {
                            value:2,
                            name:"周日"
                        }

                    ]
                }
            ]
        }
        return option;
    }

    getOption2=()=>{
        let option = {
            title:{
                text:"用户阅读时长",
                x:"center"
            },
            legend:{
                orient:"vertical",
                left:"right",
                data:["周一","周二","周三","周四","周五","周六","周日",]
            },
            tooltip:{
                trigger:"item",
                formatter:"{a}<br/>{b}:{c}({d}%)"
            },

            series:[
                {
                    name:"学习时长",
                    type:"pie",
                    radius:["50%","70%"],
                    data:[
                        {
                            value:3,
                            name:"周一"
                        },
                        {
                            value:5,
                            name:"周二"
                        },
                        {
                            value:7,
                            name:"周三"
                        },
                        {
                            value:10,
                            name:"周四"
                        },
                        {
                            value:9,
                            name:"周五"
                        },
                        {
                            value:5,
                            name:"周六"
                        },
                        {
                            value:2,
                            name:"周日"
                        }

                    ]
                }
            ]
        }
        return option;
    }


    render() {
        return (
            <div>
                <Card title="饼图表之一" className="card-wrap" style={{height:500}}>
                    <ReactEcharts option={this.getOption()} theme="template"/>
                </Card>

                <Card title="饼图表之二" className="card-wrap" style={{height:500}}>
                    <ReactEcharts option={this.getOption2()} theme="template"/>
                </Card>
            </div>
        );
    }
}

export default index;