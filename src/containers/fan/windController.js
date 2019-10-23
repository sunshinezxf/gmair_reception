import connect from "react-redux/es/connect/connect";
import WindController from '../../component/fan/windController';
import {
    clickWindAction,coldWindLevelChangeAction,hotWindLevelChangeAction,selectWindTypeAction,setTimeAction,selectTimeAction,
    setTemperatureAction
} from "../../actions/wind.action";

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        windTemperature:state.wind_reducer.windTemperature,
        coldWindLevel:state.wind_reducer.coldWindLevel,
        hotWindLevel:state.wind_reducer.hotWindLevel,
        windType:state.wind_reducer.windType,
        isSettingTime:state.wind_reducer.isSettingTime,
        time:state.wind_reducer.time,
        temperature:state.wind_reducer.temperature,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WindController);