import React from 'react'

import macarons from '../../../node_modules/echarts/theme/macarons'

import ReactEcharts from 'echarts-for-react';

class PM2_5Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        }
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
                data: ['机器数值', '城市数值']
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
                    name: '机器数值',
                    type: 'line',
                    data: [0, 0, 1, 0, 0, 0, 0],
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name: '城市数值',
                    type: 'line',
                    data: [45, 50, 53, 55, 40, 60, 50],
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
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