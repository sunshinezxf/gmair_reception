import {QRCODE_CHANGE} from '../actions/fresh.action';
const initialState={
    qrcode:'',
    online:false,
}
const fresh_reducer = (state = initialState , action )=>{
    switch(action.type){
        case QRCODE_CHANGE:
            return Object.assign({},state,{
                qrcode: action.qrcode
            })
        default:
            return state
    }
}

export default fresh_reducer;
