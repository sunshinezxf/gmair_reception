import React from 'react';
import {Tag, Badge,Icon} from 'antd';
import './deviceitem.css'
import {machine_service} from "../service/mahcine.service";
import {util} from "../service/util";

const gmair_machine_power = {
    width: `4rem`,
    height: `4rem`,
    fontSize: `2.5rem`,
    fontWeight: `lighter`
};

class DeviceItem extends React.Component {

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
            lock_status: 'off',
        };
        this.power_operate = this.power_operate.bind(this);
        this.obtain_machine_status = this.obtain_machine_status.bind(this);
        this.config_network = this.config_network.bind(this);
    }

    power_operate = () => {
        if (this.state.power_status === 'on') {
            this.setState({power_status: 'off'});
            machine_service.operate(this.state.qrcode, 'power', 'off');
        } else {
            this.setState({power_status: 'on'});
            machine_service.operate(this.props.qrcode, 'power', 'on');
        }
    };

    light_operate = () => {

    };

    lock_operate = () => {
        if (this.state.lock_status === 'on') {
            this.setState({lock_status: 'off'});
            machine_service.operate(this.state.qrcode, 'lock', 'off');
        } else {
            this.setState({lock_status: 'on'});
            machine_service.operate(this.state.qrcode, 'lock', 'on');
        }
    };

    mode_operate = (mode) => {
        if (this.state.work_mode === mode) {
            return;
        }
        this.setState({work_mode: mode});
        machine_service.operate(this.state.qrcode, 'mode', mode);
    };

    obtain_machine_status = (qrcode) => {
        machine_service.obtain_machine_new_status(qrcode).then(response => {
            console.log(response)
            //machine online
            if (response.responseCode === 'RESPONSE_OK') {
                let information = response.data;
                let pm2_5 = information.pm2_5;
                let volume = information.volume;
                let temp = information.temperature;
                let humid = information.humidity;
                let power = information.power;
                this.setState({
                    online: true,
                    pm2_5: pm2_5,
                    volume: volume,
                    temp: temp,
                    humid: humid,
                    power_status: (power === 1) ? 'on' : 'off'
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
    };

    config_network = () => {
        window.location.href = '/network/config';
    };

    componentDidMount() {
        let qrcode = this.props.qrcode;
        this.setState({qrcode: qrcode});
        this.obtain_machine_status(qrcode);
        setInterval(() => {
            this.obtain_machine_status(qrcode);
        }, 10000);
    }

    render() {
        console.log(this.props)
        let url = '/fresh/detail/' + this.props.qrcode;

        return (
            <div onClick={this.state.online ? () => {
            } : this.config_network}>
                <div className="device-item">
                    <div className="device-pic">
                        <img src={this.props.url} width="60px" height="60px"/>
                    </div>
                    <div className="device-intro" onClick={() => {
                        window.location.href = url
                    }}>
                        <div className="device-name"> {this.props.goods_name+this.props.model_name}</div>
                        {this.state.online === true ? <div className="device-status">
                            <div className="device-num" style={{color:util.tell_pm2_5_color(this.state.pm2_5)}}>{util.format_pm2_5(this.state.pm2_5)}</div>
                            <div className="device-unit">ug/m<sup>3</sup></div>
                            <div className="device-label"><Tag color={util.tell_pm2_5_color(this.state.pm2_5)}>PM2.5{util.tell_pm2_5_desc(this.state.pm2_5)}</Tag></div>
                        </div>:
                            <span>设备已离线，点击重新接入</span>}
                        {/*<div className="device-tag">*/}
                        {/*<div><i className='fa fa-recycle'></i>&nbsp;420m<sup>3</sup>/h</div>*/}
                        {/*<div><i className='fa fa-thermometer'/>&nbsp;21°C</div>*/}
                        {/*<div><i className='glyphicon glyphicon-tint'/>&nbsp;45%</div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="device-power">
                        {this.state.online === true ?
                            <div onClick={this.power_operate}>
                                <i className='glyphicon glyphicon-off'
                                   style={this.state.power_status === 'on' ? gmair_icon_active : gmair_icon_inactive}/>
                                <div className="device-open">{
                                    this.state.power_status === 'on'?'已开启':'已关闭'
                                }</div>
                            </div> : <Icon style={gmair_icon_inactive} type="disconnect" />}
                    </div>
                    {/*<div className="device-power"></div>*/}
                    {/*<MachinePower className="device-power"/>*/}
                </div>
                {/*<div className="device-tag">*/}
                    {/*<div><i className='fa fa-recycle'></i>&nbsp;420m<sup>3</sup>/h</div>*/}
                    {/*<div><i className='fa fa-thermometer'/>&nbsp;21°C</div>*/}
                    {/*<div><i className='glyphicon glyphicon-tint'/>&nbsp;45%</div>*/}
                {/*</div>*/}
            </div>

        );
    }
}

const gmair_icon_inactive = {
    color: `grey`
};

const gmair_icon_active = {
    color: `#00A2E9`
};

export default DeviceItem;
