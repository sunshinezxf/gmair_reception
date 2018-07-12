import React from 'react'

import macarons from '../../../node_modules/echarts/theme/macarons'

import ReactEcharts from 'echarts-for-react';

class PM2_5Charts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let option = {
            title: {
                text: '',
                subtext: 'PM2.5七日走势'
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
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
                    data: [11, 11, 15, 13, 12, 13, 10],
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },
                {
                    name: '城市数值',
                    type: 'line',
                    data: [1, -2, 2, 5, 3, 2, 0],
                    markPoint: {
                        data: [
                            {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                        ]
                    },
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