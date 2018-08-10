import React from 'react'
import {util} from "../service/util";
import {wechatservice} from "../service/wechat.service";

import {Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap'
import {consumerservice} from "../service/consumer.service";

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

class WechatBind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openid: null
        }
        this.bind_wechat = this.bind_wechat.bind(this);
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

                        let reg = new RegExp("(^|&)code=([^&]*)(&|$)");
                        let r = this.props.location.search.substr(1).match(reg);
                        let code = '';
                        if (r != null) {
                            code = unescape(r[2]);
                        }
                        if (code !== '') {
                            wechatservice.openidbycode(code).then(response => {
                                if (response.responseCode === 'RESPONSE_OK') {
                                    let openid = response.data;
                                    localStorage.setItem('openid', openid);
                                    this.setState({openid: openid});
                                }
                            })
                        }
                    });
                }
            });
        } else {
            alert("seems that you are not in wechat")
        }
    }

    bind_wechat = () => {
        consumerservice.bind_wechat(this.state.openid).then(response => {
            if(response.responseCode === 'RESPONSE_OK') {
                window.location.href = '/personal/information'
            }
        })
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
    }

    render() {
        return (
            <div style={gmair_init_page}>
                <div style={gmair_device_name}>
                    <div><span style={gmair_device_name_text}><i
                        className='glyphicon glyphicon-home'></i>&nbsp;微信绑定</span></div>
                </div>
                <div style={gmair_device_name_arc}></div>
                <div style={gmair_device_content}>
                    <FormGroup>
                        <ControlLabel>
                            <div style={gmair_device_item}><span><i
                                className='fa fa-wechat'></i></span> &nbsp;微信识别
                            </div>
                            <div style={code_area}>
                                {this.state.openid !== null ? '微信识别成功' : '微信识别失败'}
                            </div>
                        </ControlLabel>
                    </FormGroup>
                </div>
                <div style={gmair_confirm_btn} onClick={this.bind_wechat}>
                    <Button bsStyle='info' block>确认绑定</Button>
                </div>
            </div>
        )
    }
}

export default WechatBind