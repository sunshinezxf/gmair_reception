import connect from "react-redux/es/connect/connect";
import FreshHeader from '../../component/fresh/header';

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        online:state.fresh_reducer.online,
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreshHeader);
