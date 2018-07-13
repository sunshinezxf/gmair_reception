import React from 'react'

import MachineItem from './machineitem'

import {wechatservice} from "../service/wechat.service";
import {machine_service} from "../service/mahcine.service";
import {util} from "../service/util";

const machine_item_gap = {
    marginTop: `1rem`
}

class MachineList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            machine_list: []
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
        let access_token = localStorage.getItem('access_token');
        if (access_token === undefined || access_token === null || access_token === '') {
            this.props.history.push('/login');
            return;
        }
        // util.load_script("https://reception.gmair.net/plugin/vconsole.min.js", () => {
        //     var vConsole = new window.VConsole();
        // })
        util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
            this.init_config();
        })
        //load machine list
        machine_service.obtain_machine_list().then(response => {
            this.setState({machine_list: response.data})
        });
    }

    render() {
        let machine_list = this.state.machine_list;
        let element = machine_list.map(function (item) {
            return (
                <div>
                    <MachineItem qrcode={item.codeValue}/>
                    <div style={machine_item_gap}></div>
                </div>
            )
        })
        return (
            <div>
                {element}
            </div>
        );
    }
}

export default MachineList;