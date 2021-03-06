import React, {Component} from "react";
import FreshHeader from "../../containers/fresh/header";
import OperationPanel from "../../containers/fresh/operation_panel";
import MachineData from "../../containers/fresh/machine_data";
import PM2_5Charts from "../../containers/fresh/chart";
import CleanPanel from "../../containers/fresh/clean_panel";
import {util} from "../service/util";
import {wechatservice} from "../service/wechat.service";
import {machine_service} from "../service/mahcine.service";
import "./fresh.css";
import {locationservice} from "../service/location.service";
import {airquality_service} from "../service/airquality.service";
import {Collapse} from 'react-collapse';



class FreshPanel extends Component {
    constructor(props) {
        super(props);
        this.obtain_machine_status = this.obtain_machine_status.bind(this);
        this.edit_operation = this.edit_operation.bind(this);
        this.confirm_bind_name = this.confirm_bind_name.bind(this);
        this.check_qrcode = this.check_qrcode.bind(this);
        this.check_control_option = this.check_control_option.bind(this);
        let qrcode = this.props.match.params.qrcode;
        this.props.changeQrcode(qrcode);
        this.state={
            expanded:false,
        }


    }

    edit_operation = () => {
        this.setState({edit_machine_name: !this.state.edit_machine_name});
    };

    confirm_bind_name = () => {
        machine_service
            .config_bind_name(this.props.qrcode, this.state.bind_name)
            .then((response) => {
                console.log(JSON.stringify(response));
            });
        this.edit_operation();
    };


