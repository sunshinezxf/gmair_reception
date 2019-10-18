import connect from "react-redux/es/connect/connect";
import WindController from '../../component/fan/windController';
import {
    clickWindAction
} from "../../actions/wind.action";

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        windTemperature:state.wind_reducer.windTemperature,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        clickWind:(windTemperature)=>dispatch(clickWindAction(windTemperature)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WindController);