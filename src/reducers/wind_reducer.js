//wind_reducer
import {CLICK_Wind} from '../actions/wind.action';
const initialState={
    windTemperature:'cold'
}
const wind_reducer = (state = initialState , action )=>{
    switch(action.type){
        case CLICK_Wind:{
            let newState = JSON.parse(JSON.stringify(state)); //深度拷贝state
            newState.windTemperature = action.windTemperature;
            return newState;
        }
        default:
            return state;
    }
}

export default wind_reducer;