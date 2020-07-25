import {
    QRCODE_CHANGE,
    MACHINE_CHANGE,
    MACHINE_STATUS_CHANGE,
    WORK_MODE_LIST,
    HEAT_MODE_LIST,
    CO2_IS_PRESENT,
    LOCK_IS_PRESENT,
    LOCATION_CHANGE,
    CITY_AIR_CHANGE,
    OUTDOOR_DATA_CHANGE,
    FILTER_IS_CLEAN,
    FILTER_STATUS,
    MAIN_FILTER_STATUS,
    HIDE_VOLUME_IF_OPEN,
} from "../actions/fresh.action";

const initialState = {
    qrcode: "",
    online: "",
    machine: "",
    machine_status: "",
    heat_mode_list: "",
    work_mode_list: "",
    co2_is_present: false,
    lock_is_present: false,
    location: {
        province_id: "110000",
        province: "北京",
        city_id: "110101",
        city: "东城",
    },
    city_air: "",
    volume: "",
    work_mode: "",
    light: "",
    heat: 0,
    lock: "",
    pm2_5: 0,
    co2: "",
    outdoor: [],
    axis: [],
    filterIsClean: false,
    filterInfo: "",
    mainFilterInfo: "",
    filterImgUrl: require("../material/filter_icon/1.png"),
    mainFilterImgUrl: require("../material/filter_icon/2.png"),
    buyFilter: false,
    hideVolumeIfOpen:false,

};
const fresh_reducer = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case QRCODE_CHANGE:
            return Object.assign({}, state, {
                qrcode: action.qrcode,
            });
        case MACHINE_CHANGE:
            return Object.assign({}, state, {
                machine: action.machine,
            });
        case MACHINE_STATUS_CHANGE:
            return Object.assign({}, state, {
                machine_status: action.machine_status,
                online: action.machine_status.power_status,
                volume: action.machine_status.volume,
                work_mode: action.machine_status.work_mode,
                light: action.machine_status.light,
                heat: action.machine_status.heat,
                lock: action.machine_status.lock,
                pm2_5: action.machine_status.pm2_5,
                co2: action.machine_status.co2,
            });
        case HEAT_MODE_LIST:
            return Object.assign({}, state, {
                heat_mode_list: action.heat_mode_list,
            });
        case WORK_MODE_LIST:
            return Object.assign({}, state, {
                work_mode_list: action.work_mode_list,
            });
        case CO2_IS_PRESENT:
            return Object.assign({}, state, {
                co2_is_present: action.co2_is_present,
            });
        case LOCK_IS_PRESENT:
            return Object.assign({}, state, {
                lock_is_present: action.lock_is_present,
            });
        case LOCATION_CHANGE:
            return Object.assign({}, state, {
                location: action.location,
            });
        case CITY_AIR_CHANGE:
            return Object.assign({}, state, {
                city_air: action.city_air,
            });
        case OUTDOOR_DATA_CHANGE:
            return Object.assign({}, state, {
                outdoor: action.outdoor,
                axis: action.axis,
            });
        case FILTER_IS_CLEAN:
            return Object.assign({}, state, {
                filterIsClean: action.filterIsClean,
            });
        case FILTER_STATUS:
            return Object.assign({}, state, {
                filterImgUrl: action.filterImgUrl,
                filterInfo: action.filterInfo,
                filterIsClean: action.filterIsClean,
            });

        case MAIN_FILTER_STATUS:
            return Object.assign({}, state, {
                mainFilterImgUrl: action.mainFilterImgUrl,
                mainFilterInfo: action.mainfilterInfo,
                filterIsClean: action.filterIsClean,
                buyFilter: action.buyFilter,
            });

        case HIDE_VOLUME_IF_OPEN:
            return Object.assign({},state,{
                hideVolumeIfOpen: action.hideVolumeIfOpen
            });

        default:
            return state;
    }
};

export default fresh_reducer;
