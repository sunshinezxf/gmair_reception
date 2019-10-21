import connect from "react-redux/es/connect/connect";
import WindController from '../../component/fan/windController';
import {
    clickWindAction,windLevelChangeAction
} from "../../actions/wind.action";

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        windTemperature:state.wind_reducer.windTemperature,
        windLevel:state.wind_reducer.windLevel,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        clickWind:(windTemperature)=>dispatch(clickWindAction(windTemperature)),
        windLevelChange:(windLevel)=>dispatch(windLevelChangeAction(windLevel)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WindController);