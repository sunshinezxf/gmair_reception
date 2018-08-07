import React from 'react';

import {machine_service} from "../service/mahcine.service";

import {util} from "../service/util";

const gmair_machine_item = {
    width: `100%`,
    height: `9.5rem`,
    padding: `1.5rem 0`,
    borderTop: `solid 0.1rem #C9C9C9`,
    borderBottom: `solid 0.1rem #C9C9C9`
}

const gmair_machine_pm2_5 = {
    width: `30%`,
    paddingLeft: `5%`,
    fontSize: `4.5rem`,
    letterSpacing: `0.2rem`,
    fontWeight: `lighter`,
    float: `left`,
    textAlign: `center`,
    height: `6.4rem`
}

const gmair_machine_operation = {
    width: `16%`,
    height: `6.4rem`,
    verticalAlign: `baseline`,
    float: `left`,
    textAlign: `center`,
    color: `#58595B`,
    fontWeight: `lighter`
}

const gmair_machine_power = {
    width: `4rem`,
    height: `4rem`,
    fontSize: `2.5rem`,
    fontWeight: `lighter`
}

const gmair_pm2_5_attr = {
    marginTop: `0.5rem`,
    fontWeight: `lighter`
}

const gmair_machine_index = {
    width: `54%`,
    float: `left`,
    height: `6.4rem`,
    textAlign: `center`
}

const gmair_machine_name = {
    paddingTop: `0.4rem`,
    hover: `none`,
    fontWeight: `bold`,
    color: `#00AEEF`
}

const gmair_machine_desc = {
    marginTop: `1.5rem`,
    fontWeight: `lighter`,
    float: `left`,
    textAlign: `center`,
    width: `100%`
}

const gmair_machine_desc_item = {
    marginLeft: `1rem`,
    float: `left`
}

class MachineItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            online: false,
            qrcode: '',
            pm2_5: '',
            volume: '',
            temp: '',
            humid: '',
            power_status: 'off',
            work_mode: '',
            lock_status: 'off'
        }
        this.power_operate = this.power_operate.bind(this);
        this.obtain_machine_status = this.obtain_machine_status.bind(this);
        this.config_network = this.config_network.bind(this);
    }

    power_operate = () => {
        if (this.state.power_status == 'on') {
            this.setState({power_status: 'off'});
            machine_service.operate(this.state.qrcode, 'power', 'off');
        } else {
            this.setState({power_status: 'on'});
            machine_service.operate(this.props.qrcode, 'power', 'on');
        }
    }

    light_operate = () => {

    }

    lock_operate = () => {
        if (this.state.lock_status == 'on') {
            this.setState({lock_status: 'off'});
            machine_service.operate(this.state.qrcode, 'lock', 'off');
        } else {
            this.setState({lock_status: 'on'});
            machine_service.operate(this.state.qrcode, 'lock', 'on');
        }
    }

    mode_operate = (mode) => {
        if (this.state.work_mode == mode) {
            return;
        }
        this.setState({work_mode: mode});
        machine_service.operate(this.state.qrcode, 'mode', mode);
    }

    obtain_machine_status = (qrcode) => {
        machine_service.obtain_machine_status(qrcode).then(response => {
            //machine online
            if (response.responseCode === 'RESPONSE_OK') {
                let information = response.data;
                let pm2_5 = information.pm2_5;
                let volume = information.volume;
                let temp = information.temp;
                let humid = information.humid;
                let power = information.power;
                this.setState({
                    online: true,
                    pm2_5: pm2_5,
                    volume: volume,
                    temp: temp,
                    humid: humid,
                    power_status: (power == 1) ? 'on' : 'off'
                });
            }
            //machine offline
            if (response.responseCode === 'RESPONSE_NULL') {
                this.setState({online: false});
            }
            if (response.responseCode === 'RESPONSE_ERROR') {
                this.setState({online: false});
            }
        });
    }

    config_network = () => {
        window.location.href = '/network/config';
    }

    componentDidMount() {
        let qrcode = this.props.qrcode;
        this.setState({qrcode: qrcode});
        this.obtain_machine_status(qrcode);
        setInterval(() => {
            this.obtain_machine_status(qrcode);
        }, 10000);
    }

    render() {
        let url = '/machine/detail/' + this.props.qrcode;

        return (
            <div style={gmair_machine_item}>
                <div style={gmair_machine_pm2_5} className='gmair_machine_item_pm2_5'>
                    {this.state.online === true ? util.format_pm2_5(this.state.pm2_5) :
                        <span onClick={this.config_network}><i className='fa fa-unlink'
                                                               style={gmair_icon_active}></i></span>}
                </div>
                <div style={gmair_machine_operation}>
                    {this.state.online === true ?
                        <MachinePower power={this.state.power_status} operation={this.power_operate}/> : ''}
                    <div style={gmair_pm2_5_attr}>{this.state.online === true ? 'ug/m³' : '离线'}</div>
                </div>
                <div style={gmair_machine_index}>
                    {
                        this.state.online === true ?
                            <div style={gmair_machine_name} onClick={() => {
                                window.location.href = url
                            }}>{this.props.name}</div>
                            :
                            <div style={gmair_machine_name}>{this.props.name}</div>
                    }
                    {
                        this.state.online === true ?
                            <div style={gmair_machine_desc}>
                        <span style={gmair_machine_desc_item}>
                            <span style={gmair_icon_active} className={this.state.power_status == 'on' ? 'spin' : ''}>
                                <i className='fa fa-superpowers'></i>
                            </span>
                            <span>&nbsp;{this.state.volume}m³/h</span>
                        </span>
                                <span style={gmair_machine_desc_item}>
                            <span style={gmair_icon_active}>
                                <i className='fa fa-thermometer'></i>
                            </span>
                            <span>&nbsp;{this.state.temp}°C</span>
                        </span>
                                <span style={gmair_machine_desc_item}>
                            <span style={gmair_icon_active}>
                                <i className='glyphicon glyphicon-tint'></i>
                            </span>
                            <span>&nbsp;{this.state.humid}%</span>
                        </span>
                            </div>
                            :
                            <div style={gmair_machine_desc}>
                                <span>设备已离线，待重新接入</span>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

const gmair_icon_inactive = {
    color: `grey`
}

const gmair_icon_active = {
    color: `#00A2E9`
}

class MachinePower extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show_progress: false
        };
        this.power = this.power.bind(this);
    }

    power = () => {
        this.setState({show_progress: true});
        this.props.operation();
        setTimeout(() => {
            this.setState({show_progress: false})
        }, 10000);
    }

    render() {
        return (
            <div onClick={this.state.show_progress ? () => {} : this.power}>
                <span style={gmair_machine_power}>
                    {
                        this.state.show_progress ?
                            <i className='fa fa-spinner fa-spin' style={gmair_icon_active}></i>
                            :
                            <i className='glyphicon glyphicon-off'
                               style={this.props.power === 'on' ? gmair_icon_active : gmair_icon_inactive}></i>
                    }
                </span>
            </div>
        )
    }
}

export default MachineItem;