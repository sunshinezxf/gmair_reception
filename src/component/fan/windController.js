import React, { Component } from 'react';
import {Slider, LocaleProvider} from 'antd';
import { DatePickerView, DatePicker, List } from 'antd-mobile';
import zhCN from 'antd-mobile/lib/locale-provider/locale-provider';
import hot_img from '../../material/icon/hot.png'
import hot_active_img from '../../material/icon/hot-active.png'
import cold_img from '../../material/icon/cold.png'
import wind_img from '../../material/icon/wind.png'
import {wind_types, wind_types_imgs} from './wind_types'
import {cold_wind_levels,hot_wind_levels} from './wind_levels'
import 'antd/dist/antd.css'
import './windController.css'

class WindController extends Component {

    constructor(props) {
        super(props);
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
                if(nowTime.getTime()===0){
                    return (
                        <img src={wind_types_img} className={`wind-type-icon`}></img>
                    );
                }
                return (
                    <div className='show-time-tag'>
                        {nowTime.getHours()>=10?nowTime.getHours():'0'+nowTime.getHours()}:
                        {nowTime.getMinutes()>=10?nowTime.getMinutes():'0'+nowTime.getMinutes()}
                    </div>
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
                                                        {/* <img src={wind_types_imgs[i]} className={`wind-type-icon`}></img> */}
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
                    <div className={`wind-tag-container cold ${this.props.windTemperature==='cold'?'active':null}`} 
                    onClick={()=>{this.props.clickWind('cold')}}>
                        <img src={cold_img} className='wind-icon'></img>
                        <div>冷风</div>
                    </div>
                    <div className={`wind-tag-container hot ${this.props.windTemperature==='hot'?'active':null}`} 
                    onClick={()=>{this.props.clickWind('hot')}}>
                        <img src={hot_img} className='wind-icon'></img>
                        <img src={hot_active_img} className='wind-icon active'></img>
                        <div>热风</div>
                    </div>
                </div>
                <div className='wind-level-container'>
                    <div className='block-title'>风量控制</div>
                    <div className='wind-level-selector icon-wrapper'>
                        <Slider className={`cold-wind-level-selector ${this.props.windTemperature==='cold'?'active':null}`} 
                            marks={cold_wind_levels} defaultValue={0} step={null} tooltipVisible={false} max={80}
                            value={this.props.coldWindLevel} onChange={this.props.coldWindLevelChange}/>
                        <Slider className={`hot-wind-level-selector ${this.props.windTemperature==='hot'?'active':null}`} 
                            marks={hot_wind_levels} defaultValue={0} step={null} tooltipVisible={false} max={30}
                            value={this.props.hotWindLevel} onChange={this.props.hotWindLevelChange}/>
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
                    <Slider className={`cold-wind-level-selector ${this.props.windTemperature==='cold'?'active':null}`} 
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
}

export default WindController;