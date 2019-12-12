import React,{Component} from 'react';
import {Tag} from 'antd';
import RingData from './ring_data'
import data from "china-area-data";
import {List, Picker} from "antd-mobile";
import './fresh.css'
import {locationservice} from "../service/location.service";
import {airquality_service} from "../service/airquality.service";

class MachineData extends Component{
    constructor(props) {
        super(props);
        this.state = {
            area_list:[]
        };
        this.citySelect=this.citySelect.bind(this);
        this.areaChange=this.areaChange.bind(this);
    }

    componentDidMount(){
        this.adjust_area();
    }

    adjust_area(){
        let area_list = []
        locationservice.list_province().then(response => {
            if(response.responseCode==="RESPONSE_OK"){
                let province_list = response.data;
                let area_list = []
                for(let i=0;i<province_list.length;i++){
                    locationservice.list_city(province_list[i].provinceId).then(response => {
                        if (response.responseCode === 'RESPONSE_OK') {
                            let json = {}
                            json['label'] = province_list[i].provinceName;
                            json['value'] = province_list[i].provinceId;
                            let city_list = response.data;
                            for(let i=0;i<city_list.length;i++){
                                city_list[i]['label'] = city_list[i].cityName;
                                city_list[i]['value'] = city_list[i].cityId;
                            }
                            json['children'] = city_list
                            area_list.push(json)
                            this.setState({
                                area_list:area_list
                            })
                        }
                    })
                }

                // area_list.push(province_list);

            }else {
                this.setState({
                    area_list:[]
                })
            }
        })
    }

    areaChange(e){
        airquality_service.config_default_outdoor(this.props.qrcode, e[1]).then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                locationservice.city_profile(e[1]).then(response => {
                    let location = this.props.location;
                    location.city = response.data[0].cityName
                    location.city_id = e[1]
                    location.province_id = response.data[0].provinceId
                    location.province = ''
                    this.props.changeLocation(location)
                    this.setState({

                    })
                })
            }
        })
    }

    citySelect(){
        let div = document.getElementById("click_div");
        div.click();
    }

    render() {
        console.log(this.props)
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
                    <div style={aqi_item_1} onClick={this.citySelect}>空气&nbsp;&nbsp;<Tag color="#00A2E9">{this.props.location.city}</Tag></div>
                    <div style={aqi_item_2}><span style={item_text}>AQI</span>&nbsp;&nbsp;{this.props.city_air.aqi}</div>
                    <div style={aqi_item_3}><span style={item_text}>PM2.5</span>&nbsp;&nbsp;{this.props.city_air.pm2_5}</div>
                </div>
                <div style={{display:'none'}}>
                    <Picker
                        data={this.state.area_list}
                        title="城市选择"
                        cols={2}
                        // cascade={false}
                        onChange={this.areaChange}
                    >
                        <List.Item arrow="horizontal" id="click_div">省市区选择</List.Item>
                    </Picker>
                </div>
                <div className="operation_show">
                    <div className="operation_left">
                        <div style={{width:'180px',height:'160px'}}>
                            <RingData value={this.props.machine_status.pm2_5}/>
                        </div>
                    </div>
                    <div className="operation_right">
                        {this.props.co2_is_present&&
                        <div className="airquality_row">
                            <div className="airquality_name">CO<sub>2</sub></div>
                            <div className="airquality_value">471ppm</div>
                        </div>
                        }
                        <div className="airquality_row">
                            <div className="airquality_name"><i className='fa fa-thermometer fa-fw'></i></div>
                            <div className="airquality_value">{this.props.machine_status.temperature}°C</div>
                        </div>
                        <div className="airquality_row">
                            <div className="airquality_name"><i className='glyphicon glyphicon-tint fa-fw'></i></div>
                            <div className="airquality_value">{this.props.machine_status.humidity}%</div>
                        </div>
                        <div className="airquality_row">
                            <div className="airquality_name"><i className='fa fa-recycle fa-fw'></i></div>
                            <div className="airquality_value">{this.props.machine_status.volume}m<sup>3</sup>/h</div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}
export default MachineData;
