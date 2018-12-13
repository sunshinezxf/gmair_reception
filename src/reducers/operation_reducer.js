//operation_reducer
import {SWITCH_ON,SWITCH_OFF,TIMING_EXPAND,START_MINUTE_CHANGE,START_HOUR_CHANGE,END_MINUTE_CHANGE,
    END_HOUR_CHANGE,MODAL_VISIBLE_CHANGE,EDIT_USERNAME,INPUT_USERNAME,USERNAME_OK_CLICK} from '../actions/operation.action';
const initialState={
    switch:false,
    expanded:false,
    start_hour:"00",
    end_hour:"00",
    start_minute:"00",
    end_minute:"00",
    modal_visible:false,
    username_edit:false,
    username:"未设置",
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
        default:
            return state;
    }
}

export default operation_reducer;