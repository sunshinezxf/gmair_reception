import React from 'react'

import {Alert, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import {machine_service} from '../service/mahcine.service';
import {util} from "../service/util";
import {wechatservice} from "../service/wechat.service";

import InitProgress from './initprogress'



const gmair_init_page = {
    width: `100%`,
    height: `100%`,
    backgroundColor: `#F3F3F3`
}

const gmair_device_name = {
    padding: `5rem 0 1rem 0`,
    width: `100%`,
    textAlign: `center`,
    backgroundColor: `#00AEEF`,
    opacity: `0.75`,
    border: `solid #00AEEF`,
    fontSize: `1.6rem`
}

const gmair_device_name_text = {
    color: `white`,
    letterSpacing: `0.05rem`,
    fontFamily: `FZLanTingKanHei-R-GBK`,
    fontWeight: `lighter`
}

const gmair_device_item = {
    color: `#00AEEF`,
    letterSpacing: `0.05rem`,
    fontFamily: `FZLanTingKanHei-R-GBK`,
    fontWeight: `lighter`
}

const gmair_device_name_arc = {
    backgroundColor: `#00AEEF`,
    border: `0.1rem solid #00AEEF`,
    borderRadius: `0 0 50rem 50rem`,
    height: `4rem`,
    width: `100%`,
    opacity: `0.75`
}

const gmair_device_content = {
    width: `90%`,
    margin: `10rem 5% 0rem 5%`
}

const transparent_input = {
    backgroundColor: `#F3F3F3`,
    color: `black`,
    border: `1px solid transparent`,
    borderBottom: `1px solid #C9C9C9`,
    boxShadow: `unset`,
    width: `100%`
}

const gmair_confirm_btn = {
    width: `85%`,
    margin: `5rem 7.5% 0 7.5%`,
    textAlign: `center`
}

class DeviceInit extends React.Component {
    constructor(props) {
        super(props);
        this.close_window = this.close_window.bind(this);
        this.confirm_init = this.confirm_init.bind(this);
        this.read_name = this.read_name.bind(this);
        this.validate_name = this.validate_name.bind(this);
        this.init_config = this.init_config.bind(this);
        this.submit_init = this.submit_init.bind(this);
        this.config_network = this.config_network.bind(this);
        this.device_list = this.device_list.bind(this);
        this.state = {
            qrcode: '',
            bind_name: '',
            model_code: '',
            ready2confirm: false,
            not_exist: false,
            already_occupied: false,
            show_progress: false,
            progress_finished: false,
            config_network: false,
            init_failed: false
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
            alert("seems that you are not in wechat")
        }
    }

    componentDidMount() {
        if (util.is_weixin()) {
            util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
                this.init_config();
            })
        }
        let access_token = localStorage.getItem("access_token");
        if (access_token === undefined || access_token === null || access_token === '') {
            window.location.href = '/login';
        }
        let qrcode = this.props.match.params.qrcode;
        this.setState({qrcode: qrcode})
        // util.load_script("https://reception.gmair.net/plugin/vconsole.min.js", () => {
        //     var vConsole = new window.VConsole();
        // })
        machine_service.check_exist(qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_ERROR') {
                window.location.href = '/login';
                return;
            }
            if (response.responseCode === 'RESPONSE_NULL') {
                //qrcode not exist
                this.setState({not_exist: true})
                return;
            }
            //check whether the qrcode is already binded with the current customer
            machine_service.check_exist_bind(qrcode).then(response => {
                if (response.responseCode === 'RESPONSE_OK') {
                    this.setState({already_occupied: true})
                } else if (response.responseCode === 'RESPONSE_NULL') {
                    this.setState({already_occupied: false})
                }
            });
            this.setState({not_exist: false});
            machine_service.obtain_model(response.data[0].modelId).then(response => {
                if (response.responseCode === 'RESPONSE_OK') {
                    this.setState({model_code: response.data[0].modelCode})
                }
            });
        })
    }

    confirm_init = () => {
        this.setState({show_progress: true});
    }

    submit_init = () => {
        this.setState({progress_finished: true});
        machine_service.confirm_init(this.state.qrcode, this.state.bind_name).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.setState({init_failed: false})
                //check whether the machine is online
                machine_service.check_online(this.state.qrcode).then(response => {
                    if(response.responseCode === 'RESPONSE_OK') {
                        this.setState({config_network: false})
                    }else {
                        this.setState({config_network: true})
                    }
                })
            } else if (response.responseCode === 'RESPONSE_NULL') {
                this.setState({init_failed: true});
            } else {
                this.setState({init_failed: true});
            }
        })
    }

    read_name = (e) => {
        this.setState({bind_name: e.target.value}, this.validate_name);
    }

    validate_name = () => {
        let bind_name = this.state.bind_name;
        if (bind_name !== '') {
            machine_service.check_exist_name(this.state.qrcode, this.state.bind_name).then(response => {
                if (response.responseCode === 'RESPONSE_OK') {
                    this.setState({ready2confirm: false});
                } else if (response.responseCode === 'RESPONSE_NULL') {
                    this.setState({ready2confirm: true});
                } else {
                    this.setState({ready2confirm: false});
                }
            });
        }
    }

    close_window = () => {
        window.wx.closeWindow();
    }

    config_network = () => {
        window.location.href = '/network/config';
    }

    device_list = () => {
        window.location.href = '/machine/list';
    }

    render() {
        let not_exist_name_arc =
            <div style={gmair_device_content}>
                <Alert bsStyle="info">
                    二维码信息（{this.state.qrcode}）似乎存在问题，请您与工作人员联系，以进行确认。
                </Alert>
            </div>
        let alreay_occupied_name_arc =
            <div style={gmair_device_content}>
                <Alert bsStyle="info">
                    设备（{this.state.qrcode}）已被初始化过，您无需再次配置，请进行确认。
                </Alert>
            </div>
        let init_content =
            <div style={gmair_device_content}>
                <FormGroup>
                    <ControlLabel>
                        <div style={gmair_device_item}><span><i
                            className='glyphicon glyphicon-pencil'></i></span> &nbsp;设备名称
                        </div>
                    </ControlLabel>
                    <FormControl style={transparent_input} type="text" placeholder="请输入设备别名"
                                 onChange={this.read_name}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>
                        <div style={gmair_device_item}><span><i
                            className='glyphicon glyphicon-tags'></i></span> &nbsp;设备型号
                        </div>
                    </ControlLabel>
                    <FormControl style={transparent_input} type="text" value={this.state.model_code}
                                 disabled/>
                </FormGroup>
            </div>

        return (
            <div style={gmair_init_page}>
                <div style={gmair_device_name}>
                    <div><span style={gmair_device_name_text}><i
                        className='glyphicon glyphicon-home'></i>&nbsp;设备初始化</span></div>
                </div>
                {
                    this.state.show_progress ?
                        <InitProgress init={this.submit_init}/>
                        :
                        <div>
                            <div style={gmair_device_name_arc}></div>
                            {this.state.not_exist ? not_exist_name_arc : ''}
                            {this.state.already_occupied ? alreay_occupied_name_arc : ''}
                            {this.state.not_exist || this.state.already_occupied ? '' : init_content}
                            {
                                this.state.not_exist || this.state.already_occupied ?
                                    <div style={gmair_confirm_btn}>
                                        <Button bsStyle='info' onClick={this.close_window} block>我知道了</Button>
                                    </div>
                                    :
                                    <div style={gmair_confirm_btn}>
                                        <Button bsStyle='info' onClick={this.confirm_init} block
                                                disabled={!this.state.ready2confirm}>确认信息</Button>
                                    </div>
                            }
                        </div>
                }
                {
                    this.state.init_failed && this.state.progress_finished ?
                        <Alert bsStyle="info">
                            设备初始化出现异常，请您与工作人员联系。
                        </Alert> :
                        ''
                }
                {
                    this.state.progress_finished && this.state.config_network ?
                        <div style={gmair_confirm_btn}>
                            <Button bsStyle='info' onClick={this.config_network} block>前往配网</Button>
                        </div>
                        :
                        ''
                }
                {
                    this.state.progress_finished && !this.state.config_network ?
                        <div style={gmair_confirm_btn}>
                            <Button bsStyle='info' onClick={this.device_list} block>查看设备</Button>
                        </div>
                        :
                        ''
                }
            </div>
        )
    }
}

export default DeviceInit