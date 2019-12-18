import connect from "react-redux/es/connect/connect";
import MachineData from '../../component/fresh/machine_data';
import {
    changeLocation,changeCityAir,changeOutdoorData
} from "../../actions/fresh.action";

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        qrcode:state.fresh_reducer.qrcode,
        city_air:state.fresh_reducer.city_air,
        location:state.fresh_reducer.location,
        machine_status:state.fresh_reducer.machine_status,
        volume:state.fresh_reducer.volume,
        co2_is_present:state.fresh_reducer.co2_is_present,
        pm2_5:state.fresh_reducer.pm2_5,
        co2:state.fresh_reducer.co2,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        changeLocation:(location)=>dispatch(changeLocation(location)),
        changeCityAir:(air)=>dispatch(changeCityAir(air)),
        changeOutdoorData:(axis,outdoor)=>dispatch(changeOutdoorData(axis,outdoor)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MachineData);
