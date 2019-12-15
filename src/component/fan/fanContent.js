import React,{Component} from 'react';
import OnOffHeader from './onOffHeader'
import WindController from '../../containers/fan/windController'
import {machine_service} from '../service/mahcine.service'
import {util} from "../service/util";

class FanContent extends Component{
    constructor(props){
        super(props);
        this.check_qrcode = this.check_qrcode.bind(this);
        this.state = {
            bind_name: '',
            qrcode: '',
            model_id: '',
            online: false,
            countdown: 0,
            heat: 0,
            mode: 0,
            power: 0,
            work_mode: 'manual',
            work_mode_list: [],
            heat_mode: 0,
            heat_mode_list: [],
            runtime: 0,
            sweep: 0,
            target_temperature: 0,
            temperature:0,
            uid:'',
            volume:1,
            edit_machine_name: false,
            co2_is_present: false,
            lock_is_present: false
        }
    }

    componentDidMount(){
        console.log(this.props.match.params.qrcode);
        localStorage.setItem("access_token",'eb3fc19c-9964-42ad-84b7-d9dac2101868');
        
        const qrcode = this.props.match.params.qrcode;

        machine_service.obtain_machine_new_status(this.props.match.params.qrcode).then(function(data){
            console.log(data);
        })

        this.check_qrcode(this.props.match.params.qrcode);
        machine_service.obtain_bind_info(qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.setState({bind_name: response.data[0].bindName})
            }
        })
        this.setState({qrcode: qrcode});
        setInterval(() => {
            this.obtain_machine_status(qrcode);
        }, 10000);
    }

    render(){
        return (
            <div>
                <OnOffHeader power={this.state.power}></OnOffHeader>
                <WindController></WindController>
            </div>
        )
    }

    check_qrcode = (qrcode) => {
        machine_service.check_exist(qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                let info = response.data[0];
                this.setState({model_id: info.modelId})
                this.check_control_option(info.modelId)
                machine_service.probe_component(info.modelId, 'CO2').then(response => {
                    if (response.responseCode === 'RESPONSE_OK') {
                        this.setState({co2_is_present: true})
                    } else {
                        this.setState({co2_is_present: false})
                    }
                })
                machine_service.probe_component(info.modelId, 'LOCK').then(response => {
                    if (response.responseCode === 'RESPONSE_OK') {
                        this.setState({lock_is_present: true})
                    } else {
                        this.setState({lock_is_present: false})
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
                        this.setState({heat_mode_list: heat_list});
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
                        this.setState({work_mode_list: mode_list})
                    }
                }
                this.obtain_machine_status(this.state.qrcode);
            }
        })
    }
    
    obtain_machine_status = (qrcode) => {
        machine_service.obtain_machine_new_status(qrcode).then(response => {
            //machine online
            console.log(response)
            if (response.responseCode === 'RESPONSE_OK') {
                let information = response.data;
                let countdown = information.countdown;
                let heat = information.heat;
                let mode = information.mode;
                let power = information.power;
                let runtime = information.runtime;
                let sweep = information.sweep;
                let target_temperature = information.target_temperature;
                let temperature = information.temperature;
                let uid = information.uid;
                let volume = information.volume;
                this.setState({
                    online: false,
                    countdown,
                    heat: heat,
                    mode: mode,
                    power: power,
                    runtime: runtime,
                    sweep: sweep,
                    target_temperature: target_temperature,
                    temperature,
                    uid,
                    volume
                });
            }
            //machine offline
            if (response.responseCode === 'RESPONSE_NULL') {
                this.setState({online: false});
            }
            if (response.responseCode === 'RESPONSE_ERROR') {
                this.setState({online: false});
            }
        });
    }
}

export default FanContent;
