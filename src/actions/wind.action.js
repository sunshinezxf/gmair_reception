export const CLICK_Wind = 'CLICK_Wind'
export const COLD_WIND_LEVEL_CHANGE = 'COLD_WIND_LEVEL_CHANGE'
export const HOT_WIND_LEVEL_CHANGE = 'HOT_WIND_LEVEL_CHANGE'
export const SELECT_WIND_TYPE = 'SELECT_WIND_TYPE'
export const SETTING_TIME = 'SETTING_TIME'
export const SELECT_TIME = 'SELECT_TIME'
export const SELECT_TEMPERATURE = 'SELECT_TEMPERATURE'
export const QRCODE_CHANGE = "QRCODE_CHANGE";
export const MACHINE_STATUS_CHANGE = "MACHINE_STATUS_CHANGE";
export const WORK_MODE_LIST = "WORK_MODE_LIST";


export const clickWindAction = (windTemperature)=>({
    type:CLICK_Wind,
    windTemperature
})

export const coldWindLevelChangeAction = (coldWindLevel)=>({
    type:COLD_WIND_LEVEL_CHANGE,
    coldWindLevel
})

export const hotWindLevelChangeAction = (hotWindLevel)=>({
    type:HOT_WIND_LEVEL_CHANGE,
    hotWindLevel
})

export const selectWindTypeAction = (windType)=>({
    type:SELECT_WIND_TYPE,
    windType
})

export const setTimeAction = ()=>({
    type:SETTING_TIME,
    isSettingTime:true,
})

export const selectTimeAction = (time)=>({
    type:SELECT_TIME,
    time
})

export const setTemperatureAction = (temperature)=>({
    type:SELECT_TEMPERATURE,
    temperature
})

export function changeQrcode(qrcode) {
    return {
        type:QRCODE_CHANGE,
        qrcode,
    }
}

export function changeMachineStatus(machine_status) {
    return {
        type:MACHINE_STATUS_CHANGE,
        machine_status:machine_status,
    }
}

export function changeModeList(work_mode_list) {
    return {
        type:WORK_MODE_LIST,
        work_mode_list:work_mode_list
    }
}
