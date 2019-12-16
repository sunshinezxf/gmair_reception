import React, { Component, Fragment } from 'react';
import {Slider, LocaleProvider} from 'antd';
import { DatePickerView, DatePicker, List } from 'antd-mobile';
import zhCN from 'antd-mobile/lib/locale-provider/locale-provider';
import hot_img from '../../material/icon/hot.png'
import hot_active_img from '../../material/icon/hot-active.png'
import cold_img from '../../material/icon/cold.png'
import wind_img from '../../material/icon/wind.png'
import {wind_types, wind_types_imgs} from './wind_types'
import {cold_wind_levels,hot_wind_levels} from './wind_levels'
import {machine_service} from '../service/mahcine.service'
import 'antd/dist/antd.css'
import './windController.css'

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
    }
    
    render() { 
        const getTypeList = (wind_types=[],wind_types_imgs=[])=>{
            const length = wind_types.length;
            let typeList = [];
            const CustomChildren = ({ extra, onClick, children }) => (
                <div
                  onClick={onClick}
                >
                  {children}
                </div>
              );
            const getTimeTag = (wind_types_img)=>{
                let nowTime = new Date(this.props.time);
                if(!nowTime.getTime()||(!nowTime.getHours()&&!nowTime.getMinutes())){
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
                            {nowTime.getHours()>=10?nowTime.getHours():'0'+nowTime.getHours()}:
                            {nowTime.getMinutes()>=10?nowTime.getMinutes():'0'+nowTime.getMinutes()}
                        </div>
                    </Fragment>
                    
                );
            }
            for (let i=0;i<length;i++) {
                let windTypeNode = <div className={`wind-type-container ${this.props.windType===wind_types[i]?'active':null}`} 
                                    onClick={()=>this.props.selectWindType(wind_types[i])}>
                                        <div className='wind-type-icon-container'>
                                            <img src={wind_types_imgs[i]} className={`wind-type-icon`}></img>
                                        </div>
                                        <div className='wind-type-text'>{wind_types[i]}</div>
                                    </div>
                if(wind_types[i]==='倒计时'){
                    windTypeNode = <div key={i} className={`wind-type-container ${this.props.windType===wind_types[i]?'active':null}`} 
                                    onClick={()=>this.props.selectWindType(wind_types[i])}>
                                        <LocaleProvider locale={zhCN}>
                                            <DatePicker
                                                mode="time"
                                                format="HH:mm"
                                                minuteStep={1}
                                                value={new Date(this.props.time)}
                                                onChange={time => {console.log(this.props.time);this.props.selectTime(time)}}
                                            >
                                                <CustomChildren>
                                                    <div className='wind-type-icon-container'>
                                                        {getTimeTag(wind_types_imgs[i])}
                                                    </div>
                                                    <div className='wind-type-text'>{wind_types[i]}</div>
                                                </CustomChildren>
                                            </DatePicker>
                                        </LocaleProvider>
                                    </div>
                }
                typeList.push(windTypeNode);
            }
            for(let i=0;i<3;i++){
                typeList.push(<div className='justify-fix'></div>);
            }
            return typeList;
        }

        return ( 
            <div className='wind-container'>
                <div className='wind-temperature-container'>
                    <div className={`wind-tag-container cold ${this.props.heat===0?'active':null}`} 
                    onClick={()=>{this.wind_cold_click('cold')}}>
                        <img src={cold_img} className='wind-icon'></img>
                        <div>冷风</div>
                    </div>
                    <div className={`wind-tag-container hot ${this.props.heat===1?'active':null}`} 
                    onClick={()=>{this.wind_hot_click('hot')}}>
                        <img src={hot_img} className='wind-icon'></img>
                        <img src={hot_active_img} className='wind-icon active'></img>
                        <div>热风</div>
                    </div>
                </div>
                <div className='wind-level-container'>
                    <div className='block-title'>风量控制</div>
                    <div className='wind-level-selector icon-wrapper'>
                        <Slider className={`cold-wind-level-selector ${this.props.heat===0?'active':null}`} 
                            marks={cold_wind_levels} defaultValue={0} step={null} tooltipVisible={false} max={8}
                            value={this.props.volume} onChange={this.local_cold_wind} onAfterChange={this.cold_wind}/>
                        <Slider className={`hot-wind-level-selector ${this.props.heat===1?'active':null}`} 
                            marks={hot_wind_levels} defaultValue={1} step={null} tooltipVisible={false} max={4} min={1}
                            value={this.props.heat} onChange={this.local_hot_wind} onAfterChange={this.hot_wind}/>
                        <img src={wind_img} className='wind-icon'></img>
                    </div>
                </div>
                <div className='wind-types-container'>
                    <div className='block-title'>功能选择</div>
                    <div className='wind-types-selector'>
                        {getTypeList(wind_types,wind_types_imgs)}
                    </div>
                </div>
                <div className={`temperature-container ${this.props.isSettingTime?'active':null}`}>
                    <div className='block-title'>温度设置</div>
                    <Slider className={`temperature-selector`} 
                            defaultValue={0} tipFormatter={(value)=>`${value}℃`} max={30} marks={{0:'0℃',30:'30℃'}}
                            value={this.props.temperature} onChange={this.props.setTemperature}/>
                </div>
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
    cold_wind = (e) =>{
        console.log(e)
        this.local_cold_wind(e)
        machine_service.volume(this.props.qrcode, e+1);
    }

    //在拖动过程中改变前端风速volume，不给后端发送数据，减少多余请求
    local_cold_wind = (e) =>{
        let machine_status = this.props.machine_status;
        machine_status.volume = e;
        this.props.changeMachineStatus(machine_status);
    }

    wind_cold_click = (w) =>{
        let machine_status = this.props.machine_status;
        machine_status.heat = 0;
        this.props.changeMachineStatus(machine_status);
        machine_service.volume(this.props.qrcode,this.props.volume)
        machine_service.operate(this.props.qrcode, 'heat', this.props.heat_mode_list[0]);
    }

    hot_wind = (e) =>{
        this.local_hot_wind(e)
        console.log(this.props.heat_mode_list[e]);
        machine_service.operate(this.props.qrcode, 'heat', this.props.heat_mode_list[e]);
    }

    local_hot_wind = (e) =>{
        let machine_status = this.props.machine_status;
        console.log(this.props.heat_mode_list[e]);
        machine_status.heat = e;
        this.props.changeMachineStatus(machine_status);
    }

    wind_hot_click = (w) =>{
        let machine_status = this.props.machine_status;
        console.log(this.props);
        machine_status.heat = 1;
        this.props.changeMachineStatus(machine_status);
        machine_service.operate(this.props.qrcode, 'heat', this.props.heat_mode_list[1]);
    }

    //模式选择
    mode_operate = (mode_name) => {
        let machine_status = this.props.machine_status;
        machine_status.work_mode = mode_name;
        this.props.changeMachineStatus(machine_status);
        machine_service.operate(this.props.qrcode, 'mode', mode_name);
    }

    local_light = (e) => {
        let machine_status = this.props.machine_status;
        machine_status.light = e;
        this.props.changeMachineStatus(machine_status);
    }

    light = (light) => {
        machine_service.light(this.props.qrcode, light);
    }
}

export default WindController;