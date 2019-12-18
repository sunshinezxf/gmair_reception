import connect from "react-redux/es/connect/connect";
import Chart from '../../component/fresh/pm2_5charts';
import {
    changeOutdoorData
} from "../../actions/fresh.action";

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        axis:state.fresh_reducer.axis,
        outdoor:state.fresh_reducer.outdoor,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        changeOutdoorData:(axis,outdoor)=>dispatch(changeOutdoorData(axis,outdoor)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
