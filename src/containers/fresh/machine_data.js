import connect from "react-redux/es/connect/connect";
import MachineData from '../../component/fresh/machine_data';
import {

} from "../../actions/fresh.action";

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        // qrcode:state.fresh_reducer.qrcode,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        // changeQrcode:(qrcode)=>dispatch(changeQrcode(qrcode)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MachineData);
