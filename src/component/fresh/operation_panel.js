import React,{Component} from 'react';
import ControlItem from './control_item';
import './fresh.css'
import {machine_service} from "../service/mahcine.service";

class OperationPanel extends Component{
    constructor(props) {
        super(props);
        this.power_click = this.power_click.bind(this);
        this.state={
            min_volume:'',
            max_volume: '',
            min_light:'',
            max_light: '',
            step: '',
        }
    }

    componentDidMount(){
        this.check_qrcode(this.props.qrcode)
    }

    check_qrcode = (qrcode) => {
        machine_service.check_exist(qrcode).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                let modelId = response.data[0].modelId;
                this.init_control_option(modelId)
            }
        })
    }

    //获取基本风量区间和屏显范围
    init_control_option = (modelId) => {
        machine_service.obtain_volume_range(modelId).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.setState({min_volume: response.data[0].minVolume, max_volume: response.data[0].maxVolume})
            }
        })
        machine_service.obtain_light_range(modelId).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                this.setState({
                    min_light: response.data[0].minLight,
                    max_light: response.data[0].maxLight,
                    step: response.data[0].step
                })
            }
        })
    }

    power_click(){
        let machine_status = this.props.machine_status;
        console.log(machine_status)
        if(machine_status.power_status){
            machine_service.operate(this.props.qrcode, 'power', 'off');
            machine_status.power_status = false
        }else {
            machine_service.operate(this.props.qrcode, 'power', 'on');
            machine_status.power_status = true
        }
        this.props.changeMachineStatus(machine_status);
        this.setState({

        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="operation_panel">
                <div className="operation_panel_row">
                    <div className="operation_panel_item" onClick={this.power_click}>
                        <ControlItem src="fa fa-power-off" text="电源" open={this.props.machine_status.power_status}/>
                    </div>
                    <div className="operation_panel_item">
                        <ControlItem src="fa fa-recycle" text="风量"/>
                    </div>
                    <div className="operation_panel_item">
                        <ControlItem src="fa fa-tags" text="模式"/>
                    </div>
                </div>
                <div className="separate_div_2"></div>
                <div className="operation_panel_row">
                    <div className="operation_panel_item">
                        <ControlItem src="fa fa-desktop" text="屏显"/>
                    </div>
                    <div className="operation_panel_item">
                        <ControlItem src="fa fa-thermometer-empty" text="辅热"/>
                    </div>
                    <div className="operation_panel_item">
                        <ControlItem src="fa fa-child" text="童锁"/>
                    </div>
                </div>
            </div>
        );
    }

}

export default OperationPanel;
