import connect from "react-redux/es/connect/connect";
import FreshHeader from '../../component/fresh/header';
import {changeMachineStatus} from '../../actions/fresh.action'

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        qrcode:state.fresh_reducer.qrcode,
        online:state.fresh_reducer.online,
        machine_status:state.fresh_reducer.machine_status,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        changeMachineStatus:(machine_status)=>dispatch(changeMachineStatus(machine_status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshHeader);
