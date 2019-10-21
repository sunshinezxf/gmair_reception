import React, { Component } from 'react';
import {Slider, Icon} from 'antd';
import hot_img from '../../material/icon/hot.png'
import hot_active_img from '../../material/icon/hot-active.png'
import cold_img from '../../material/icon/cold.png'
import wind_img from '../../material/icon/wind.png'
import {wind_types, wind_types_imgs} from './wind_types'
import 'antd/dist/antd.css'
import './windController.css'

class WindController extends Component {
    

    constructor(props) {
        super(props);
    }
    
    render() { 
        let getTypeList = (wind_types=[],wind_types_imgs=[])=>{
            const length = wind_types.length;
            let typeList = [];
            for (let i=0;i<length;i++) {
                typeList.push(
                    <div className='wind-type-container'>
                        <div className='wind-type-icon-container'>
                            <img src={wind_types_imgs[i]} className='wind-type-icon'></img>
                        </div>
                        <div className='wind-type-text'>{wind_types[i]}</div>
                    </div>
                );
            }
            for(let i=0;i<3;i++){
                typeList.push(<div className='justify-fix'></div>);
            }
            return typeList;
        }
        return ( 
            <div className='wind-container'>
                <div className='wind-temperature-container'>
                    <div className={`wind-tag-container cold ${this.props.windTemperature==='cold'?'active':null}`} onClick={()=>{this.props.clickWind('cold')}}>
                        <img src={cold_img} className='wind-icon'></img>
                        <div>冷风</div>
                    </div>
                    <div className={`wind-tag-container hot ${this.props.windTemperature==='hot'?'active':null}`} onClick={()=>{this.props.clickWind('hot')}}>
                        <img src={hot_img} className='wind-icon'></img>
                        <img src={hot_active_img} className='wind-icon active'></img>
                        <div>热风</div>
                    </div>
                </div>
                <div className='wind-level-container'>
                    <div className='block-title'>风量控制</div>
                    <div className='wind-level-selector icon-wrapper'>
                        <Slider marks={{
                                        0: '1档',
                                        10: '2档',
                                        20: '3档',
                                        30: '4档',
                                        40: '5档',
                                        50: '6档',
                                        60: '7档',
                                        70: '8档',
                                        80: '9档',
                                    }} defaultValue={0} step={null} tooltipVisible={false} max={80}
                                        value={this.props.windLevel} onChange={this.props.windLevelChange}/>
                        <img src={wind_img} className='wind-icon'></img>
                    </div>
                </div>
                <div className='wind-types-container'>
                    <div className='block-title'>功能选择</div>
                    <div className='wind-types-selector'>
                        {getTypeList(wind_types,wind_types_imgs)}
                    </div>
                </div>
            </div>
         );
    }
}

export default WindController;