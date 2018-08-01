import React from 'react'

import {Col, Row} from 'react-bootstrap'

import {Collapse} from 'react-collapse'
import {machine_service} from "../service/mahcine.service";

import {Button, Modal, Slider, WhiteSpace} from 'antd-mobile';

const operation_area = {
    marginTop: `1.5rem`,
    border: `0.1rem dashed #00A2E9`,
    borderRadius: `0.5rem`
}

const operation_icon = {
    fontSize: `1.8rem`,
    fontWeight: `lighter`
}

const operation_icon_active = {
    fontSize: `1.5rem`,
    lineHeight: `1.8rem`,
    fontWeight: `lighter`,
    color: `#00A2E9`
}

const operation_gap_top = {
    height: `2rem`,
    width: `100%`
}

const operation_gap_bottom = {
    height: `1rem`,
    width: `100%`
}

class Operation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qrcode: '',
            modelId: '',
            expanded: true,
            operations: [],
            min_volume: 0,
            max_volume: 400
        }
        this.expand = this.expand.bind(this);
        this.init_control_option = this.init_control_option.bind(this);
        this.power_operate = this.power_operate.bind(this);
    }

    expand = () => {
        let current = this.state.expanded;
        this.setState({expanded: !current});
    }

    init_control_option = () => {
        machine_service.obtain_control_option(this.state.modelId).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                let control_list = response.data;
                this.setState({operations: control_list})
            }
            console.log(this.state.operations)
        })
        machine_service.obtain_volume_range(this.state.modelId).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.setState({min_volume: response.data[0].minVolume, max_volume: response.data[0].maxVolume})
            }
        })
    }

    power_operate = () => {
        if (this.props.power_status == 'on') {
            this.setState({power_status: 'off'});
            machine_service.operate(this.state.qrcode, 'power', 'off');
        } else {
            this.setState({power_status: 'on'});
            machine_service.operate(this.props.qrcode, 'power', 'on');
        }
    }

    fan_operate = (volume) => {
        machine_service.volume(this.state.qrcode, volume).then(response => {

        })
    }

    mode_operate = (mode_name) => {
        machine_service.operate(this.props.qrcode, 'mode', mode_name).then(response => {
            console.log(JSON.stringify(response))
        });
    }

    componentDidMount() {
        let qrcode = this.props.qrcode
        this.setState({qrcode: qrcode});
        machine_service.check_exist(qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.setState({modelId: response.data[0].modelId}, this.init_control_option);
            }
        });
    }

    render() {
        return (
            <div style={operation_area}>
                <div style={operation_gap_top}></div>
                <Row>
                    <Power power_status={this.props.power_status} power_operate={this.power_operate}/>
                    <Fan power_status={this.props.power_status} min_volume={this.state.min_volume}
                         max_volume={this.state.max_volume} current_volume={this.props.volume_value}
                         fan_operate={this.fan_operate} operate_local_volume={this.props.operate_local_volume}/>
                    <Workmode power_status={this.props.power_status} mode_operate={this.mode_operate}
                              operate_local_mode={this.props.operate_local_mode} current_mode={this.props.work_mode}/>
                </Row>
                <div style={operation_gap_bottom}></div>
                <Collapse isOpened={this.state.expanded}>
                    <div style={operation_gap_top}></div>
                    <Row>
                        <Col xs={4} md={4}>
                            <i className='fa fa-superpowers' style={operation_icon}></i>
                            <div>风量</div>
                        </Col>
                        <Col xs={4} md={4}>
                            <i className='fa fa-lightbulb-o' style={operation_icon}></i>
                            <div>屏显</div>
                        </Col>
                        <Col xs={4} md={4}>
                            <i className='fa fa-thermometer' style={operation_icon}></i>
                            <div>辅热</div>
                        </Col>
                    </Row>
                    <div style={operation_gap_bottom}></div>
                    <div style={operation_gap_top}></div>
                    <Row>
                        <Col xs={4} md={4}>
                            <i className='fa fa-child' style={operation_icon}></i>
                            <div>童锁</div>
                        </Col>
                        <Col xs={4} md={4}>
                            <i className='fa fa-recycle' style={operation_icon}></i>
                            <div>节能</div>
                        </Col>
                        <Col xs={4} md={4}>
                            <i className='fa fa-clock-o' style={operation_icon}></i>
                            <div>定时</div>
                        </Col>
                    </Row>
                    <div style={operation_gap_bottom}></div>
                </Collapse>
                <div onClick={this.expand}><i
                    className={this.state.expanded == false ? 'fa fa-angle-double-down' : 'fa fa-angle-double-up'}></i>
                </div>
            </div>
        )
    }
}

