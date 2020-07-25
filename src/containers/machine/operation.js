import connect from "react-redux/es/connect/connect";
import Operation from '../../component/machine/operation';
import {
    changeEndHour, changeEndMinute,
    changeStartHour,
    changeStartMinute, endTimeChange, expandTiming,
    inputUsername,
    qrcodeStore, startTimeChange, switchOn,componentIn,
} from "../../actions/operation.action";

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        username:state.operation_reducer.username,
        filterSwitch:state.operation_reducer.filterSwitch,
        qrcode:state.operation_reducer.qrcode,
        
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        inputUsername:(username)=>dispatch(inputUsername(username)),
        qrcodeStore:(qrcode)=>dispatch(qrcodeStore(qrcode)),
        changeStartHour:(start_hour)=>dispatch(changeStartHour(start_hour)),
        changeStartMinute:(start_minute)=>dispatch(changeStartMinute(start_minute)),
        changeEndHour:(end_hour)=>dispatch(changeEndHour(end_hour)),
        changeEndMinute:(end_minute)=>dispatch(changeEndMinute(end_minute)),
        startTimeChange:(start_time)=>dispatch(startTimeChange(start_time)),
        endTimeChange:(end_time)=>dispatch(endTimeChange(end_time)),
        expandTiming:()=>dispatch(expandTiming()),
        switchOn:()=>dispatch(switchOn()),
        componentIn:(start_hour,start_minute,end_hour,end_minute,start_time,end_time)=>
            dispatch(componentIn(start_hour,start_minute,end_hour,end_minute,start_time,end_time)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Operation);