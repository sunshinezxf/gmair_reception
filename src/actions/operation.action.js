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