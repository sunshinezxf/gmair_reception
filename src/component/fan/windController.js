import React, { Component } from 'react';
import {Slider} from 'antd';
import hot_img from '../../material/icon/hot.png'
import cold_img from '../../material/icon/cold.png'
import './windController.css'

class WindController extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        console.log(this.props);
        return ( 
            <div className='wind-container'>
                <div className='wind-temperature-container'>
                    <div className={`wind-tag-container ${this.props.windTemperature==='cold'?'active':null}`} onClick={()=>{this.props.clickWind('cold')}}>
                        <img src={cold_img} className='wind-icon'></img>
                        <div>冷风</div>
                    </div>
                    <div className={`wind-tag-container ${this.props.windTemperature==='hot'?'active':null}`} onClick={()=>{this.props.clickWind('hot')}}>
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
         );
    }
}
 
export default WindController;