import comfotable_wind_img from '../../material/icon/comfotable-wind.png'
import strong_wind_img from '../../material/icon/strong-wind.png'
import sleep_wind_img from '../../material/icon/sleep-wind.png'
import shake_wind_img from '../../material/icon/shake-wind.png'
// import buzzer_wind_img from '../../material/icon/buzzer-wind.png'
import time_wind_img from '../../material/icon/time-wind.png'
import wind_img from '../../material/icon/wind.png'
import voice_wind_img from '../../material/icon/voice.png'
import uv_img from '../../material/icon/uv.png'
import voice_on from '../../material/icon/voiceon.png';
import voice_off from '../../material/icon/voiceoff.png';

export const default_wind_types = [
    {
        operator: 'shake',
        name: '摇头',
    },{
        operator: 'buzz',
        name: '蜂鸣器',
    }, {
        operator: 'timing',
        name: '定时',
        click_name:'剩余',
    }];

export const control_wind_types = [{
    operator: 'uv',
    name: '紫外',
}]

// export const wind_types_imgs = [comfotable_wind_img,strong_wind_img,sleep_wind_img,shake_wind_img,buzzer_wind_img,time_wind_img];

export const wind_types_imgs = {
    normal: wind_img,
    pure: comfotable_wind_img,
    sleep: sleep_wind_img,
    strong: strong_wind_img,
    shake: shake_wind_img,
    buzz:voice_wind_img,
    // voice:{
    //     on:voice_on,
    //     off:voice_off
    // },
    timing: time_wind_img,
    uv: uv_img,
}


