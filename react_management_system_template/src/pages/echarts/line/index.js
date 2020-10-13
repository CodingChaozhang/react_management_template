import React from 'react';
import {Card} from 'antd';
// 引入echarts
// 加载echart主题色
import echartTheme from '../echartTheme';
// 按需加载
import echarts from 'echarts/lib/echarts';
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
        let option={
            title:{
                text:"用户学习时长",
            },
            tooltip:{
                trigger:'axis',
            },
            xAxis:{
                data:[
                    "周一","周二","周三","周四","周五","周六","周日"
                ]
            },
            yAxis:{
                type:"value"
            },
            series:[
                {
                    name:"学习时长",
                    type:"line",
                    data:[
                        4,6,2,5,6,8,10
                    ]
                }
            ]
        }
        return option;
    }


    getOption2=()=>{
        let option={
            title:{
                text:"用户学习时长",
            },
            tooltip:{
                trigger:'axis',
            },
            legend:{
                data:["小明阅读时长","小红阅读时长","小绿阅读时长"]
            },
            xAxis:{
                data:[
                    "周一","周二","周三","周四","周五","周六","周日"
                ]
            },
            yAxis:{
                type:"value"
            },
            series:[
                {
                    name:"小明阅读时长",
                    type:"line",
                    data:[
                        4,6,2,5,6,8,10
                    ]
                },
                {
                    name:"小红阅读时长",
                    type:"line",
                    data:[
                        2,8,3,8,9,10,12
                    ]
                },
                {
                    name:"小绿阅读时长",
                    type:"line",
                    data:[
                        3,5,8,10,14,2,1
                    ]
                },
            ]
        }
        return option;
    }

    render() {
        return (
        <div>
            <Card title="折线图表之一" className="card-wrap" style={{height:500}}>
                <ReactEcharts option={this.getOption()} theme="template"/>
            </Card>
            
            <Card title="折线图表之二" className="card-wrap" style={{height:500}}>
                <ReactEcharts option={this.getOption2()} theme="template"/>
            </Card>
        </div>
        );
    }
}

export default index;