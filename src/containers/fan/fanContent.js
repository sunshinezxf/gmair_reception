import connect from "react-redux/es/connect/connect";
import fanContent from '../../component/fan/fanContent';
import {
    changeMachineStatus,
    changeModeList,
    changeQrcode,
    changeHeatList
} from "../../actions/wind.action";
import {changeControlList} from "../../actions/operation.action";



//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        qrcode:state.wind_reducer.qrcode,
        machine_status:state.wind_reducer.machine_status,
        work_mode_list:state.wind_reducer.work_mode_list,
        heat_mode_list:state.wind_reducer.heat_mode_list,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        changeQrcode:(qrcode)=>dispatch(changeQrcode(qrcode)),
        changeMachineStatus:(machine_status)=>dispatch(changeMachineStatus(machine_status)),
        changeModeList:(work_mode_list)=>dispatch(changeModeList(work_mode_list)),
        changeHeatList:(heat_mode_list)=>dispatch(changeHeatList(heat_mode_list)),
        changeControlList: (control_list) => dispatch(changeControlList(control_list)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(fanContent);
