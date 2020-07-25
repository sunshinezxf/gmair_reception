import connect from "react-redux/es/connect/connect";
import CleanPanel from '../../component/fresh/clean_panel';
import {getFilterIsClean,changeFilterStatus,changeMainFilterStatus} from '../../actions/fresh.action'

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        qrcode:state.fresh_reducer.qrcode,
        filterIsClean:state.fresh_reducer.filterIsClean,
        filterInfo:state.fresh_reducer.filterInfo,
        mainFilterInfo:state.fresh_reducer.mainFilterInfo,
        filterImgUrl:state.fresh_reducer.filterImgUrl,
        mainFilterImgUrl:state.fresh_reducer.mainFilterImgUrl,
        buyFilter:state.fresh_reducer.buyFilter,

        
    }
}

//映射Redux actions到组件的属性
function mapDispatchToProps(dispatch){
    return{
        getFilterIsClean:(filterIsClean)=>dispatch(getFilterIsClean(filterIsClean)),
        changeFilterStatus:(filterImgUrl,filterInfo,filterIsClean)=>dispatch(changeFilterStatus(filterImgUrl,filterInfo,filterIsClean)),
        changeMainFilterStatus:(mainFilterImgUrl,mainfilterInfo,filterIsClean,buyFilter)=>dispatch(changeMainFilterStatus(mainFilterImgUrl,mainfilterInfo,filterIsClean,buyFilter)),
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CleanPanel);
