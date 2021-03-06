import connect from "react-redux/es/connect/connect";
import onOffHeader from '../../component/fan/onOffHeader';
import {
    changeMachineStatus
} from "../../actions/wind.action";

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        qrcode:state.wind_reducer.qrcode,
        machine_status:state.wind_reducer.machine_status,
        power_status:state.wind_reducer.power_status,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        changeMachineStatus:(machine_status)=>dispatch(changeMachineStatus(machine_status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(onOffHeader);
