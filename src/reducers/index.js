import {combineReducers} from 'redux';
// import login_reducer from './login_reducer';
// import register_reducer from './register_reducer';
// import machine_reducer from './register_reducer';
import operation_reducer from './operation_reducer';
import wind_reducer from './wind_reducer';
import fresh_reducer from './fresh_reducer'

export default combineReducers({
    // login_reducer:login_reducer,
    // register_reducer:register_reducer,
    // machine_reducer:machine_reducer,
    operation_reducer:operation_reducer,
    wind_reducer:wind_reducer,
    fresh_reducer:fresh_reducer,
})
