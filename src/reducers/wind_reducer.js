//wind_reducer
import {
    CLICK_Wind, COLD_WIND_LEVEL_CHANGE, HOT_WIND_LEVEL_CHANGE, SELECT_WIND_TYPE, SETTING_TIME, SELECT_TIME,SELECT_TEMPERATURE,
    QRCODE_CHANGE,MACHINE_STATUS_CHANGE,WORK_MODE_LIST,HEAT_MODE_LIST
} from '../actions/wind.action';

const initialState={
    windTemperature:'cold',
    coldWindLevel:0,
    hotWindLevel:0,
    windType: '',
    isSettingTime:false,
    time:null,
    qrcode:'',
    machine_status: {power_status:false,volume:'',work_mode:'normal',sweep:false,heat:0,countdown:'',target_temperature:25,temperature:20,runtime:0},
    power_status:false,
    volume:'',
    work_mode:'normal',
    sweep:false,
    heat:0,
    countdown:'',
    target_temperature:'',
    temperature:'',
    work_mode_list: [],
    heat_mode_list: [],
    buzz:false,
    runtime:0,
}
const wind_reducer = (state = initialState , action )=>{
    switch(action.type){
        case CLICK_Wind:{
            let newState = JSON.parse(JSON.stringify(state));
            newState.windTemperature = action.windTemperature;
            return newState;
        }
        case COLD_WIND_LEVEL_CHANGE:{
            let newState = JSON.parse(JSON.stringify(state));
            newState.coldWindLevel = action.coldWindLevel;
            return newState;
        }
        case HOT_WIND_LEVEL_CHANGE:{
            let newState = JSON.parse(JSON.stringify(state));
            newState.hotWindLevel = action.hotWindLevel;
            return newState;
        }
        case SELECT_WIND_TYPE:{
            let newState = JSON.parse(JSON.stringify(state));
            newState.windType = action.windType;
            if(action.windType === '倒计时'){
                newState.isSettingTime = true;
            }else{
                newState.isSettingTime = false;
            }
            return newState;
        }
        case SETTING_TIME:{
            let newState = JSON.parse(JSON.stringify(state));
            newState.isSettingTime = action.isSettingTime;
            return newState;
        }
        case SELECT_TIME:{
            let newState = JSON.parse(JSON.stringify(state));
            newState.time = action.time;
            newState.time.setYear(2000);
            // console.log(newState.time);
            return newState;
        }
        case SELECT_TEMPERATURE:{
            let newState = JSON.parse(JSON.stringify(state));
            newState.temperature = action.temperature;
            console.log(newState.temperature);
            return newState;
        }
        case QRCODE_CHANGE:
            return Object.assign({},state,{
                qrcode: action.qrcode
            })
        case MACHINE_STATUS_CHANGE:
            return Object.assign({},state,{
                machine_status:action.machine_status,
                power_status:action.machine_status.power_status,
                volume:action.machine_status.volume,
                work_mode:action.machine_status.work_mode,
                sweep:action.machine_status.sweep,
                heat:action.machine_status.heat,
                countdown:action.machine_status.countdown,
                runtime:action.machine_status.runtime,
                target_temperature:action.machine_status.target_temperature,
                temperature:action.machine_status.temperature,
                buzz:action.machine_status.buzz,
            })
        case WORK_MODE_LIST:
            return Object.assign({},state,{
                work_mode_list:action.work_mode_list
            });
        case HEAT_MODE_LIST:
            return Object.assign({},state,{
                heat_mode_list: action.heat_mode_list
            })
        default:
            return state;
    }
}

export default wind_reducer;
