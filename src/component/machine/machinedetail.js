import React from 'react'

import Operation from './machineoperation'
import PM2_5Charts from "./pm2_5charts";

const gmair_machine_index = {
    width: `100%`,
    padding: `2rem 7.5% 0rem 7.5%`,
    textAlign: `center`
}

const gmair_machine_pm2_5 = {
    color: `#00AEEF`,
    textAlign: `left`,
    fontWeight: `1rem`,
    height: `2.5rem`,
    lineHeight: `2.5rem`
}

const gmair_machine_pm2_5_value = {
    height: `10rem`,
    lineHeight: `10rem`,
    fontFamily: `Helvetica`,
    fontSize: `9.5rem`,
    fontWeight: `lighter`,
    width: `70%`,
    float: `left`,
    letterSpacing: `0.55rem`,
    textAlign: `left`,
    color: `#999999`,
    marginTop: `1rem`
}

const gmair_machine_index_desc = {
    width: `30%`,
    float: `left`,
    margin: `1rem 0 0.7rem 0`
}

const gmair_machine_index_desc_item = {
    padding: `0.5rem 0 0.5rem 0.5rem`,
    fontSize: `1.5rem`,
    textAlign: `left`
}

const gmair_icon_active = {
    color: `#00A2E9`,
    width: `2rem`,
    textAlign: `center`,
    display: `inline-block`
}

const indoor_index = {
    height: `12rem`
}

const charts_area = {
    margin: `3rem -2rem 0 -2rem`
}

class MachineDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qrcode: ''
        }
    }

    componentDidMount() {
        let qrcode = this.props.match.params.qrcode;
        this.setState({qrcode: qrcode});
    }

    render() {
        return (
            <div>
                <div style={gmair_machine_index}>
                    <div style={gmair_machine_pm2_5}>PM2.5 优</div>
                    <div style={indoor_index}>
                        <div style={gmair_machine_pm2_5_value}>003</div>
                        <div style={gmair_machine_index_desc}>
                            <div style={gmair_machine_index_desc_item}>
                                <span  style={gmair_icon_active} className='spin'>
                                    <i className='fa fa-life-bouy'></i>
                                </span>
                                <span>&nbsp;320m³/h</span>
                            </div>
                            <div style={gmair_machine_index_desc_item}>
                                <span style={gmair_icon_active}>
                                    <i className='fa fa-thermometer'></i>
                                </span>
                                <span>&nbsp;26°C</span>
                            </div>
                            <div style={gmair_machine_index_desc_item}>
                                <span style={gmair_icon_active}>
                                    <i className='glyphicon glyphicon-tint'></i>
                                </span>
                                <span>&nbsp;60%</span>
                            </div>
                        </div>
                    </div>
                    <Outdoor/>
                    <Operation/>
                    <div style={charts_area}>
                        <PM2_5Charts/>
                    </div>

                </div>
            </div>
        )
    }
}

const outdoor_area = {
    marginTop: `0.5rem`
}

const outdoor_title = {
    textAlign: `left`
}

const outdoor_area_content = {
    display: `block`,
    height: `2.5rem`,
    lineHeight: `2.5rem`
}

const outdoor_pm2_5 = {
    width: `33%`,
    float: `left`,
    textAlign: `left`
}

const outdoor_temp = {
    width: `34%`,
    float: `left`,
    textAlign: `center`
}

const outdoor_humid = {
    width: `33%`,
    float: `left`,
    textAlign: `right`
}

class Outdoor extends React.Component {
    render() {
        return (
            <div style={outdoor_area}>
                <div style={outdoor_title}>北京</div>
                <hr/>
                <div style={outdoor_area_content}>
                    <div style={outdoor_pm2_5}>
                        <span style={gmair_icon_active}>
                            <i className='glyphicon glyphicon-leaf'></i>
                        </span>
                        <span>&nbsp;320ug/m³</span>
                    </div>
                    <div style={outdoor_temp}>
                        <span style={gmair_icon_active}>
                            <i className='fa fa-thermometer'></i>
                        </span>
                        <span>&nbsp;26°C</span>
                    </div>
                    <div style={outdoor_humid}>
                        <span style={gmair_icon_active}>
                            <i className='glyphicon glyphicon-tint'></i>
                        </span>
                        <span>&nbsp;60%</span>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
}

export default MachineDetail;