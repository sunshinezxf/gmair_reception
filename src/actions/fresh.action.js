export const QRCODE_CHANGE = "QRCODE_CHANGE";
export const MACHINE_CHANGE ="MACHINE_CHANGE";
export const MACHINE_STATUS_CHANGE = "MACHINE_STATUS_CHANGE";
export const HEAT_MODE_LIST = "HEAT_MODE_LIST";
export const WORK_MODE_LIST = "WORK_MODE_LIST";
export const CO2_IS_PRESENT = "CO2_IS_PRESENT";
export const LOCK_IS_PRESENT = "LOCK_IS_PRESENT";
export const LOCATION_CHANGE = "LOCATION_CHANGE";
export const CITY_AIR_CHANGE = "CITY_AIR_CHANGE";
export const OUTDOOR_DATA_CHANGE = "OUTDOOR_DATA_CHANGE";
export const FILTER_IS_CLEAN = "FILTER_IS_CLEAN";
export const FILTER_STATUS = "FILTER_STATUS";
export const MAIN_FILTER_STATUS = "MAIN_FILTER_STATUS";
export const HIDE_VOLUME_IF_OPEN = "HIDE_VOLUME_IF_OPEN";

export function changeQrcode(qrcode) {
    return {
        type:QRCODE_CHANGE,
        qrcode:qrcode
    }
}
export function changeMachine(machine) {
    return {
        type:MACHINE_CHANGE,
        machine:machine
    }
}

export function changeMachineStatus(machine_status) {
    return {
        type:MACHINE_STATUS_CHANGE,
        machine_status:machine_status,
    }
}

export function changeHeatList(heat_mode_list) {
    return {
        type:HEAT_MODE_LIST,
        heat_mode_list:heat_mode_list,
    }
}

export function changeModeList(work_mode_list) {
    return {
        type:WORK_MODE_LIST,
        work_mode_list:work_mode_list
    }
}

export function co2IsPresent(co2_is_present) {
    return {
        type:CO2_IS_PRESENT,
        co2_is_present:co2_is_present,
    }
}

export function lockIsPresent(lock_is_present) {
    return {
        type:LOCK_IS_PRESENT,
        lock_is_present:lock_is_present,
    }
}

export function changeLocation(location) {
    return {
        type:LOCATION_CHANGE,
        location:location
    }
}

export function changeCityAir(city_air) {
    return {
        type:CITY_AIR_CHANGE,
        city_air:city_air
    }
}

export function changeOutdoorData(axis,outdoor) {
    return {
        type:OUTDOOR_DATA_CHANGE,
        axis:axis,
        outdoor:outdoor,
    }
}
//获取隐藏风量是否开启
export  function getHideVolumeIfOpen(hideVolumeIfOpen) {
    return{
        type:HIDE_VOLUME_IF_OPEN,
        hideVolumeIfOpen:hideVolumeIfOpen
    }
}

//获取滤网是否需要清洗
export function getFilterIsClean(filterIsClean){
    return{
        type:FILTER_IS_CLEAN,
        filterIsClean:filterIsClean
    }
}

//改变滤网清洗状态
export function changeFilterStatus(filterImgUrl,filterInfo,filterIsClean){
    return{
        type:FILTER_STATUS,
        filterImgUrl:filterImgUrl,
        filterInfo:filterInfo,
        filterIsClean:filterIsClean,
    }
}

//改变主滤网状态
export function changeMainFilterStatus(mainFilterImgUrl,mainFilterInfo,status,buyFilter){
    return{
        type:MAIN_FILTER_STATUS,
        mainFilterImgUrl:mainFilterImgUrl,
        mainFilterInfo:mainFilterInfo,
        mainFilterStatus:status,
        buyFilter:buyFilter,
    }
}

