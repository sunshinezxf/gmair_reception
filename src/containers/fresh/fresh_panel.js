import connect from "react-redux/es/connect/connect";
import FreshPanel from '../../component/fresh/fresh_panel';
import {
    changeQrcode, changeMachine, changeMachineStatus, changeHeatList, changeModeList,
    co2IsPresent, lockIsPresent, changeLocation, changeCityAir,
} from "../../actions/fresh.action";

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        qrcode: state.fresh_reducer.qrcode,
        machine: state.fresh_reducer.machine,
        machine_status: state.fresh_reducer.machine_status,
        heat_mode_list: state.fresh_reducer.heat_mode_list,
        work_mode_list: state.fresh_reducer.work_mode_list,
        location: state.fresh_reducer.location,

    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch) {
    return {
        changeQrcode: (qrcode) => dispatch(changeQrcode(qrcode)),
        changeMachine: (machine) => dispatch(changeMachine(machine)),
        changeMachineStatus: (machine_status) => dispatch(changeMachineStatus(machine_status)),
        changeHeatList: (heat_mode_list) => dispatch(changeHeatList(heat_mode_list)),
        changeModeList: (work_mode_list) => dispatch(changeModeList(work_mode_list)),
        co2IsPresent: (co2_is_present) => dispatch(co2IsPresent(co2_is_present)),
        lockIsPresent: (lock_is_present) => dispatch(lockIsPresent(lock_is_present)),
        changeLocation: (location) => dispatch(changeLocation(location)),
        changeCityAir: (city_air) => dispatch(changeCityAir(city_air)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshPanel);
