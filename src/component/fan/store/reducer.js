import { CLICK_Wind } from './actionTypes'

const defaultState = {
    windTemperature:'cold'
}
export default (state = defaultState,action)=>{
    if(action.type === CLICK_Wind){
        let newState = JSON.parse(JSON.stringify(state)); //深度拷贝state
        newState.windTemperature = action.value;
        return newState;
    }
    return state
}