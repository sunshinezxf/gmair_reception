import React,{Component} from 'react';
import FreshHeader from '../../containers/fresh/header'
import OperationPanel from '../../containers/fresh/operation_panel';
import MachineData from '../../containers/fresh/machine_data';
import PM2_5Charts from '../../containers/fresh/chart'
import {util} from "../service/util";
import {wechatservice} from "../service/wechat.service";
import {machine_service} from "../service/mahcine.service";
import './fresh.css'
import {locationservice} from "../service/location.service";
import {airquality_service} from "../service/airquality.service";
class FreshPanel extends Component{
    constructor(props) {
        super(props);
        this.obtain_machine_status = this.obtain_machine_status.bind(this);
        this.edit_operation = this.edit_operation.bind(this);
        this.confirm_bind_name = this.confirm_bind_name.bind(this);
        this.check_qrcode = this.check_qrcode.bind(this);
        this.check_control_option = this.check_control_option.bind(this);
        let qrcode = this.props.match.params.qrcode;
        this.props.changeQrcode(qrcode);
    }

    edit_operation = () => {
        this.setState({edit_machine_name: !this.state.edit_machine_name})
    }

    confirm_bind_name = () => {
        machine_service.config_bind_name(this.props.qrcode, this.state.bind_name).then(response => {
            console.log(JSON.stringify(response))
        })
        this.edit_operation();
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

    obtain_machine_status = (qrcode) => {
        machine_service.obtain_machine_status(qrcode).then(response => {
            //machine online
            if (response.responseCode === 'RESPONSE_OK') {
                let information = response.data;
                information['power_status'] = information.power===1
                information['work_mode'] = util.tell_mode(information.mode, this.props.work_mode_list)
                this.props.changeMachineStatus(information);
            }
        });
    }

    check_qrcode = (qrcode) => {
        machine_service.check_exist(qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                let info = response.data[0];
                this.props.changeMachine(info)
                this.check_control_option(info.modelId)
                machine_service.probe_component(info.modelId, 'CO2').then(response => {
                    if (response.responseCode === 'RESPONSE_OK') {
                        this.props.co2IsPresent(true)
                    } else {
                        this.props.co2IsPresent(false)
                    }
                })
                machine_service.probe_component(info.modelId, 'LOCK').then(response => {
                    if (response.responseCode === 'RESPONSE_OK') {
                        this.props.lockIsPresent(true)
                    } else {
                        this.props.lockIsPresent(false)
                    }
                })
            } else {
                window.location.href = '/machine/list'
            }
        })
    }

    check_control_option = (model_id) => {
        machine_service.obtain_control_option(model_id).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                let control_list = response.data;
                for (let i = 0; i < control_list.length; i++) {
                    let item = control_list[i];
                    if (item.optionComponent === 'heat') {
                        let action_list = item.actions;
                        let heat_list = [];
                        for (let index in action_list) {
                            let action_item = action_list[index];
                            heat_list[action_item.commandValue] = {
                                name: action_item.actionName,
                                operator: action_item.actionOperator
                            }
                        }
                        this.props.changeHeatList(heat_list)
                    }
                    if (item.optionComponent === 'mode') {
                        let action_list = item.actions;
                        let mode_list = [];
                        for (let index in action_list) {
                            let action_item = action_list[index];
                            mode_list[action_item.commandValue] = {
                                name: action_item.actionName,
                                operator: action_item.actionOperator
                            }
                        }
                        this.props.changeModeList(mode_list)
                    }
                }
                this.obtain_machine_status(this.props.qrcode);
            }
        })
    }

    componentWillMount(){
        let qrcode = this.props.match.params.qrcode;
        this.check_qrcode(qrcode);
    }

    componentDidMount() {
        // util.load_script("https://reception.gmair.net/plugin/vconsole.min.js", () => {
        //     var vConsole = new window.VConsole();
        // })
        util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
            this.init_config();
        })
        let qrcode = this.props.match.params.qrcode;
        this.props.changeQrcode(qrcode)
        this.getLocation(qrcode);
        //获取设备名称
        // machine_service.obtain_bind_info(qrcode).then(response => {
        //     if (response.responseCode === 'RESPONSE_OK') {
        //         this.setState({bind_name: response.data[0].bindName})
        //     }
        // })
        setInterval(() => {
            this.obtain_machine_status(qrcode);
        }, 10000);
    }

    //获取位置信息
    getLocation(qrcode){
        //根据qrcode获取城市信息
        machine_service.obtain_current_city(qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                let city_id = this.props.location.city_id
                if (new String(response.data[0].cityId) != 'null') {
                    this.setState({city_id: response.data[0].cityId});
                    city_id = response.data[0].cityId;
                }
                locationservice.city_profile(city_id).then(response => {
                    if (response.responseCode === 'RESPONSE_OK') {
                        let location = this.props.location;
                        location.province = "";
                        location.city = response.data[0].cityName;
                        location.province_id = response.data[0].provinceId;
                        location.city_id = city_id;
                        this.props.changeLocation(location)
                    }
                    this.obtain_aqi(city_id)
                })
            }
            if (response.responseCode === 'RESPONSE_NULL') {
                locationservice.tell_location().then(response => {
                    if (response.responseCode == 'RESPONSE_OK') {
                        locationservice.acquire_city_id(response.data.code).then(res => {
                            console.log(response)
                            if (response.responseCode === 'RESPONSE_OK') {
                                let location = this.props.location;
                                location.province = response.data.province;
                                location.city = response.data.city;
                                location.province_id = '';
                                location.city_id = response.data;
                                this.props.changeLocation(location);
                                this.obtain_aqi(response.data)
                            } else {
                                this.obtain_aqi(this.props.location.city_id)
                            }

                        })
                    } else {
                        this.obtain_aqi(this.props.location.city_id)
                    }
                })
            }
        })
    }

    //获取城市气候详情
    obtain_aqi = (city_id) => {
        airquality_service.obtain_latest_aqi(city_id).then(response => {
            // console.log(response)
            if (response.responseCode === 'RESPONSE_OK') {
                let air = response.data[0];
                this.props.changeCityAir(air)
            }
        })
    }

    render() {
        // console.log(this.props.qrcode)
        return (
            <div className="user_select_disable">
                <FreshHeader/>
                <div className="separate_div"></div>
                <MachineData/>
                <div className="separate_div"></div>
                <OperationPanel/>
                <div className="separate_div"></div>
                <div className="operation_panel_2">
                    <PM2_5Charts qrcode={this.props.match.params.qrcode}/>
                </div>
            </div>
        );
    }

}

export default FreshPanel;
