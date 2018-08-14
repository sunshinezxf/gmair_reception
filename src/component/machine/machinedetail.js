import React from 'react'

import {Button, Col, Form, FormControl, FormGroup, Label} from 'react-bootstrap'

import Operation from './machineoperation'
import PM2_5Charts from "./pm2_5charts";

import {wechatservice} from "../service/wechat.service";
import {util} from "../service/util";
import {machine_service} from "../service/mahcine.service";
import {locationservice} from "../service/location.service";

import 'antd/dist/antd.css';
import './machine_bind_name.css'

import Location from "../citypicker/Location";
import {airquality_service} from "../service/airquality.service";

const gmair_machine_index = {
    width: `100%`,
    padding: `1rem 7.5% 0rem 7.5%`,
    textAlign: `center`
}

const gmair_machine_pm2_5 = {
    textAlign: `left`,
    fontWeight: `1rem`,
    height: `2.5rem`,
    lineHeight: `2.5rem`,
    width: `50%`,
    float: `left`
}

const gmair_machine_name = {
    width: `50%`,
    float: `left`,
    textAlign: `right`,
    fontWeight: `1rem`
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
    textAlign: `center`
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
        this.obtain_machine_status = this.obtain_machine_status.bind(this);
        this.operate_local_power = this.operate_local_power.bind(this);
        this.operate_local_volume = this.operate_local_volume.bind(this);
        this.operate_local_mode = this.operate_local_mode.bind(this);
        this.operate_local_light = this.operate_local_light.bind(this);
        this.operate_local_heat = this.operate_local_heat.bind(this);
        this.operate_local_lock = this.operate_local_lock.bind(this);
        this.edit_operation = this.edit_operation.bind(this);
        this.confirm_bind_name = this.confirm_bind_name.bind(this);
        this.read_bind = this.read_bind.bind(this);
        this.state = {
            bind_name: '',
            qrcode: '',
            modelId: '',
            online: false,
            pm2_5: 0,
            volume: 0,
            temp: 0,
            humid: 0,
            power_status: 'off',
            work_mode: 'manual',
            heat_mode: 0,
            light: 0,
            lock: 0,
            co2: 0,
            edit_machine_name: false
        }
    }

    init_config = () => {
        let url = window.location.href;
        if (util.is_weixin()) {
            wechatservice.configuration(url).then(response => {
                if (response.responseCode === 'RESPONSE_OK') {
                    let result = response.data;
                    window.wx.config({
                        beta: true,
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: result.appId, // 必填，公众号的唯一标识
                        timestamp: result.timestamp, // 必填，生成签名的时间戳
                        nonceStr: result.nonceStr, // 必填，生成签名的随机串
                        signature: result.signature,// 必填，签名
                        jsApiList: ['hideAllNonBaseMenuItem', 'scanQRCode'] // 必填，需要使用的JS接口列表
                    });
                    window.wx.ready(() => {
                        window.wx.hideAllNonBaseMenuItem();
                    });
                }
            });
        } else {
            // alert("seems that you are not in wechat")
        }
    }

    read_bind = (e) => {
        this.setState({bind_name: e.target.value});
    }

    edit_operation = () => {
        this.setState({edit_machine_name: !this.state.edit_machine_name})
    }

    confirm_bind_name = () => {
        machine_service.config_bind_name(this.state.qrcode, this.state.bind_name).then(response => {
            console.log(JSON.stringify(response))
        })
        this.edit_operation();
    }

    operate_local_power = (power) => {
        this.setState({power_status: power});
    }

    operate_local_volume = (volume) => {
        this.setState({volume: volume});
    }

    operate_local_mode = (mode) => {
        this.setState({work_mode: mode})
    }

    operate_local_light = (light) => {
        this.setState({light: light});
    }

    operate_local_heat = (heat) => {
        this.setState({heat_mode: heat});
    }

    operate_local_lock = (lock) => {
        this.setState({lock: lock});
    }

    init_config = () => {
        let url = window.location.href;
        if (util.is_weixin()) {
            wechatservice.configuration(url).then(response => {
                if (response.responseCode === 'RESPONSE_OK') {
                    let result = response.data;
                    window.wx.config({
                        beta: true,
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: result.appId, // 必填，公众号的唯一标识
                        timestamp: result.timestamp, // 必填，生成签名的时间戳
                        nonceStr: result.nonceStr, // 必填，生成签名的随机串
                        signature: result.signature,// 必填，签名
                        jsApiList: ['hideAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
                    });
                    window.wx.ready(() => {
                        window.wx.hideAllNonBaseMenuItem();
                    });
                }
            });
        } else {
            // alert("seems that you are not in wechat")
        }
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
                let mode = information.mode;
                let light = information.light;
                let heat = information.heat;
                let lock = information.lock;
                let co2 = information.co2;
                this.setState({
                    online: false,
                    pm2_5: pm2_5,
                    volume: volume,
                    temp: temp,
                    humid: humid,
                    power_status: (power === 1) ? 'on' : 'off',
                    work_mode: util.tell_mode(mode),
                    light: light,
                    heat_mode: heat,
                    lock: lock,
                    co2: co2
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

    componentDidMount() {
        // util.load_script("https://reception.gmair.net/plugin/vconsole.min.js", () => {
        //     var vConsole = new window.VConsole();
        // })
        util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
            this.init_config();
        })
        let qrcode = this.props.match.params.qrcode;
        machine_service.obtain_bind_info(qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.setState({bind_name: response.data[0].bindName})
            }
        })
        this.setState({qrcode: qrcode});
        this.obtain_machine_status(qrcode);
        setInterval(() => {
            this.obtain_machine_status(qrcode);
        }, 10000);
    }

    render() {
        let pm2_5_color = 'pm2_5_excellent';
        if (this.state.pm2_5 >= 0 && this.state.pm2_5 <= 35) {
            pm2_5_color = 'pm2_5_excellent'
        } else if (this.state.pm2_5 > 35 && this.state.pm2_5 <= 75) {
            pm2_5_color = 'pm2_5_moderate'
        } else if (this.state.pm2_5 > 75 && this.state.pm2_5 <= 115) {
            pm2_5_color = 'pm2_5_sensative';
        } else if (this.state.pm2_5 > 115 && this.state.pm2_5 <= 150) {
            pm2_5_color = 'pm2_5_unhealthy';
        } else if (this.state.pm2_5 > 150 && this.state.pm2_5 <= 250) {
            pm2_5_color = 'pm2_5_very_unhealthy';
        } else {
            pm2_5_color = 'pm2_5_hazardous';
        }

        return (
            <div>
                <div style={gmair_machine_index}>
                    <div style={gmair_machine_pm2_5}>
                        <div className={pm2_5_color}>
                            PM2.5 {util.tell_pm2_5_desc(this.state.pm2_5)}
                        </div>
                    </div>
                    <div style={gmair_machine_name}>
                        {this.state.edit_machine_name ?
                            <Form inline>
                                <Col xs={8} sm={6}>
                                    <FormGroup style={{padding: `unset`}}>
                                        <FormControl type='text' value={this.state.bind_name} onChange={this.read_bind}></FormControl>
                                    </FormGroup>
                                </Col>
                                <Col xs={2} sm={4}>
                                    <Button onClick={this.confirm_bind_name}>确认</Button>
                                </Col>
                            </Form> :
                            <div onClick={this.edit_operation}>{this.state.bind_name}&nbsp;<span
                                className='fa fa-edit'></span></div>}
                    </div>


                </div>
                <div style={gmair_machine_index}>
                    <div style={indoor_index}>
                        <div style={gmair_machine_pm2_5_value}
                             className={pm2_5_color}>{util.format_pm2_5(this.state.pm2_5)}</div>
                        <div style={gmair_machine_index_desc}>
                            <div style={gmair_machine_index_desc_item}>
                                <span style={gmair_icon_active}>
                                    <i className='fa fa-leaf'></i>
                                </span>
                                <span>&nbsp;{this.state.co2}ppm</span>
                            </div>
                            <div style={gmair_machine_index_desc_item}>
                                <span style={gmair_icon_active}>
                                    <i className='fa fa-thermometer'></i>
                                </span>
                                <span>&nbsp;{this.state.temp}°C</span>
                            </div>
                            <div style={gmair_machine_index_desc_item}>
                                <span style={gmair_icon_active}>
                                    <i className='glyphicon glyphicon-tint'></i>
                                </span>
                                <span>&nbsp;{this.state.humid}%</span>
                            </div>
                        </div>
                    </div>
                    <Outdoor qrcode={this.props.match.params.qrcode} city={this.refresh_city}/>
                    <Operation qrcode={this.props.match.params.qrcode}
                               power_status={this.state.power_status} operate_local_power={this.operate_local_power}
                               volume_value={this.state.volume} operate_local_volume={this.operate_local_volume}
                               work_mode={this.state.work_mode} operate_local_mode={this.operate_local_mode}
                               light={this.state.light} operate_local_light={this.operate_local_light}
                               heat={this.state.heat_mode} operate_local_heat={this.operate_local_heat}
                               lock={this.state.lock} operate_local_lock={this.operate_local_lock}
                    />
                    <div style={charts_area}>
                        <PM2_5Charts qrcode={this.props.match.params.qrcode}/>
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

const address = {
    fontSize: `1.6rem`,
    height: `100%`
}

class Outdoor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            province: '',
            city: '',
            province_id: '',
            city_id: '',
            configure_outdoor: false,
            outdoor_aqi: 0,
            outdoor_level: '',
            outdoor_pm2_5: 0
        };
        this.obtain_aqi = this.obtain_aqi.bind(this);
        this.refresh_city = this.refresh_city.bind(this);
        this.trigger_config_outdoor = this.trigger_config_outdoor.bind(this);
    }

    refresh_city = (city_id) => {
        this.setState({city_id: city_id});
        locationservice.city_profile(city_id).then(response => {
            this.setState({city: response.data[0].cityName, province_id: response.data[0].provinceId})
        })
        this.setState({configure_outdoor: false});
        this.obtain_aqi();
    }

    obtain_aqi = () => {
        airquality_service.obtain_latest_aqi(this.state.city_id).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                let air = response.data[0];
                this.setState({outdoor_aqi: air.aqi, outdoor_level: air.aqiLevel, outdoor_pm2_5: air.pm2_5})
            }
            if (response.responseCode == 'RESPONSE_NULL') {
                locationservice.city_profile(this.state.city_id).then(response => {
                    if (response.responseCode === 'RESPONSE_OK') {
                        this.setState({city: response.data[0].cityName, province_id: response.data[0].provinceId})
                        airquality_service.obtain_latest_aqi(response.data[0].provinceId).then(response => {
                            if (response.responseCode === 'RESPONSE_OK') {
                                let air = response.data[0];
                                this.setState({
                                    outdoor_aqi: air.aqi,
                                    outdoor_level: air.aqiLevel,
                                    outdoor_pm2_5: air.pm2_5
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    trigger_config_outdoor = () => {
        this.setState({configure_outdoor: true})
    }

    componentDidMount() {
        machine_service.obtain_current_city(this.props.qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.setState({city_id: response.data[0].cityId});
                locationservice.city_profile(response.data[0].cityId).then(response => {
                    this.setState({city: response.data[0].cityName, province_id: response.data[0].provinceId})
                })
                this.obtain_aqi()
            }
            if (response.responseCode === 'RESPONSE_NULL') {
                locationservice.tell_location().then(response => {
                    this.setState({
                        province: response.data.province,
                        city: response.data.city,
                        city_id: response.data.code
                    });
                    this.obtain_aqi()
                })
            }
        })
    }

    render() {
        return (
            <div style={outdoor_area}>
                <div style={outdoor_title}>
                    {
                        this.state.configure_outdoor ?
                            <Location qrcode={this.props.qrcode} refresh_city={this.refresh_city}/>
                            :
                            <div style={address} onClick={this.trigger_config_outdoor}>
                                <Label bsStyle="success">{this.state.city}</Label>
                            </div>
                    }

                </div>
                {
                    this.state.cityId !== '' ?
                        <div>
                            <hr/>
                            <div style={outdoor_area_content}>
                                <div style={outdoor_pm2_5}>
                        <span style={gmair_icon_active}>
                            空气质量
                        </span>
                                    <span>&nbsp;{this.state.outdoor_level}</span>
                                </div>
                                <div style={outdoor_temp}>
                        <span style={gmair_icon_active}>
                            AQI
                        </span>
                                    <span>&nbsp;{this.state.outdoor_aqi}</span>
                                </div>
                                <div style={outdoor_humid}>
                        <span style={gmair_icon_active}>
                            PM2.5
                        </span>
                                    <span>&nbsp;{this.state.outdoor_pm2_5}</span>
                                </div>
                            </div>
                            <hr/>
                        </div>
                        :
                        ''
                }

            </div>
        )
    }
}

export default MachineDetail;