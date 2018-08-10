import React from 'react'
import {util} from "../service/util";
import {wechatservice} from "../service/wechat.service";
import {machine_service} from "../service/mahcine.service"
import {consumerservice} from "../service/consumer.service";
import {Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap'


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

const code_area = {
    width: `100%`,
    textAlign: `center`
}

class DeviceBind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qrcode: '',
            bind_name: '',
            already_bind: false,
            ready2confirm: false
        };
        this.init_config = this.init_config.bind(this);
        this.confirm_bind = this.confirm_bind.bind(this);
        this.machine_list = this.machine_list.bind(this);
        this.read_name = this.read_name.bind(this);
        this.validate_name = this.validate_name.bind(this);
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

    confirm_bind = () => {
        machine_service.gain_share(this.state.qrcode, this.state.bind_name).then(response => {
            console.log(response)
            if (response.responseCode === 'RESPONSE_OK') {
                window.location.href = '/machine/list'
            }
        })
    }

    machine_list = () => {
        window.location.href = '/machine/list'
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

    componentDidMount() {
        if (util.is_weixin()) {
            if (util.is_weixin()) {
                util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
                    this.init_config();
                })
            }
        }
        // util.load_script("https://reception.gmair.net/plugin/vconsole.min.js", () => {
        //     var vConsole = new window.VConsole();
        // })
        this.setState({qrcode: this.props.match.params.qrcode});
        consumerservice.can_operate(this.props.match.params.qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.setState({already_bind: true})
            }
            if (response.responseCode === 'RESPONSE_ERROR') {
                window.location.href = '/login';
                return;
            }
        })
    }

    read_name = (e) => {
        this.setState({bind_name: e.target.value}, this.validate_name);
    }

    render() {
        return (
            <div style={gmair_init_page}>
                <div style={gmair_device_name}>
                    <div><span style={gmair_device_name_text}><i
                        className='glyphicon glyphicon-home'></i>&nbsp;设备关联</span></div>
                </div>
                <div style={gmair_device_name_arc}></div>
                <div style={gmair_device_content}>
                    {this.state.already_bind ?
                        ''
                        :
                        <FormGroup>
                            <ControlLabel>
                                <div style={gmair_device_item}><span><i
                                    className='glyphicon glyphicon-pencil'></i></span> &nbsp;设备名称
                                </div>
                            </ControlLabel>
                            <FormControl style={transparent_input} type="text" placeholder="请输入设备别名"
                                         onChange={this.read_name}/>
                        </FormGroup>
                    }
                    <FormGroup>
                        <ControlLabel>
                            <div style={gmair_device_item}><span><i
                                className='fa fa-tag'></i></span> &nbsp;设备二维码
                            </div>
                            <div style={code_area}>
                                {this.state.qrcode}
                            </div>
                        </ControlLabel>
                    </FormGroup>
                </div>
                <div style={gmair_confirm_btn}>
                    {
                        this.state.already_bind ?
                            <Button bsStyle='info' onClick={this.machine_list} block>设备列表</Button>
                            :
                            <Button bsStyle='info' onClick={this.confirm_bind} block
                                    disabled={!this.state.ready2confirm}>确认关联</Button>

                    }


                </div>
            </div>
        )
    }
}

export default DeviceBind