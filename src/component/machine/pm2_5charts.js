import React from 'react'

import macarons from '../../../node_modules/echarts/theme/macarons'

import ReactEcharts from 'echarts-for-react';
import {airquality_service} from "../service/airquality.service";
import {machine_service} from "../service/mahcine.service";

class PM2_5Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        }
    }

    componentDidMount() {
        let date = new Date();

        machine_service.obtain_current_city(this.props.qrcode).then(response => {
            let city = response.data[0];
            airquality_service.obtain_city_pm2_5_24hrs(city.cityId).then(response => {
                let data = response.data;
                for (let i = 0; i < data.length; i++) {

                }
            })
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
                    data: [0, 0, 1, 0, 0, 0, 0],
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
                    data: [45, 50, 53, 55, 40, 60, 50],
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