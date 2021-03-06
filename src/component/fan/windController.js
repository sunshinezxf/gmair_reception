import React, {Component, Fragment} from 'react';
import {Slider, LocaleProvider} from 'antd';
import {DatePickerView, DatePicker, Picker} from 'antd-mobile';
import zhCN from 'antd-mobile/lib/locale-provider/locale-provider';
import hot_img from '../../material/icon/hot.png'
import hot_active_img from '../../material/icon/hot-active.png'
import cold_img from '../../material/icon/cold.png'
import wind_img from '../../material/icon/wind.png'
import {control_wind_types, default_wind_types, wind_types_imgs} from './wind_types'
import {cold_wind_levels, hot_wind_levels, timing_levels} from './wind_levels'
import {machine_service} from '../service/mahcine.service'
import 'antd/dist/antd.css'
import './windController.css'
import {util} from "../service/util";

class WindController extends Component {

    constructor(props) {
        super(props);
        this.cold_wind = this.cold_wind.bind(this);
        this.local_cold_wind = this.local_cold_wind.bind(this);
        this.wind_cold_click = this.wind_cold_click.bind(this);
        this.hot_wind = this.hot_wind.bind(this);
        this.local_hot_wind = this.local_hot_wind.bind(this);
        this.wind_hot_click = this.wind_hot_click.bind(this);
        this.mode_operate = this.mode_operate.bind(this);
        this.local_temperature_change = this.local_temperature_change.bind(this);
        this.temperature_change = this.temperature_change.bind(this);
        this.timing_wind = this.timing_wind.bind(this);
        this.sweep_wind = this.sweep_wind.bind(this);
        this.buzz_wind = this.buzz_wind.bind(this);
        this.uv_wind = this.uv_wind.bind(this);
    }

