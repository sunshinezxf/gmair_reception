import connect from "react-redux/es/connect/connect";
import {switchOff,switchOn,expandTiming,changeStartHour,changeEndHour,changeEndMinute,changeStartMinute,changeModalVisible,
editUsername,inputUsername,usernameOkClick,startTimeChange,endTimeChange,qrcodeStore} from "../../actions/operation.action";
import SettingSelect from '../../component/machine/settingSelect';

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        switch: state.operation_reducer.switch,
        expanded:state.operation_reducer.expanded,
        start_hour:state.operation_reducer.start_hour,
        start_minute:state.operation_reducer.start_minute,
        end_minute:state.operation_reducer.end_minute,
        end_hour:state.operation_reducer.end_hour,
        modal_visible:state.operation_reducer.modal_visible,
        username:state.operation_reducer.username,
        username_edit:state.operation_reducer.username_edit,
        start_time:state.operation_reducer.start_time,
        end_time:state.operation_reducer.end_time,
        qrcode:state.operation_reducer.qrcode,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        switchOn:()=>dispatch(switchOn()),
        switchOff:()=>dispatch(switchOff()),
        expandTiming:()=>dispatch(expandTiming()),
        changeStartHour:(start_hour)=>dispatch(changeStartHour(start_hour)),
        changeStartMinute:(start_minute)=>dispatch(changeStartMinute(start_minute)),
        changeEndHour:(end_hour)=>dispatch(changeEndHour(end_hour)),
        changeEndMinute:(end_minute)=>dispatch(changeEndMinute(end_minute)),
        changeModalVisible:()=>dispatch(changeModalVisible()),
        editUsername:()=>dispatch(editUsername()),
        inputUsername:(username)=>dispatch(inputUsername(username)),
        usernameOkClick:()=>dispatch(usernameOkClick()),
        startTimeChange:(start_time)=>dispatch(startTimeChange(start_time)),
        endTimeChange:(end_time)=>dispatch(endTimeChange(end_time)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingSelect);