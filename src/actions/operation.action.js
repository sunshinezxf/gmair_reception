export const SWITCH_ON="SWITCH_ON";
export const SWITCH_OFF="SWITCH_OFF";
export const TIMING_EXPAND="TIMING_EXPAND";
export const START_HOUR_CHANGE="START_HOUR_CHANGE";
export const END_HOUR_CHANGE="END_HOUR_CHANGE";
export const START_MINUTE_CHANGE="START_MINUTE_CHANGE";
export const END_MINUTE_CHANGE="END_MINUTE_CHANGE";
export const MODAL_VISIBLE_CHANGE="MODAL_VISIBLE_CHANGE";
export const EDIT_USERNAME="EDIT_USERNAME";
export const INPUT_USERNAME="INPUT_USERNAME";
export const USERNAME_OK_CLICK="USERNAME_OK_CLICK";
export const START_TIME_CHANGE="START_TIME_CHANGE";
export const END_TIME_CHANGE="END_TIME_CHANGE";
export const QRCODE_STORE="QRCODE_STORE";
export const COMPONENT_IN="COMPONENT_IN";
export const CLICK_Wind = 'clickWind';
export const CONTROL_OPTION = 'CONTROL_OPTION';

export function switchOn() {
    return {
        type:SWITCH_ON,
    }
}
export function switchOff() {
    return {
        type:SWITCH_OFF,
    }
}
export function expandTiming(){
    return {
        type:TIMING_EXPAND,
    }
}
export function changeStartHour(start_hour){
    return {
        type:START_HOUR_CHANGE,
        start_hour:start_hour,
    }
}
export function changeStartMinute(start_minute){
    return {
        type:START_MINUTE_CHANGE,
        start_minute:start_minute,
    }
}
export function changeEndHour(end_hour){
    return {
        type:END_HOUR_CHANGE,
        end_hour:end_hour,
    }
}
export function changeEndMinute(end_minute){
    return {
        type:END_MINUTE_CHANGE,
        end_minute:end_minute,
    }
}
export function changeModalVisible() {
    return {
        type:MODAL_VISIBLE_CHANGE,
    }
}
export function editUsername() {
    return {
        type:EDIT_USERNAME,
    }
}
export function inputUsername(username){
    return {
        type:INPUT_USERNAME,
        username:username,
    }
}
export function usernameOkClick() {
    return {
        type:USERNAME_OK_CLICK,
    }
}
export function startTimeChange(start_time) {
    return {
        type:START_TIME_CHANGE,
        start_time:start_time,
    }
}
export function endTimeChange(end_time) {
    return {
        type:END_TIME_CHANGE,
        end_time:end_time,
    }
}
export function qrcodeStore(qrcode) {
    return {
        type:QRCODE_STORE,
        qrcode:qrcode,
    }
}
export function componentIn(start_hour,start_minute,end_hour,end_minute,start_time,end_time) {
    return {
        type:COMPONENT_IN,
        start_hour:start_hour,
        start_minute:start_minute,
        end_hour:end_hour,
        end_minute:end_minute,
        start_time:start_time,
        end_time:end_time,
    }
}

export const clickWindAction = (windTemperature)=>({
    type:CLICK_Wind,
    windTemperature
})

export function changeControlList(control_list) {
    return {
        type:CONTROL_OPTION,
        control_list:control_list,
    }
}