    render() {
        console.log(this.props)
        let temp = this.props.target_temperature
        let temp_marks = {0: '0℃', 30: '30℃'}
        if (util.isRealNum(temp)) {
            temp_marks[temp] = temp + '℃'
        }
        let control_list=this.props.control_list;
        let wind_types = this.props.work_mode_list.concat(default_wind_types);
        let control_list_result=[];
        if(control_list.length>0){
            for (let i = 0;i<control_list.length;i++){
                for (let j=0;j<control_wind_types.length;j++){
                    if(control_list[i].optionComponent==control_wind_types[j].operator){
                        wind_types.push(control_wind_types[j])
                    }
                }
            }
        }

        const getTypeList = (wind_types = [], wind_types_imgs = {}) => {
            const length = wind_types.length;
            let typeList = [];
            const CustomChildren = ({extra, onClick, children}) => (
                <div
                    onClick={onClick}
                >
                    {children}
                </div>
            );
            const getTimeTag = (wind_types_img) => {
                if (!util.isRealNum(this.props.runtime) || this.props.runtime === 0 || this.props.runtime === "") {
                    return (
                        <img src={wind_types_img}
                             className='wind-type-icon'></img>
                    );
                }
                return (
                    <Fragment>
                        <img src={wind_types_img}
                             className='wind-type-icon invisible'></img>
                        <div className='show-time-tag'>
                            {util.minuteFormatToTime(this.props.runtime)}
                        </div>
                    </Fragment>

                );
            }
            for (let i = 0; i < length; i++) {
                let item = wind_types[i]
                if (item == null) {
                    continue;
                }
                let windTypeNode;
                if (this.props.heat === 0) {
                    windTypeNode = <div
                        className={`wind-type-container ${this.props.work_mode === item.operator ? 'active' : null}`}
                        onClick={() => {
                            this.mode_operate(item)
                        }}>
                        <div className='wind-type-icon-container'>
                            <img src={wind_types_imgs[wind_types[i].operator]} className={`wind-type-icon`}></img>
                        </div>
                        <div className='wind-type-text'>{wind_types[i].name}</div>
                    </div>
                }
                if (wind_types[i].operator == "shake") {
                    windTypeNode = <div
                        className={`wind-type-container ${this.props.sweep ? 'active' : null}`}
                        onClick={this.sweep_wind}>
                        <div className='wind-type-icon-container'>
                            <img src={wind_types_imgs[wind_types[i].operator]} className={`wind-type-icon`}></img>
                        </div>
                        <div className='wind-type-text'>{wind_types[i].name}</div>
                    </div>
                }
                if (wind_types[i].operator == "buzz") {
                    windTypeNode = <div
                        className={`wind-type-container ${this.props.buzz ? 'active' : null}`}
                        onClick={this.buzz_wind}>
                        <div className='wind-type-icon-container'>
                            <img src={wind_types_imgs[wind_types[i].operator]} className={`wind-type-icon`}></img>
                        </div>
                        <div className='wind-type-text'>{wind_types[i].name}</div>
                    </div>
                }
                if (wind_types[i].operator == 'timing') {
                    windTypeNode =
                        <div key={i}
                             className={`wind-type-container ${this.props.windType === wind_types[i] ? 'active' : null}`}>
                            <Picker data={timing_levels} cols={1} className="forss" disabled={!this.props.power_status}
                                    onChange={this.timing_wind}>
                                <CustomChildren>
                                    <div className='wind-type-icon-container'>
                                        {getTimeTag(wind_types_imgs[wind_types[i].operator])}
                                    </div>
                                    <div
                                        className='wind-type-text'>{!util.isRealNum(this.props.runtime) || this.props.runtime === 0 || this.props.runtime === "" ? wind_types[i].name : wind_types[i].click_name}</div>
                                </CustomChildren>
                            </Picker>

                        </div>
                }
                if (wind_types[i].operator == "uv") {
                    windTypeNode = <div
                        className={`wind-type-container ${this.props.uv ? 'active' : null}`}
                        onClick={this.uv_wind}>
                        <div className='wind-type-icon-container'>
                            <img src={wind_types_imgs[wind_types[i].operator]} className={`wind-type-icon`}></img>
                        </div>
                        <div className='wind-type-text'>{wind_types[i].name}</div>
                    </div>
                }
                typeList.push(windTypeNode);
            }
            for (let i = 0; i < 3; i++) {
                typeList.push(<div className='justify-fix'></div>);
            }
            return typeList;
        }
        // console.log(this.props)
        return (

            <div className='wind-container'>
                {this.props.model_id==="MOD20191210iu8h6y78"&&<div className='wind-temperature-container'>
                    <div className={`wind-tag-container cold ${this.props.heat === 0 ? 'active' : null}`}
                         onClick={() => {
                             this.wind_cold_click('cold')
                         }}>
                        <img src={cold_img} className='wind-icon'></img>
                        <div>冷风</div>
                    </div>
                    <div className={`wind-tag-container hot ${this.props.heat !== 0 ? 'active' : null}`}
                         onClick={() => {
                             this.wind_hot_click('hot')
                         }}>
                        <img src={hot_img} className='wind-icon'></img>
                        <img src={hot_active_img} className='wind-icon active'></img>
                        <div>热风</div>
                    </div>
                </div>}
                {this.props.model_id!=="MOD20191210iu8h6y78"&&<div className='wind-temperature-container'>
                    <div className={`wind-tag-container-full cold active`}>
                        <img src={wind_img} className='wind-icon'></img>
                        <div>冷风</div>
                    </div>
                </div>}
                <div className='wind-level-container'>
                    <div className='block-title'>风量控制</div>
                    <div className='wind-level-selector icon-wrapper'>
                        <Slider className={`cold-wind-level-selector ${this.props.heat === 0 ? 'active' : null}`}
                                marks={cold_wind_levels} defaultValue={1} step={null} tipFormatter={null} max={9}
                                min={1}
                                value={this.props.volume} onChange={this.local_cold_wind}
                                onAfterChange={this.cold_wind}/>
                        <Slider className={`hot-wind-level-selector ${this.props.heat !== 0 ? 'active' : null}`}
                                marks={hot_wind_levels} defaultValue={1} step={null} tipFormatter={null} max={4} min={1}
                                value={this.props.heat} onChange={this.local_hot_wind} onAfterChange={this.hot_wind}/>
                        <img src={wind_img} className='wind-icon'></img>
                    </div>
                </div>
                <div className='wind-types-container'>
                    <div className='block-title'>功能选择</div>
                    <div className='wind-types-selector'>
                        {getTypeList(wind_types, wind_types_imgs)}
                    </div>
                </div>
                {this.props.heat !== 0 &&
                <div className={`temperature-container ${this.props.isSettingTime ? 'active' : null}`}>
                    <div className='block-title block-title-2'>
                        <div className="block-title-left">温度设置</div>
                        <div className="block-title-right">当前室内温度：{this.props.temperature}℃</div>
                    </div>
                    <Slider className={`temperature-selector`}
                            defaultValue={0} tipFormatter={null} max={30} marks={temp_marks}
                            value={this.props.target_temperature} onChange={this.local_temperature_change}
                            onAfterChange={this.temperature_change}/>
                </div>
                }
                {/* <div className={`time-container ${this.props.isSettingTime?'active':null}`}>
                    <DatePicker
                        mode="time"
                        minuteStep={1}
                        value={this.props.time}
                        onChange={time => {console.log(this.props.time);this.props.selectTime(time)}}
                    >
                    <List.Item arrow="horizontal">Time (am/pm)</List.Item>
                    </DatePicker>
                </div> */}
            </div>
        );
    }

