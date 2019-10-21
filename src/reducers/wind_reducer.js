//wind_reducer
import {CLICK_Wind, WIND_LEVEL_CHANGE} from '../actions/wind.action';
const initialState={
    windTemperature:'cold',
    windLevel:40,
}
const wind_reducer = (state = initialState , action )=>{
    switch(action.type){
        case CLICK_Wind:{
            let newState = JSON.parse(JSON.stringify(state));
            newState.windTemperature = action.windTemperature;
            return newState;
        }
        case WIND_LEVEL_CHANGE:{
            let newState = JSON.parse(JSON.stringify(state));
            newState.windLevel = action.windLevel;
            console.log(newState.windLevel);
            return newState;
        }
        default:
            return state;
    }
}

export default wind_reducer;