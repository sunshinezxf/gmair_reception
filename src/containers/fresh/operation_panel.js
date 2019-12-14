import connect from "react-redux/es/connect/connect";
import OperationPanel from '../../component/fresh/operation_panel';
import {
    changeMachineStatus
} from "../../actions/fresh.action";

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        qrcode:state.fresh_reducer.qrcode,
        online:state.fresh_reducer.online,
        machine_status:state.fresh_reducer.machine_status,
        volume:state.fresh_reducer.volume,
        work_mode:state.fresh_reducer.work_mode,
        light:state.fresh_reducer.light,
        machine:state.fresh_reducer.machine,
        heat_mode_list:state.fresh_reducer.heat_mode_list,
        heat:state.fresh_reducer.heat,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        changeMachineStatus:(machine_status)=>dispatch(changeMachineStatus(machine_status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OperationPanel);