    //冷风量调节
    //最终改变前端风速volume，并且更新后端数据
    cold_wind = (e) => {
        if (this.props.power_status) {
            this.local_cold_wind(e)
            machine_service.volume(this.props.qrcode, e);
        }
    }

    //在拖动过程中改变前端风速volume，不给后端发送数据，减少多余请求
    local_cold_wind = (e) => {
        if (this.props.power_status) {
            let machine_status = this.props.machine_status;
            machine_status.volume = e;
            this.props.changeMachineStatus(machine_status);
        }
    }

    wind_cold_click = (w) => {
        if (this.props.power_status) {
            let machine_status = this.props.machine_status;
            machine_status.heat = 0;
            this.props.changeMachineStatus(machine_status);
            machine_service.volume(this.props.qrcode, this.props.volume)
            machine_service.operate(this.props.qrcode, 'heat', this.props.heat_mode_list[0].operator);
        }
    }

    hot_wind = (e) => {
        if (this.props.power_status) {
            this.local_hot_wind(e)
            console.log(this.props.heat_mode_list[e]);
            machine_service.operate(this.props.qrcode, 'heat', this.props.heat_mode_list[e].operator);
        }
    }

    local_hot_wind = (e) => {
        if (this.props.power_status) {
            let machine_status = this.props.machine_status;
            console.log(this.props.heat_mode_list[e]);
            machine_status.heat = e;
            this.props.changeMachineStatus(machine_status);
        }
    }

    wind_hot_click = (w) => {
        if (this.props.power_status) {
            let machine_status = this.props.machine_status;
            console.log(this.props);
            machine_status.heat = 1;
            this.props.changeMachineStatus(machine_status);
            machine_service.operate(this.props.qrcode, 'heat', this.props.heat_mode_list[1].operator);
        }

    }

    //模式选择
    mode_operate = (e) => {
        console.log(e)
        if (this.props.power_status) {
            let machine_status = this.props.machine_status;
            machine_status.work_mode = e.operator;
            this.props.changeMachineStatus(machine_status);
            machine_service.operate(this.props.qrcode, 'mode', e.operator);
        }
    }

    local_temperature_change = (e) => {
        if (this.props.power_status) {
            let machine_status = this.props.machine_status;
            machine_status.target_temperature = e;
            this.props.changeMachineStatus(machine_status);
        }
    }

    //温度变化，发送请求
    temperature_change = (e) => {
        if (this.props.power_status) {
            this.local_temperature_change(e);
            machine_service.temp(this.props.qrcode, e);
        }
    }

    //将时间(分钟)传入，发送请求
    timing_wind = (e) => {
        // console.log(e)
        if (this.props.power_status) {
            let machine_status = this.props.machine_status;
            machine_status.runtime = e[0];
            machine_status.countdown = e[0];
            this.props.changeMachineStatus(machine_status);
            machine_service.timing(this.props.qrcode, e[0])
        }
    }

    //开启、关闭扫风
    sweep_wind = () => {
        if (this.props.power_status) {
            let machine_status = this.props.machine_status;
            if (machine_status.sweep) {
                machine_service.operate(this.props.qrcode, 'sweep', 'off');
                machine_status.sweep = false
            } else {
                machine_service.operate(this.props.qrcode, 'sweep', 'on');
                machine_status.sweep = true
            }
            this.props.changeMachineStatus(machine_status);
        }
    }

    //开启、关闭蜂鸣器
    buzz_wind = () => {
        if (this.props.power_status) {
            let machine_status = this.props.machine_status;
            if (machine_status.buzz) {
                machine_service.operate(this.props.qrcode, 'buzz', 'off');
                machine_status.buzz = false
            } else {
                machine_service.operate(this.props.qrcode, 'buzz', 'on');
                machine_status.buzz = true
            }
            this.props.changeMachineStatus(machine_status);
        }
    }

    //开启、关闭紫外线
    uv_wind = () => {
        if (this.props.power_status) {
            let machine_status = this.props.machine_status;
            if (machine_status.uv) {
                machine_service.operate(this.props.qrcode, 'uv', 'off');
                machine_status.uv = false
            } else {
                machine_service.operate(this.props.qrcode, 'uv', 'on');
                machine_status.uv = true
            }
            this.props.changeMachineStatus(machine_status);
        }
    }
}

export default WindController;
