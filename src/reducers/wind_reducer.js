//wind_reducer
import {
    CLICK_Wind, COLD_WIND_LEVEL_CHANGE, HOT_WIND_LEVEL_CHANGE, SELECT_WIND_TYPE, SETTING_TIME, SELECT_TIME,SELECT_TEMPERATURE
} from '../actions/wind.action';

const initialState={
    windTemperature:'cold',
    coldWindLevel:0,
    hotWindLevel:0,
    windType: '',
    isSettingTime:false,
    time:null,
    temperature:18,
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
            // console.log(newState.time);
            return newState;
        }
        case SELECT_TEMPERATURE:{
            let newState = JSON.parse(JSON.stringify(state));
            newState.temperature = action.temperature;
            // console.log(newState.temperature);
            return newState;
        }
        default:
            return state;
    }
}

export default wind_reducer;