import React,{Component} from 'react'
import {Tag} from "antd";
import {Picker} from "antd-mobile";
import {locationservice} from "../service/location.service";

class CityPicker extends Component{
    constructor(props) {
        super(props);
        this.state={
            area_list:[]
        }
        this.areaChange=this.areaChange.bind(this);

    }

    componentDidMount(){
        locationservice.get_city_list().then(response=>{
            if(response.responseCode==="RESPONSE_OK"){
                this.setState({
                    area_list:response.data
                })
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.city !== this.props.city
    }

    areaChange(e){
        this.props.areaChange(e)
    }

    render() {

        const aqi_item_1={
            flex:1
        }
        return (
            <Picker
                data={this.state.area_list}
                title="城市选择"
                cols={3}
                // cascade={false}
                onChange={this.areaChange}
            >
                <div >空气&nbsp;&nbsp;<Tag color="#00A2E9">{this.props.city}</Tag></div>
            </Picker>
        );
    }

}

export default CityPicker
