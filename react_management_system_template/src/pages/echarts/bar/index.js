import React from 'react';
import {Card} from 'antd';
// 引入echarts
// 加载echart主题色
import echartTheme from '../echartTheme';
// 按需加载
import echarts from 'echarts/lib/echarts';
// 导入柱形图
import 'echarts/lib/chart/bar';
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
                text:"用户阅读时长"
            },
            tooltip:{
                trigger:"axis"
            },
            xAxis:{
                data:["周一","周二","周三","周四","周五","周六","周日",]
            },
            yAxis:{
                type:"value"
            },
            series:[
                {
                    name:"学习时长",
                    type:"bar",
                    data:[1,5,2,7,6,3,2]
                }
            ]
        }
        return option;
    }

    getOption2=()=>{
        let option = {
            title:{
                text:"用户阅读时长"
            },
            tooltip:{
                trigger:"axis"
            },
            legend:{
                data:["小明","小红","小绿"]
            },
            xAxis:{
                data:["周一","周二","周三","周四","周五","周六","周日",]
            },
            yAxis:{
                type:"value"
            },
            series:[
                {
                    name:"小明",
                    type:"bar",
                    data:[1,5,2,7,6,3,2]
                },
                {
                    name:"小红",
                    type:"bar",
                    data:[2,10,8,9,4,6,5]
                },
                {
                    name:"小绿",
                    type:"bar",
                    data:[3,7,8,7,8,9,10]
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="柱形图表之一" className="card-wrap" style={{height:500}}>
                    <ReactEcharts option={this.getOption()} theme="template"/>
                </Card>

                <Card title="柱形图表之二" className="card-wrap" style={{height:500}}>
                    <ReactEcharts option={this.getOption2()} theme="template"/>
                </Card>
            </div>
        );
    }
}

export default index;