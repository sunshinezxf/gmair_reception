import React,{Component} from 'react';
import OnOffHeader from '../../containers/fan/onOffHeaderController'
import WindController from '../../containers/fan/windController'
import {machine_service} from '../service/mahcine.service'
import {util} from "../service/util";
import {wechatservice} from "../service/wechat.service";
import './windController.css'

class FanContent extends Component{
    constructor(props){
        super(props);
        this.check_qrcode = this.check_qrcode.bind(this);
        this.state = {
            model_id: '',
            model_bg: ''
        }
        let qrcode = this.props.match.params.qrcode;
        this.props.changeQrcode(qrcode);
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

    componentWillMount(){
        let qrcode = this.props.match.params.qrcode;
        this.check_qrcode(qrcode);
    }

    check_qrcode = (qrcode) => {
        machine_service.check_exist(qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                response = response.data[0];
                let model_id = response.modelId;
                machine_service.obtain_model(model_id).then(response => {
                    response = response.data[0]
                    let modelBg = response.modelBg;
                    this.setState({model_bg: modelBg});
                })
                this.setState({model_id: model_id})
                this.check_control_option(model_id)
            } else {
                // window.location.href = '/machine/list'
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

    obtain_machine_status = (qrcode) => {
        machine_service.obtain_machine_new_status(qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                let information = response.data;
                information['power_status'] = information.power===1
                information['sweep'] = information.sweep===1
                information['buzz'] = information.buzz===1
                information['work_mode'] = util.tell_mode(information.mode, this.props.work_mode_list)
                this.props.changeMachineStatus(information);
            }
        });
    }

    componentDidMount() {
        util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
            this.init_config();
        })
        let qrcode = this.props.match.params.qrcode;
        this.props.changeQrcode(qrcode)
        setInterval(() => {
            this.obtain_machine_status(qrcode);
        }, 10000);
    }

    render(){
        return (
            <div className="user_select_disable" style={{width:'100%',overflowX:'hidden'}}>
                <OnOffHeader model_id={this.state.model_id} model_bg={this.state.model_bg}></OnOffHeader>
                <WindController model_id={this.state.model_id}></WindController>
            </div>
        )
    }
}

export default FanContent;
