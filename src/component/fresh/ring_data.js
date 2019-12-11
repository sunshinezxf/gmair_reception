import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import './fresh.css';
import {util} from "../service/util";

class RingData extends Component{
    constructor(props) {
        super(props);
        this.state={
            value:0
        }
    }

    componentDidMount(){
        let value = this.props.value!=undefined?this.props.value:0;
        this.setState({
            value:value
        })
    }

    render() {
        let value = this.state.value;
        let dataArr = [{
            value: value,
            name: util.tell_pm2_5_desc(value)
        }];
        let colorSet = [[value/300, util.tell_pm2_5_color(value)],[1,'#cccccc']];
        let option = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
                {
                    type: 'gauge',
                    radius: '70%',
                    startAngle: '225',
                    endAngle: '-45',
                    pointer: {
                        show: false
                    },
                    detail: {
                        color:util.tell_pm2_5_color(value),
                        offsetCenter: [0, '20%']
                    },
                    data: dataArr,
                    min:0,
                    max:500,
                    title: {
                        show: true,
                        color:util.tell_pm2_5_color(value),
                        fontSize:13,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: colorSet,
                            width: 10,
                            // shadowBlur: 15,
                            // shadowColor: '#B0C4DE',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            opacity: 1
                        }
                    },
                    splitNumber:1,
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        distance:-55,
                        color:'black',
                    },
                },
            ]
        };
        return (
            <div>
                <ReactEcharts style={{height:'180px',width:'180px'}} option={option}/>
            </div>
        );
    }

}

export default RingData;
