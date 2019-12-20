import React from 'react'

import {wechatservice} from "../service/wechat.service";
import {machine_service} from "../service/mahcine.service";
import {util} from "../service/util";
import DeviceScan from "./devicescan";

import '../../antd-mobile.css';


import {Card, PullToRefresh, SwipeAction, WhiteSpace, WingBlank} from 'antd-mobile';
import Navigation from "../navigation/navigation";
import DeviceItem from "./deviceitem.js";
import FanItem from "./fanitem";
import './devicelist.css'

class DeviceList extends React.Component {
    constructor(props) {
        super(props);
        this.unbind = this.unbind.bind(this);
        this.share = this.share.bind(this);
        this.refresh_list = this.refresh_list.bind(this);
        this.scan_qrcode = this.scan_qrcode.bind(this);
        this.state = {
            machine_list: [],
            loading: true
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
    };

    unbind = (code_value) => {
        machine_service.unbind(code_value).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                machine_service.obtain_device_list().then(response => {
                    if (response.responseCode === 'RESPONSE_OK') {
                        this.setState({machine_list: response.data, loading: false})
                    } else if (response.responseCode === 'RESPONSE_NULL') {
                        this.setState({machine_list: [], loading: false});
                    } else {
                        window.location.href = '/login';
                    }
                });
            }
        });
    };

    share = (code_value) => {
        window.location.href = '/machine/share/' + code_value;
    };

    componentDidMount() {
        let access_token = localStorage.getItem('access_token');
        // localStorage.setItem("access_token",'73e3c9b3-184d-4ce1-8079-e91018b18e6b')
        if (access_token === undefined || access_token === null || access_token === '') {
            window.location.href = '/login';
            return;
        }
        // util.load_script("https://reception.gmair.net/plugin/vconsole.min.js", () => {
        //     var vConsole = new window.VConsole();
        // })
        if (util.is_weixin()) {
            util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
                this.init_config();
            })
        }
        //load machine list
        this.setState({loading: true});
        machine_service.obtain_device_list().then(response => {
            console.log(response)
            if (response.responseCode === 'RESPONSE_OK') {
                this.setState({machine_list: response.data, loading: false})
            } else if (response.responseCode === 'RESPONSE_NULL') {
                this.setState({machine_list: [], loading: false})
            } else {
                window.location.href = '/login';
            }
        });
    }

    refresh_list = () => {
        this.setState({loading: true});
        machine_service.obtain_device_list().then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.setState({machine_list: response.data})
            } else if (response.responseCode === 'RESPONSE_NULL') {

            } else {
                window.location.href = '/login';
                return;
            }
        });
        setTimeout(() => {
            this.setState({loading: false});
        }, 1000);
    };

    scan_qrcode = () => {
        if (util.is_weixin()) {
            window.wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    machine_service.obtain_code_value_via_url(result).then(response => {
                        if (response.responseCode === 'RESPONSE_OK') {
                            window.location.href = '/init/' + response.data[0].codeValue;
                        } else {
                            window.location.href = result;
                        }
                    })
                }
            });
        } else {
            alert("请使用微信打开")
        }
    };

    render() {
        let machine_list = this.state.machine_list;
        let that = this;
        console.log(machine_list)
        let element = machine_list.map(function (item) {
            // console.log("render" + item.bindName);
            return (
                <div key={item.codeValue}>
                    <WingBlank size="md">
                        <WhiteSpace size="md"/>
                        <Card>
                            <SwipeAction autoClose left={[
                                {
                                    text: '删除',
                                    style: {backgroundColor: '#F4333C', color: 'white'},
                                    onPress: () => {
                                        that.unbind(item.codeValue);
                                    }
                                }
                            ]} right={
                                item.ownership === 'SHARE' ?
                                    '' :
                                    [{
                                        text: '分享',
                                        style: {backgroundColor: '#108ee9', color: 'white'},
                                        onPress: () => {
                                            that.share(item.codeValue);
                                        },
                                    }]

                            }>
                                <Card.Header title={item.bindName}/>
                                <Card.Body>
                                    {item.goodsId==="GUO20180607ggxi8a96"&&
                                    <DeviceItem url={item.modelThumbnail} qrcode={item.codeValue} goods_name={item.goodsName} model_name={item.modelName}/>
                                    }
                                    {item.goodsId==="GUO20191208249y7f32"&&
                                    <FanItem url={item.modelThumbnail} qrcode={item.codeValue} goods_name={item.goodsName} model_name={item.modelName}/>
                                    }
                                </Card.Body>
                            </SwipeAction>
                        </Card>
                    </WingBlank>
                </div>

            )
        });

        return (
            <div className="user_select_disable" style={{background:'#f2f2f2',minHeight:window.innerHeight}}>
                {/*{element}*/}
                <PullToRefresh refreshing={this.state.loading} onRefresh={this.refresh_list} distanceToRefresh={60}>
                    {!this.state.loading && element}
                    {!this.state.loading &&
                    <DeviceScan scan={this.scan_qrcode}/>
                    }
                </PullToRefresh>
                {this.state.loading &&
                <div>数据获取中</div>
                }
                <Navigation index={0}/>
            </div>
        );
    }
}

export default DeviceList;
