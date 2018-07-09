import React from 'react'

import wifi_config from './wifi_config.png'

import {Button} from 'react-bootstrap'

import {util} from '../service/util.js'

import {wechatservice} from "../service/wechat.service";

const gmair_network_page = {
    width: `100%`,
    height: `100%`,
    backgroundSize: `100% 100%`,
    backgroundColor: `#F3F3F3`
}

const wifi_logo_area = {
    width: `100%`,
    padding: `6.5rem 0 1.5rem 0`,
    textAlign: `center`
}

const logo = {
    height: `12.5rem`,
    width: `12.5rem`
}

const wifi_prompt_area = {
    width: `100%`,
    color: `#58595B`,
    fontFamily: `sans-serif FZLanTingKanHei-R-GBK`,
    marginTop: `5rem`,
    textAlign: `center`
}

const wifi_prompt_item = {
    margin: `1rem 0 1.5rem 0`,
    letterSpacing: `0.15rem`,
    fontWeight: `lighter`
}

const wifi_operation_area = {
    textAlign: `center`,
    margin: `8rem 8% 0 8%`
}

const lauch_config_btn = {
    textAlign: `center`,
    backgroundColor: `transparent`,
    color: `#58595B`,
    letterSpacing: `0.1rem`
}


class NetworkConfig extends React.Component {
    constructor(props) {
        super(props);

        this.init_config = this.init_config.bind(this);

        this.state = {
            show_config_button: true
        }
    }

    begin_config = () => {
        window.wx.invoke('configWXDeviceWiFi', {}, function (response) {
            if (response.err_msg === 'configWXDeviceWiFi:ok') {

            } else if (response.err_msg === 'configWXDeviceWiFi:fail') {

            } else if (response.err_msg === 'configWXDeviceWiFi:cancel') {

            }
        })
    };

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
                        jsApiList: ['configWXDeviceWiFi', 'getWXDeviceInfos', 'hideAllNonBaseMenuItem', 'openWXDeviceLib'] // 必填，需要使用的JS接口列表
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
        // util.load_script("https://reception.gmair.net/plugin/vconsole.min.js", () => {
        //     var vConsole = new window.VConsole();
        // })
        util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
            this.init_config();
        })
    }

    render() {
        return (
            <div style={gmair_network_page}>
                <div style={wifi_logo_area}>
                    <img src={wifi_config} style={logo} alt="WIFI_CONFIG"></img>
                </div>
                <div style={wifi_prompt_area}>
                    <div style={wifi_prompt_item}>1.确定手机已连接Wi-Fi(2.4G网络)</div>
                    <div style={wifi_prompt_item}>2.请长按设备上的配置键(即辅热)按钮</div>
                    <div style={wifi_prompt_item}>3.请等待Wi-Fi配置指示灯闪烁后松开</div>
                </div>
                <div style={wifi_operation_area}>
                    <Button block style={lauch_config_btn} onClick={this.begin_config}>开始配置</Button>
                </div>
            </div>
        );
    }
}

export default NetworkConfig;