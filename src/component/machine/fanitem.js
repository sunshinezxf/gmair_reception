import React from 'react';
import {Tag, Badge,Icon} from 'antd';
import './deviceitem.css'
import {machine_service} from "../service/mahcine.service";
import {util} from "../service/util";

class FanItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            online: false,
            qrcode: '',
            power_status: 'off',
            heat:'',
            volume:''
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

    obtain_machine_status = (qrcode) => {
        machine_service.obtain_machine_new_status(qrcode).then(response => {
            //machine online
            if (response.responseCode === 'RESPONSE_OK') {
                let information = response.data;
                let power = information.power;
                this.setState({
                    online:true,
                    heat:information.heat,
                    volume:information.volume,
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

        let url = '/fan/detail/' + this.props.qrcode;

        let mode = this.state.heat===0?'cold':'hot';
        let volume = this.state.heat===0?this.state.volume:this.state.heat;
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
                                <div className="device-num" style={{color:util.tell_fan_color(mode)}}>{volume}</div>
                                <div className="device-unit">档</div>
                                <div className="device-label"><Tag color={util.tell_fan_color(mode)}>{this.state.heat===0?'冷风':'热风'}</Tag></div>
                            </div>:
                            <span>设备已离线，点击重新接入</span>}
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
                </div>
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

export default FanItem;
