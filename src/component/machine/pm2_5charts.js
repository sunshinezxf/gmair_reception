import React from 'react'

import macarons from '../../../node_modules/echarts/theme/macarons'

import ReactEcharts from 'echarts-for-react';
import {airquality_service} from "../service/airquality.service";
import {machine_service} from "../service/mahcine.service";
import {util} from "../service/util";

class PM2_5Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: [],
            outdoor: [],
            indoor: []
        }
    }

    componentDidMount() {
        machine_service.obtain_current_city(this.props.qrcode).then(response => {
            let city = response.data[0];
            airquality_service.obtain_city_pm2_5_weekly(city.cityId).then(response => {
                let data = response.data;
                let axis = [];
                let outdoor = [];
                for (let i = 0; i < data.length; i++) {
                    axis.push(util.format(data[i].createTime));
                    outdoor.push(data[i].pm25);
                }
                this.setState({date: axis, outdoor: outdoor});
            })
        });
        machine_service.obtain_pm2_5_weekly(this.props.qrcode).then(response => {
            if(response.responseCode === 'RESPONSE_OK') {
                let data = response.data;
                let indoor = [];
                for(let i = 0; i < data.length; i ++) {
                    indoor.push(data[i].pm2_5);
                }
                this.setState({indoor: indoor})
            }
        })
    }

    render() {
        let option = {
            title: {
                text: '近日空气质量对比',
                show: true,
                textStyle: {
                    color: '#000',
                    fontWeight: 'normal',
                    fontSize: 12,
                    align: 'left'
                }
            },
            legend: {
                left: 'right',
                data: ['室内','室外'],
                align: 'left'
            },
            grid: {
                top: 38
            },
            xAxis: {
                fontStyle: 'oblique',
                type: 'category',
                boundaryGap: false,
                data: this.state.date
            },
            tooltip: {
                trigger: 'item'
            },
            toolbox: {
                show: false
            },
            calculable: true,
            yAxis: {
                name: '空气污染指数',
                nameLocation: 'center',
                nameRotate: 90,
                type: 'value',
                axisLabel: {
                    formatter: '{value}',
                    inside: false,
                    margin: 1,
                }
            },
            series: [
                {
                    name: '室内',
                    type: 'line',
                    data: this.state.indoor,
                    symbol: 'emptyCircle',
                    symbolSize: 8,
                    smooth: false,
                    lineStyle: {
                        color: '#F282AA',
                        width: 3
                    }
                },
                {
                    name: '室外',
                    type: 'line',
                    data: this.state.outdoor,
                    symbol: 'emptyDiamond',
                    symbolSize: 8,
                    smooth: false,
                    lineStyle: {
                        color: '#11C1F3',
                        width: 3
                    }
                }
            ]
        };


        return (
            <div>
                <ReactEcharts option={option} theme={'macarons'} notMerge/>
            </div>
        )
    }
}

export default PM2_5Charts