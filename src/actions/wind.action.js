export const CLICK_Wind = 'clickWind'
export const WIND_LEVEL_CHANGE = 'windLevelChange'

export const clickWindAction = (windTemperature)=>({
    type:CLICK_Wind,
    windTemperature
})

export const windLevelChangeAction = (windLevel)=>({
    type:WIND_LEVEL_CHANGE,
    windLevel
})