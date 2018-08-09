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
                for (let i = 0; i < data.length; i ++) {

                }
            })
        })
    }

    render() {
        let option = {
            title: {
                text: '',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['室内数值', '户外数值']
            },
            toolbox: {
                show: false
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.state.date
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '室内数值',
                    type: 'line',
                    data: [0, 0, 1, 0, 0, 0, 0]
                },
                {
                    name: '户外数值',
                    type: 'line',
                    data: [45, 50, 53, 55, 40, 60, 50]
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