    init_config = () => {
        let url = window.location.href;
        if (util.is_weixin()) {
            wechatservice.configuration(url).then((response) => {
                if (response.responseCode === "RESPONSE_OK") {
                    let result = response.data;
                    window.wx.config({
                        beta: true,
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: result.appId, // 必填，公众号的唯一标识
                        timestamp: result.timestamp, // 必填，生成签名的时间戳
                        nonceStr: result.nonceStr, // 必填，生成签名的随机串
                        signature: result.signature, // 必填，签名
                        jsApiList: ["hideAllNonBaseMenuItem", "closeWindow"], // 必填，需要使用的JS接口列表
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

    obtain_machine_status = (qrcode) => {
        machine_service.obtain_machine_status(qrcode).then((response) => {
            //machine online
            if (response.responseCode === "RESPONSE_OK") {
                let information = response.data;
                information["power_status"] = information.power === 1;
                information["work_mode"] = util.tell_mode(
                    information.mode,
                    this.props.work_mode_list
                );
                this.props.changeMachineStatus(information);
            }
        });
    };

    check_qrcode = (qrcode) => {
        machine_service.check_exist(qrcode).then((response) => {
            if (response.responseCode === "RESPONSE_OK") {
                let info = response.data[0];
                this.props.changeMachine(info);
                this.check_control_option(info.modelId);
                machine_service
                    .probe_component(info.modelId, "CO2")
                    .then((response) => {
                        if (response.responseCode === "RESPONSE_OK") {
                            this.props.co2IsPresent(true);
                        } else {
                            this.props.co2IsPresent(false);
                        }
                    });
                machine_service
                    .probe_component(info.modelId, "LOCK")
                    .then((response) => {
                        console.log("lock" + JSON.stringify(response))
                        if (response.responseCode === "RESPONSE_OK") {
                            this.props.lockIsPresent(true);
                        } else {
                            this.props.lockIsPresent(false);
                        }
                    });
            } else {
                window.location.href = "/machine/list";
            }
        });
    };

    check_control_option = (model_id) => {
        machine_service.obtain_control_option(model_id).then((response) => {
            if (response.responseCode === "RESPONSE_OK") {
                let control_list = response.data;
             //   console.log("control list: " + JSON.stringify(control_list))
                for (let i = 0; i < control_list.length; i++) {
                    let item = control_list[i];
                    if (item.optionComponent === "heat") {
                        let action_list = item.actions;
                        let heat_list = [];
                        for (let index in action_list) {
                            let action_item = action_list[index];
                            heat_list[action_item.commandValue] = {
                                name: action_item.actionName,
                                operator: action_item.actionOperator,
                            };
                        }
                        this.props.changeHeatList(heat_list);
                    }
                    if (item.optionComponent === "mode") {
                        let action_list = item.actions;
                        let mode_list = [];
                        for (let index in action_list) {
                            let action_item = action_list[index];
                            mode_list[action_item.commandValue] = {
                                name: action_item.actionName,
                                operator: action_item.actionOperator,
                            };
                        }
                        this.props.changeModeList(mode_list);
                    }
                }
                this.obtain_machine_status(this.props.qrcode);
            }
        });
    };

    componentWillMount(){
        let qrcode = this.props.match.params.qrcode;
        this.check_qrcode(qrcode);
        this.obtain_filter_state(qrcode)
    }

    componentDidMount() {
        // util.load_script("https://reception.gmair.net/plugin/vconsole.min.js", () => {
        //     var vConsole = new window.VConsole();
        // })
        util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
            this.init_config();
        });
        let qrcode = this.props.match.params.qrcode;
        this.props.changeQrcode(qrcode);
        this.getLocation(qrcode);
        this.obtain_machine_status(qrcode);
        setInterval(() => {
            this.obtain_machine_status(qrcode);
        }, 10000);
    }


    //获取位置信息
    getLocation(qrcode) {
        //根据qrcode获取城市信息
        machine_service.obtain_current_city(qrcode).then((response) => {
            if (response.responseCode === "RESPONSE_OK") {
                let city_id = this.props.location.city_id;
                if (new String(response.data[0].cityId) != "null") {
                    city_id = response.data[0].cityId;
                }
                locationservice.city_profile(city_id).then((response) => {
                    if (response.responseCode === "RESPONSE_OK") {
                        let location = this.props.location;
                        location.province = "";
                        location.city = response.data[0].cityName;
                        location.province_id = response.data[0].provinceId;
                        location.city_id = city_id;
                        this.props.changeLocation(location);
                    } else {
                        locationservice.district_profile(city_id).then((response) => {
                            console.log(response);
                            if (response.responseCode === "RESPONSE_OK") {
                                let location = this.props.location;
                                location.province_id = "";
                                location.province = "";
                                location.city = response.data[0].districtName;
                                location.city_id = city_id;
                                this.props.changeLocation(location);
                            }
                        });
                    }
                    this.obtain_aqi(city_id);
                });
            }
            if (response.responseCode === "RESPONSE_NULL") {
                locationservice.tell_location().then((response) => {
                    if (response.responseCode == "RESPONSE_OK") {
                        locationservice.acquire_city_id(response.data.code).then((res) => {
                            console.log(response);
                            if (response.responseCode === "RESPONSE_OK") {
                                let location = this.props.location;
                                location.province = response.data.province;
                                location.city = response.data.city;
                                location.province_id = "";
                                location.city_id = response.data;
                                this.props.changeLocation(location);
                                this.obtain_aqi(response.data);
                            } else {
                                this.obtain_aqi(this.props.location.city_id);
                            }
                        });
                    } else {
                        this.obtain_aqi(this.props.location.city_id);
                    }
                });
            }
        });
    }

    //获取城市气候详情
    obtain_aqi = (city_id) => {
        airquality_service.obtain_latest_aqi(city_id).then((response) => {
            // console.log(response)
            if (response.responseCode === "RESPONSE_OK") {
                let air = response.data[0];
                this.props.changeCityAir(air);
            }
        });
    };

    //下滑显示
    expand = () => {
        let current = this.state.expanded;
        this.setState({expanded: !current});
    }

    //获取滤网是否到清洗时间
    obtain_filter_state = (qrcode) =>{
        let filterState=false,mainFilterState=""
       machine_service.obtain_filter_isClean(qrcode).then((response)=>{
           if (response.responseCode === "RESPONSE_OK"){
               filterState = response.data.isNeedClean
           }
           if(filterState){
               this.setState({
                   expanded:true
               })
           }else{
               machine_service.obtain_mainFilter_status(qrcode).then((response)=>{
                   mainFilterState = response.data.replaceStatus
                   if(mainFilterState!="" && mainFilterState!="NO_NEED"){
                       this.setState({
                           expanded:true
                       })
                   }
               })
           }

       })


    }

    render() {

        const expand_style={
            paddingLeft:"49%",
            backgroundColor:"#f2f2f2"
        }
        return (
            <div className="user_select_disable">
                <FreshHeader/>
                <div className="separate_div"></div>
                <MachineData/>
                <div className="separate_div"></div>
                <OperationPanel/>
                <Collapse isOpened={this.state.expanded}>
                   <CleanPanel/>
                 </Collapse>
                <div onClick={this.expand} style={expand_style}><i
                    className={this.state.expanded === false ? 'fa fa-angle-double-down' : 'fa fa-angle-double-up'}></i>
                </div>

                <div className="separate_div"></div>
                <div className="operation_panel_2">
                    <PM2_5Charts qrcode={this.props.match.params.qrcode}/>
                </div>
            </div>
        );
    }
}

export default FreshPanel;
