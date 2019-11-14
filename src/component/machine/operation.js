import React, {Component} from 'react';
// import SettingSelect from '../../containers/machine/operation';
import SettingSelect from '../../containers/machine/settingSelect';
import {NavBar, Icon} from 'antd-mobile';
import {machine_service} from "../service/mahcine.service";
import {operation_service} from "../service/operation.service";
import {consumerservice} from "../service/consumer.service";
import {util} from "../service/util";
import {wechatservice} from "../service/wechat.service";
import createHistory from 'history/createBrowserHistory'

const history = createHistory();

class MachineOperation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 0,
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
                        jsApiList: ['hideAllNonBaseMenuItem', 'closeWindow'] // 必填，需要使用的JS接口列表
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

    componentDidMount() {
        util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
            this.init_config();
        })
        let qrcode = this.props.match.params.qrcode;
        this.props.qrcodeStore(qrcode);
        consumerservice.can_operate(qrcode).then(response => {
            if (response.responseCode !== "RESPONSE_OK") {
                window.location.href = "/machine/list";
            }
        })
        operation_service.obtain_timing_status(qrcode).then(response => {
            if (response.responseCode === "RESPONSE_OK") {
                if (response.data[0].status) {
                    this.props.expandTiming();
                    this.props.switchOn();
                }
                response = response.data[0];
                this.props.componentIn(response.startTime.hour, response.startTime.minute, response.endTime.hour,
                    response.endTime.minute, operation_service.format_time(response.startTime.hour, response.startTime.minute),
                    operation_service.format_time(response.endTime.hour, response.endTime.minute));
            }
        })
        machine_service.obtain_bind_info(qrcode).then(response => {
            if (response.responseCode === "RESPONSE_OK") {
                this.props.inputUsername(response.data[0].bindName);
            }
        })
    }

    render() {
        const setting_container = {
            height: window.innerHeight,
            width: window.innerWidth,
            backgroundColor: `#dbdbdb`
        }
        return (

            <div>
                <div className="setting_container" style={setting_container}>
                    <NavBar
                        mode="light"
                        leftContent={[<Icon key="return" type="left"/>]}
                        onLeftClick={() => {
                            history.goBack();
                        }}
                    >新风设置</NavBar>
                    {this.state.mode === 0 &&
                    <SettingSelect qrcode={this.props.qrcode}/>
                    }
                </div>
            </div>
        )
    }
}


export default MachineOperation;
