import React from 'react'

import QRCode from 'qrcode.react'

import {util} from "../service/util";
import {wechatservice} from "../service/wechat.service";

import {Button, ControlLabel, FormGroup} from 'react-bootstrap'

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

const code_area = {
    width: `100%`,
    textAlign: `center`
}

const description = {
    width: `100%`,
    textAlign: `center`,
    color: `grey`,
    marginTop: `2rem`,
    fontSize: `1.2rem`
}

const gmair_confirm_btn = {
    width: `85%`,
    margin: `5rem 7.5% 0 7.5%`,
    textAlign: `center`
}

class DeviceShare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qrcode: null,
            model_code: '',
            size: 180,
            fgColor: '#00AEEF',
            bgColor: '#F3F3F3',
            level: 'H',
            renderAs: 'svg',
        }
        this.init_config = this.init_config.bind(this);
        this.device_list = this.device_list.bind(this);
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

    device_list = () => {
        window.location.href = '/machine/list';
    }

    componentDidMount() {
        if (util.is_weixin()) {
            if (util.is_weixin()) {
                util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
                    this.init_config();
                })
            }
        }
        let qrcode = this.props.match.params.qrcode;
        let url = window.location.protocol  + "//" + window.location.hostname + '/machine/bind/' + qrcode;
        this.setState({qrcode: url});
    }

    render() {
        return (
            <div style={gmair_init_page}>
                <div style={gmair_device_name}>
                    <div><span style={gmair_device_name_text}><i
                        className='glyphicon glyphicon-home'></i>&nbsp;设备分享</span></div>
                </div>
                <div style={gmair_device_name_arc}></div>
                <div style={gmair_device_content}>
                    <FormGroup>
                        <ControlLabel>
                            <div style={gmair_device_item}><span><i
                                className='fa fa-qrcode'></i></span> &nbsp;分享二维码
                            </div>
                        </ControlLabel>
                        <div style={code_area}>
                            {this.state.qrcode !== null
                                ?
                                <QRCode
                                    value={this.state.qrcode}
                                    size={this.state.size}
                                    fgColor={this.state.fgColor}
                                    bgColor={this.state.bgColor}
                                    level={this.state.level}
                                    renderAs={this.state.renderAs}
                                />
                                :
                                ''
                            }
                        </div>
                        <div style={description}>您的家人可以通过此二维码获取设备控制权</div>
                    </FormGroup>
                </div>
                <div style={gmair_confirm_btn}>
                    <Button bsStyle='info' onClick={this.device_list} block>返回列表</Button>
                </div>
            </div>
        )
    }
}

export default DeviceShare