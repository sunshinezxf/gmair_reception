import React from 'react'

import scan from './scan.png'
import {util} from "../service/util";
import {machine_service} from "../service/mahcine.service";

const scan_area = {
    width: `100%`,
    textAlign: `center`,
    marginTop: `1.5rem`
}

const scan_style = {
    width: `8rem`,
    height: `8rem`
}

class DeviceScan extends React.Component {
    constructor(props) {
        super(props);
        this.scan_qrcode = this.scan_qrcode.bind(this);
    }

    componentDidMount() {
        if (util.is_weixin()) {

        }
    }

    render() {
        return (
            <div style={scan_area} onClick={this.scan_qrcode}>
                <div>
                    <img src={scan} style={scan_style}></img>
                </div>
                <div>添加设备</div>
            </div>
        )
    }

    scan_qrcode = () => {
        if (util.is_weixin()) {
            window.wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    machine_service.obtain_code_value_via_url(result).then(response => {
                        console.log(response);
                    })
                }
            });
        } else {
            alert("请使用微信打开")
        }
    }
}

export default DeviceScan;