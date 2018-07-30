import React from 'react'

import Operation from './machineoperation'
import PM2_5Charts from "./pm2_5charts";

import {wechatservice} from "../service/wechat.service";
import {util} from "../service/util";
import {machine_service} from "../service/mahcine.service";


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
        this.obtain_machine_status = this.obtain_machine_status.bind(this);
        this.state = {
            qrcode: '',
            online: false,
            pm2_5: '',
            volume: '',
            temp: '',
            humid: '',
            power_status: 'off'
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
                this.setState({
                    online: false,
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

    power_operate = () => {
        if (this.state.power_status == 'on') {
            this.setState({power_status: 'off'});
            machine_service.power(this.state.qrcode, 'off');
        } else {
            this.setState({power_status: 'on'});
            machine_service.power(this.props.qrcode, 'on');
        }
    }

    componentDidMount() {
        util.load_script("https://reception.gmair.net/plugin/vconsole.min.js", () => {
            var vConsole = new window.VConsole();
        })
        util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
            this.init_config();
        })
        let qrcode = this.props.match.params.qrcode;
        this.setState({qrcode: qrcode});
        this.obtain_machine_status(qrcode);
        setInterval(() => {
            this.obtain_machine_status(qrcode);
        }, 10000);
    }

    render() {
        return (
            <div>
                <div style={gmair_machine_index}>
                    <div style={gmair_machine_pm2_5}>PM2.5 优</div>
                    <div style={indoor_index}>
                        <div style={gmair_machine_pm2_5_value}>{util.format_pm2_5(this.state.pm2_5)}</div>
                        <div style={gmair_machine_index_desc}>
                            <div style={gmair_machine_index_desc_item}>
                                <span style={gmair_icon_active} className='spin'>
                                    <i className='fa fa-superpowers'></i>
                                </span>
                                <span>&nbsp;{this.state.volume}³/h</span>
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
                    <Outdoor qrcode={this.state.qrcode}/>
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

const location_area = {
    width: `30%`,
    height: `2rem`,
    color: `black`
}

class Outdoor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            province: '',
            city: '',
            district: ''
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div style={outdoor_area}>
                <div style={outdoor_title}>
                    <span><i className='fa fa-location-arrow'></i></span>
                    <select style={location_area}>
                        <option>北京市</option>
                    </select>
                    <select style={location_area}>
                        <option>秦淮区</option>
                    </select>
                    <select style={location_area}>
                        <option>朝天宫</option>
                    </select>
                </div>
                <hr/>
                <div style={outdoor_area_content}>
                    <div style={outdoor_pm2_5}>
                        <span style={gmair_icon_active}>
                            <i className='glyphicon glyphicon-leaf'></i>
                        </span>
                        <span>&nbsp;47ug/m³</span>
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