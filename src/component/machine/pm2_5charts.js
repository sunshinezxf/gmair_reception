import React from 'react'

import shine from '../../../node_modules/echarts/theme/shine'

import ReactEcharts from 'echarts-for-react';
import {airquality_service} from "../service/airquality.service";
import {machine_service} from "../service/mahcine.service";
import {util} from "../service/util";
import {locationservice} from "../service/location.service";

class PM2_5Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: [],
            outdoor: [],
            indoor: [],
            province_id: '',
            city_id: ''
        };
        this.store_outdoor_data = this.store_outdoor_data.bind(this);
        this.obtain_weekly_data = this.obtain_weekly_data.bind(this);
    }

    store_outdoor_data = (response) => {
        let data = response.data;
        let axis = [];
        let outdoor = [];
        for (let i = 0; i < data.length; i++) {
            axis.push(util.format(data[i].createTime));
            outdoor.push(Math.round(data[i].pm25));
        }
        this.setState({date: axis, outdoor: outdoor});
    }

    obtain_weekly_data = (city_id) => {
        airquality_service.obtain_city_pm2_5_weekly(city_id).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.store_outdoor_data(response);
            }
            if (response.responseCode === 'RESPONSE_NULL') {
                locationservice.city_profile(city_id).then(response => {
                    if (response.responseCode === 'RESPONSE_OK') {
                        let province_id = response.data[0].provinceId;
                        airquality_service.obtain_city_pm2_5_weekly(province_id).then(response => {
                            this.store_outdoor_data(response);
                        })
                    }
                })
            }
        })
    }

    componentDidMount() {
        machine_service.obtain_current_city(this.props.qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                let city = response.data[0];
                this.setState({city_id: city.cityId});
                this.obtain_weekly_data(city.cityId);
            }
            if (response.responseCode === 'RESPONSE_NULL') {
                locationservice.tell_location().then(response => {
                    let city_id = response.data.code;
                    locationservice.acquire_city_id(city_id).then(response => {
                        if (response.responseCode === 'RESPONSE_OK') {
                            city_id = response.data;
                            this.obtain_weekly_data(city_id);
                        }
                    });
                })
            }
        });

        machine_service.obtain_pm2_5_weekly(this.props.qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                let data = response.data;
                let indoor = [];
                for (let i = 0; i < data.length; i++) {
                    indoor.push(Math.round(data[i].pm2_5));
                }
                this.setState({indoor: indoor})
            }
        })
    }

    render() {
        let option = {
            color: ['#11C1F3', '#F282AA'],
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
                data: [{name: '室外'}, {name: '室内'}],
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
                    margin: 5,
                },
                nameGap: 25,
                axisTick: {
                    show: false
                }
            },
            series: [
                {
                    name: '室内',
                    type: 'line',
                    data: this.state.indoor,
                    symbol: 'emptyDiamond',
                    symbolSize: 10,
                    smooth: false,
                    lineStyle: {
                        color: '#11C1F3',
                        width: 3
                    }
                },
                {
                    name: '室外',
                    type: 'line',
                    data: this.state.outdoor,
                    symbol: 'emptyCircle',
                    symbolSize: 10,
                    smooth: false,
                    lineStyle: {
                        color: '#F282AA',
                        width: 3
                    }
                }
            ]
        };


        return (
            <div>
                <ReactEcharts option={option} theme={'macarons'} notMerge/>
                {/*<div>图表中数据为过去7天的室内外PM2.5数值平均值, 江苏果麦环保科技有限公司保留对数据的解释权.</div>*/}
            </div>
        )
    }
}

export default PM2_5Charts