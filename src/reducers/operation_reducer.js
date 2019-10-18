//operation_reducer
import {SWITCH_ON,SWITCH_OFF,TIMING_EXPAND,START_MINUTE_CHANGE,START_HOUR_CHANGE,END_MINUTE_CHANGE,
    END_HOUR_CHANGE,MODAL_VISIBLE_CHANGE,EDIT_USERNAME,INPUT_USERNAME,USERNAME_OK_CLICK,START_TIME_CHANGE,
    END_TIME_CHANGE,QRCODE_STORE,COMPONENT_IN,CLICK_Wind} from '../actions/operation.action';
const initialState={
    switch:false,
    expanded:false,
    start_hour:"21",
    end_hour:"9",
    start_minute:"0",
    end_minute:"0",
    modal_visible:false,
    username_edit:false,
    username:"未设置",
    start_time: '',
    end_time: '',
    qrcode:'',
    windTemperature:'cold'
}
const operation_reducer = (state = initialState , action )=>{
    switch(action.type){
        case SWITCH_ON:{
            return Object.assign({},state,{
                switch: true,
            })
        }
        case SWITCH_OFF:{
            return Object.assign({},state,{
                switch: false,
            })
        }
        case TIMING_EXPAND:{
            return Object.assign({},state,{
                expanded: !state.expanded,
            })
        }
        case START_HOUR_CHANGE:{
            return Object.assign({},state,{
                start_hour: action.start_hour,
            })
        }
        case START_MINUTE_CHANGE:{
            return Object.assign({},state,{
                start_minute: action.start_minute,
            })
        }
        case END_HOUR_CHANGE:{
            return Object.assign({},state,{
                end_hour: action.end_hour,
            })
        }
        case END_MINUTE_CHANGE:{
            return Object.assign({},state,{
                end_minute: action.end_minute,
            })
        }
        case MODAL_VISIBLE_CHANGE:{
            return Object.assign({},state,{
                modal_visible: !state.modal_visible,
            })
        }
        case EDIT_USERNAME:{
            return Object.assign({},state,{
                username_edit:true,
            })
        }
        case INPUT_USERNAME:{
            return Object.assign({},state,{
                username: action.username,
            })
        }
        case USERNAME_OK_CLICK:{
            return Object.assign({},state,{
                username_edit:false,
            })
        }
        case START_TIME_CHANGE:{
            return Object.assign({},state,{
                start_time: action.start_time,
            })
        }
        case END_TIME_CHANGE:{
            return Object.assign({},state,{
                end_time: action.end_time,
            })
        }
        case QRCODE_STORE:{
            return Object.assign({},state,{
                qrcode:action.qrcode,
            })
        }
        case COMPONENT_IN:{
            return Object.assign({},state,{
                start_hour:action.start_hour,
                start_minute:action.start_minute,
                end_hour:action.end_hour,
                end_minute:action.end_minute,
                start_time:action.start_time,
                end_time:action.end_time,
            })
        }
        case CLICK_Wind:{
            let newState = JSON.parse(JSON.stringify(state)); //深度拷贝state
            newState.windTemperature = action.windTemperature;
            return newState;
        }
        default:
            return state;
    }
}

export default operation_reducer;