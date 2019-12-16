import connect from "react-redux/es/connect/connect";
import WindController from '../../component/fan/windController';
import {
    clickWindAction,
    coldWindLevelChangeAction,
    hotWindLevelChangeAction,
    selectWindTypeAction,
    setTimeAction,
    selectTimeAction,
    setTemperatureAction,
    changeMachineStatus
} from "../../actions/wind.action";

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        qrcode:state.wind_reducer.qrcode,
        power_status:state.wind_reducer.power_status,
        volume:state.wind_reducer.volume,
        work_mode:state.wind_reducer.work_mode,
        sweep:state.wind_reducer.sweep,
        heat:state.wind_reducer.heat,
        countdown:state.wind_reducer.countdown,
        target_temperature:state.wind_reducer.target_temperature,
        temperature:state.wind_reducer.temperature,
        work_mode_list:state.wind_reducer.work_mode_list,
        machine_status:state.wind_reducer.machine_status,
        heat_mode_list:state.wind_reducer.heat_mode_list
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        clickWind:(windTemperature)=>dispatch(clickWindAction(windTemperature)),
        coldWindLevelChange:(coldWindLevel)=>dispatch(coldWindLevelChangeAction(coldWindLevel)),
        hotWindLevelChange:(hotWindLevel)=>dispatch(hotWindLevelChangeAction(hotWindLevel)),
        selectWindType:(windType)=>dispatch(selectWindTypeAction(windType)),
        setTime:()=>dispatch(setTimeAction()),
        selectTime:(time)=>dispatch(selectTimeAction(time)),
        setTemperature:(temperature)=>dispatch(setTemperatureAction(temperature)),
        changeMachineStatus:(machine_status)=>dispatch(changeMachineStatus(machine_status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WindController);
