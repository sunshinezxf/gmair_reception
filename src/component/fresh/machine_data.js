import React,{Component} from 'react';
import {Tag} from 'antd';
import RingData from './ring_data'

class MachineData extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        const tag_div_style={
            display:'flex',
            alignItems:'center',
            margin:'0px 5px'
        }
        const aqi_item_1={
            flex:1
        }
        const aqi_item_2={
            flex:1,
            display:'flex',
            justifyContent:'center'
        }
        const aqi_item_3={
            flex:1,
            display:'flex',
            justifyContent:'flex-end'
        }
        const item_text={
            color:'#00A2E9'
        }
        return (
            <div className="operation_panel">
                <div style={tag_div_style}>
                    <div style={aqi_item_1}>空气&nbsp;&nbsp;<Tag color="#00A2E9">南京</Tag></div>
                    <div style={aqi_item_2}><span style={item_text}>AQI</span>&nbsp;&nbsp;60</div>
                    <div style={aqi_item_3}><span style={item_text}>PM2.5</span>&nbsp;&nbsp;54</div>
                </div>
                <div className="operation_show">
                    <div className="operation_left">
                        <div style={{width:'180px',height:'160px'}}>
                            <RingData value={100}/>
                        </div>
                    </div>
                    <div className="operation_right">
                        <div className="airquality_row">
                            <div className="airquality_name">CO<sub>2</sub></div>
                            <div className="airquality_value">471ppm</div>
                        </div>
                        <div className="airquality_row">
                            <div className="airquality_name"><i className='fa fa-thermometer fa-fw'></i></div>
                            <div className="airquality_value">21°C</div>
                        </div>
                        <div className="airquality_row">
                            <div className="airquality_name"><i className='glyphicon glyphicon-tint fa-fw'></i></div>
                            <div className="airquality_value">33%</div>
                        </div>
                        <div className="airquality_row">
                            <div className="airquality_name"><i className='fa fa-recycle fa-fw'></i></div>
                            <div className="airquality_value">160m<sup>3</sup>/h</div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}
export default MachineData;
