import React from 'react';
import {Slider} from 'antd';
import hot_img from '../../material/icon/hot.png'
import cold_img from '../../material/icon/cold.png'
import './windController.css'

const WindController = (props) =>{
    return (
        <div className='wind-container'>
            <div className='wind-temperature-container'>
                <div className={`wind-tag-container ${props.windTemperature==='cold'?'active':null}`} onClick={()=>{props.clickWind('cold')}}>
                    <img src={cold_img} className='wind-icon'></img>
                    <div>冷风</div>
                </div>
                <div className={`wind-tag-container ${props.windTemperature==='hot'?'active':null}`} onClick={()=>{props.clickWind('hot')}}>
                    <img src={hot_img} className='wind-icon'></img>
                    <div>热风</div>
                </div>
            </div>
            <div className='wind-level-container'>
                <div className='block-title'>风量控制</div>
                <div className='wind-level-selector'>
                    <Slider></Slider>
                </div>
            </div>
        </div>
    )
}

export default WindController;