class Power extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            power_status: '',
            power_loading: false
        }
        this.power = this.power.bind(this);
    }

    power = () => {
        this.setState({power_loading: true})
        setTimeout(() => {
            this.setState({power_loading: false})
        }, 10000);
        this.props.power_operate();
    }

    render() {
        return (
            <Col xs={4} md={4} onClick={this.state.power_loading ? () => {
            } : this.power}>
                <i className={this.state.power_loading ? 'fa fa-spinner fa-spin' : 'fa fa-power-off'}
                   style={this.props.power_status == 'off' ? operation_icon : operation_icon_active}></i>
                <div>电源</div>
            </Col>
        );
    }
}

const area_desc = {
    marginTop: `1rem`
}

const config_panel_area = {
    height: `4.5rem`,
    margin: `3rem 7.5% 0rem 7.5%`
}

const min_volume = {
    marginLeft: `7.5%`,
    textAlign: `left`,
    width: `22.5%`,
    float: `left`
}

const current_volume = {
    width: `40%`,
    float: `left`,
    width: `40%`,
    float: `left`
}

const max_volume = {
    marginRight: `7.5%`,
    textAlign: `right`,
    width: `22.5%`,
    float: `left`
}

const volume_area = {
    marginBottom: `2rem`,
    height: `2rem`
}

class Fan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            min_volume: 0,
            max_volume: 400,
            show_panel: false
        }
        this.speed_panel = this.speed_panel.bind(this);
        this.volume = this.volume.bind(this);
        this.local_volume = this.local_volume.bind(this);
    }

    speed_panel = () => {
        this.setState({show_panel: !this.state.show_panel})
    }

    volume = (e) => {
        this.setState({current_volume: e});
        this.local_volume(e);
        this.props.fan_operate(e);
    }

    local_volume = (e) => {
        this.props.operate_local_volume(e);
    }

    render() {
        return (
            <Col xs={4} md={4} onClick={this.speed_panel}>
                <i style={this.props.power_status == 'off' ? operation_icon : operation_icon_active}>{this.props.current_volume}</i>
                <div>风量</div>
                <Modal popup visible={this.state.show_panel} animationType="slide-up">
                    <div style={area_desc}>风量调节</div>
                    <Slider style={config_panel_area} defaultValue={this.props.current_volume}
                            value={this.props.current_volume}
                            min={this.state.min_volume} max={this.state.max_volume} included={true}
                            onChange={(e) => {
                                this.local_volume(e);
                            }}
                            onAfterChange={(e) => {
                                this.volume(e);
                            }}
                    />
                    <div style={volume_area}>
                        <div style={min_volume}>{this.props.min_volume}</div>
                        <div style={current_volume}>{this.props.current_volume}</div>
                        <div style={max_volume}>{this.props.max_volume}</div>
                    </div>
                </Modal>
            </Col>
        );
    }
}

const mode_operation_area = {
    width: `85%`,
    margin: `1rem 7.5%`,
    textAlign: `center`
}

class Workmode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show_panel: false
        }
        this.mode_panel = this.mode_panel.bind(this);
        this.operate_mode = this.operate_mode.bind(this);
    }

    mode_panel = () => {
        this.setState({show_panel: !this.state.show_panel})
    }

    operate_mode = (mode) => {
        this.props.operate_local_mode(mode)
        this.props.mode_operate(mode)
    }

    render() {
        let mode_name = 'fa fa-hand-paper-o';
        if (this.props.current_mode == 'sleep') {
            mode_name = 'fa fa-moon-o';
        }
        if(this.props.current_mode == 'auto') {
            mode_name = 'fa fa-refresh';
        }
        return (
            <Col xs={4} md={4} onClick={this.mode_panel}>
                <i className={mode_name} style={operation_icon_active}></i>
                <div>模式</div>
                <Modal popup visible={this.state.show_panel} animationType="slide-up">
                    <div style={area_desc}>模式调节</div>
                    <div style={mode_operation_area}>
                        <Button type={this.props.current_mode == 'sleep' ? 'primary' : 'ghost'} inline size="small" className='am-button-borderfix'
                                style={{margin: '0 1.5rem'}} onClick={() => {
                            {this.props.current_mode === 'sleep' ? '' : this.operate_mode('sleep')}}}>睡眠</Button>
                        <Button type="ghost" inline size="small" className='am-button-borderfix'
                                style={{margin: '0 1.5rem'}} onClick={() => {
                            this.operate_mode('auto')
                        }}>自动</Button>
                    </div>
                </Modal>
            </Col>
        );
    }
}

export default Operation