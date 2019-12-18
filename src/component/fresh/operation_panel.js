import React,{Component} from 'react';
import ControlItem from './control_item';
import './fresh.css'
import {machine_service} from "../service/mahcine.service";
import {Button, Modal, Slider} from "antd-mobile";

class OperationPanel extends Component{
    constructor(props) {
        super(props);
        this.power_click = this.power_click.bind(this);
        this.speed_panel = this.speed_panel.bind(this);
        this.mode_panel = this.mode_panel.bind(this);
        this.light_panel = this.light_panel.bind(this);
        this.heat_panel = this.heat_panel.bind(this);
        this.local_volume = this.local_volume.bind(this);
        this.mode_operate = this.mode_operate.bind(this);
        this.volume = this.volume.bind(this);
        this.lock_operate = this.lock_operate.bind(this);
        this.state={
            min_volume:'',
            max_volume: '',
            min_light:'',
            max_light: '',
            step: '',
            show_volume:false,
            show_mode:false,
            show_light:false,
            show_heat:false,
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
            // console.log(response)
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

    //电源点击
    power_click(){
        let machine_status = this.props.machine_status;
        // console.log(machine_status)
        if(machine_status.power_status){
            machine_service.operate(this.props.qrcode, 'power', 'off');
            machine_status.power_status = false
        }else {
            machine_service.operate(this.props.qrcode, 'power', 'on');
            machine_status.power_status = true
        }
        this.props.changeMachineStatus(machine_status);
    }
    //风量点击
    speed_panel = () => {
        if(this.props.online){
            this.setState({show_volume: !this.state.show_volume})
        }
    }
    //风量调节
    volume = (e) =>{
        this.local_volume(e)
        machine_service.volume(this.props.qrcode, e);

    }

    local_volume = (e) =>{
        let machine_status = this.props.machine_status;
        machine_status.volume = e;
        this.props.changeMachineStatus(machine_status);
    }

    //模式点击
    mode_panel = () => {
        if(this.props.online){
            this.setState({show_mode: !this.state.show_mode})
        }
    }
    //模式选择
    mode_operate = (mode_name) => {
        let machine_status = this.props.machine_status;
        machine_status.work_mode = mode_name;
        this.props.changeMachineStatus(machine_status);
        machine_service.operate(this.props.qrcode, 'mode', mode_name);
    }

    //屏显点击
    light_panel = () => {
        if(this.props.online){
            this.setState({show_light: !this.state.show_light})
        }
    }

    local_light = (e) => {
        let machine_status = this.props.machine_status;
        machine_status.light = e;
        this.props.changeMachineStatus(machine_status);
    }

    light = (light) => {
        machine_service.light(this.props.qrcode, light);
    }

    //辅热点击
    heat_panel = () => {
        if(this.props.online){
            this.setState({show_heat: !this.state.show_heat})
        }
    }

    //童锁调节
    lock_operate = () => {
        if(this.props.online){
            let machine_status = this.props.machine_status;
            if (this.props.lock === 0) {
                machine_status.lock=1;
                machine_service.operate(this.props.qrcode, 'lock', 'on');
            } else {
                machine_status.lock=0;
                machine_service.operate(this.props.qrcode, 'lock', 'off');
            }
            this.props.changeMachineStatus(machine_status);
        }
    }

    render() {
        const area_desc = {
            marginTop: `1rem`
        }

        const config_panel_area = {
            height: `4.5rem`,
            margin: `3rem 15% 0rem 15%`
        }

        const min_volume = {
            // marginLeft: `7.5%`,
            textAlign: `left`,
            width: `30%`,
            float: `left`
        }

        const current_volume = {
            width: `40%`,
            float: `left`,
        }

        const max_volume = {
            // marginRight: `7.5%`,
            textAlign: `right`,
            width: `30%`,
            float: `left`
        }

        const volume_area = {
            margin: `0 0 2rem 5rem`,
            height: `2rem`,
        }

        const mode_operation_area = {
            width: `85%`,
            margin: `1rem 7.5%`,
            textAlign: `center`
        }
        // console.log(this.props)
        let heat_mode_list = this.props.heat_mode_list;
        let operation_list = heat_mode_list?heat_mode_list.map((item, index) => {
            return (<Button type={this.props.heat == index ? 'primary' : 'ghost'} inline size="small"
                            className='am-button-borderfix'
                            style={{margin: '0 1.5rem'}} onClick={() => {
                {
                    if (this.props.heat !== index) {
                        let machine_status = this.props.machine_status;
                        machine_status.heat = index;
                        this.props.changeMachineStatus(machine_status);
                        machine_service.operate(this.props.qrcode, 'heat', item.operator);
                    }
                }
            }}>{item.name}</Button>)
        }):[]

        let mode_name = 'fa fa-hand-paper-o';
        if (this.props.work_mode === 'sleep') {
            mode_name = 'fa fa-moon-o';
        }
        if (this.props.work_mode === 'auto') {
            mode_name = 'fa fa-refresh';
        }

        let heat_class = []
        if (heat_mode_list.length == 3) {
            heat_class = ['fa fa-thermometer-0', 'fa fa-thermometer-2', 'fa fa-thermometer-4'];
        } else {
            heat_class = ['fa fa-thermometer-0', 'fa fa-thermometer-4'];
        }

        return (
            <div className="operation_panel_1">
                <div className="operation_panel_row">
                    <div className="operation_panel_item" onClick={this.power_click}>
                        <ControlItem src="fa fa-power-off" text="电源" open={this.props.online}/>
                    </div>
                    <div className="operation_panel_item" onClick={this.speed_panel}>
                        <ControlItem src="fa fa-recycle" text="风量" open={this.props.online&&this.props.volume!==0}/>
                        <Modal popup visible={this.state.show_volume} animationType="slide-up">
                            <div className="modal_panel">
                                <div className="slider_panel">
                                    <div className="slider_text">风量调节</div>
                                    <div className="slider_div">
                                        <Slider className="slider" defaultValue={this.props.volume}
                                                value={this.props.volume}
                                                min={this.state.min_volume} max={this.state.max_volume}
                                                onChange={this.local_volume}
                                                onAfterChange={this.volume}
                                        />
                                    </div>
                                </div>
                                <div className="slider_panel_2">
                                    <div className="slider_text"></div>
                                    <div className="slider_div_2">
                                        <div style={min_volume}>{this.state.min_volume}</div>
                                        <div style={current_volume}>{this.props.volume}</div>
                                        <div style={max_volume}>{this.state.max_volume}</div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    <div className="operation_panel_item" onClick={this.mode_panel}>
                        <ControlItem src={mode_name} text="模式" open={this.props.online}/>
                        <Modal popup visible={this.state.show_mode} animationType="slide-up">
                            <div style={area_desc}>模式调节</div>
                            <div style={mode_operation_area}>
                                <Button type={this.props.work_mode == 'manual' ? 'primary' : 'ghost'} inline size="small"
                                        className='am-button-borderfix'
                                        style={{margin: '0 1.5rem'}} onClick={() => {
                                    {
                                        if (this.props.work_mode !== 'manual') {
                                            this.mode_operate('manual')
                                        }
                                    }
                                }}>手动</Button>
                                <Button type={this.props.work_mode === 'sleep' ? 'primary' : 'ghost'} inline size="small"
                                        className='am-button-borderfix'
                                        style={{margin: '0 1.5rem'}} onClick={() => {
                                    {
                                        if (this.props.work_mode !== 'sleep') {
                                            this.mode_operate('sleep')
                                        }
                                    }
                                }}>睡眠</Button>
                                <Button type={this.props.work_mode === 'auto' ? 'primary' : 'ghost'} inline size="small"
                                        className='am-button-borderfix'
                                        style={{margin: '0 1.5rem'}} onClick={() => {
                                    this.mode_operate('auto')
                                }}>自动</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div className="separate_div_2"></div>
                <div className="operation_panel_row">
                    <div className="operation_panel_item" onClick={this.light_panel}>
                        <ControlItem src="fa fa-desktop" text="屏显" open={this.props.online&&this.props.light!==0}/>
                        <Modal popup visible={this.state.show_light} animationType="slide-up">
                            <div className="modal_panel">
                                <div className="slider_panel">
                                    <div className="slider_text">亮度调节</div>
                                    <div className="slider_div">
                                        <Slider className="slider" defaultValue={this.props.light}
                                                value={this.props.light}
                                                min={this.state.min_light} max={this.state.max_light}
                                                step={this.state.step}
                                                onChange={(e) => {
                                                    this.local_light(e);
                                                }}
                                                onAfterChange={(e) => {
                                                    this.light(e);
                                                }}
                                        />
                                    </div>
                                </div>
                                <div className="slider_panel_2">
                                    <div className="slider_text"></div>
                                    <div className="slider_div_2">
                                        <div style={min_volume}>暗</div>
                                        <div style={current_volume}>{this.props.light}</div>
                                        <div style={max_volume}>亮</div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                    <div className="operation_panel_item" onClick={this.heat_panel}>
                        <ControlItem src={heat_class[this.props.heat]} text="辅热" open={this.props.heat!=0}/>
                        <Modal popup visible={this.state.show_heat} animationType="slide-up">
                            <div style={area_desc}>辅热调节</div>
                            <div style={mode_operation_area}>
                                {operation_list}
                            </div>
                        </Modal>
                    </div>
                    {this.props.lock_is_present&&
                    <div className="operation_panel_item" onClick={this.lock_operate}>
                        <ControlItem src="fa fa-child" text="童锁" open={this.props.lock===1}/>
                    </div>
                    }
                    {!this.props.lock_is_present&&
                    <div className="operation_panel_item" >
                    </div>
                    }
                </div>
            </div>
        );
    }

}

export default OperationPanel;
