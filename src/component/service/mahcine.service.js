import axios from 'axios';

import createHistory from 'history/createHashHistory';
//import {createHashHistory} from 'history';

axios.interceptors.response.use((response) => {
    return response
}, (err) => {
    if (err.response.status === '401') {
        const history = createHistory();
     //  const history = createHashHistory();
        history.push('/login') 
    }
    return Promise.reject(err)
})

const machine_service_url = 'https://microservice.gmair.net/reception/machine';
// const machine_service_url = 'http://172.19.168.14:8017/reception/machine';

function check_exist(qrcode) {
    let access_token = localStorage.getItem("access_token");
    let qrcode_url = machine_service_url + '/qrcode/status';
    let form = new FormData();
    form.append('qrcode', qrcode);
    form.append('access_token', access_token);
    return axios.post(qrcode_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'};
    })
}

function check_exist_bind(qrcode) {
    let access_token = localStorage.getItem("access_token");
    let exist_bind_url = machine_service_url + '/check/device/binded?access_token=' + access_token + '&qrcode=' + qrcode;
    return axios.get(exist_bind_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'};
    })
}

function check_exist_name(bind_name) {
    let access_token = localStorage.getItem("access_token");
    let exist_name_url = machine_service_url + '/check/device/name/binded?access_token=' + access_token + '&deviceName=' + bind_name;
    return axios.get(exist_name_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'};
    })
}

function obtain_code_value_via_url(url) {
    let obtain_url = machine_service_url + '/probe/qrcode/byurl';
    let form = new FormData();
    form.append('codeUrl', url);
    return axios.post(obtain_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'};
    })
}

function obtain_model(model_id) {
    let access_token = localStorage.getItem("access_token");
    let obtain_url = machine_service_url + '/model/query/by/modelid?access_token=' + access_token + '&modelId=' + model_id;
    return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'};
    })
}

function check_online(qrcode) {
    let access_token = localStorage.getItem('access_token');
    let online_url = machine_service_url + '/checkonline?access_token=' + access_token + '&qrcode=' + qrcode;
    return axios.get(online_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to determine whether the machine is online'};
    })
}

function obtain_machine_list() {
    let access_token = localStorage.getItem('access_token');
    let machine_list_url = machine_service_url + '/devicelist?access_token=' + access_token;
    return axios.get(machine_list_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the list'};
    })
}

function obtain_machine_status(qrcode) {
    let access_token = localStorage.getItem('access_token');
    let machine_status_url = machine_service_url + '/info/probe?access_token=' + access_token + '&qrcode=' + qrcode;
    return axios.get(machine_status_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to obtain machine status'};
    })
}

function obtain_machine_new_status(qrcode){
    let access_token = localStorage.getItem('access_token');
    let machine_status_url = machine_service_url + '/running/status?access_token=' + access_token + '&qrcode=' + qrcode;
    return axios.get(machine_status_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to obtain machine status'};
    })
}

function operate(qrcode, component, operation) {
    let access_token = localStorage.getItem('access_token');
    let power_operate_url = machine_service_url + '/operate/' + component + '/' + operation;
    let form = new FormData();
    form.append('qrcode', qrcode);
    form.append('access_token', access_token);
    return axios.post(power_operate_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to operate machine power status'};
    })
}

function volume(qrcode, value) {
    let access_token = localStorage.getItem('access_token');
    let volume_operation_url = machine_service_url + '/config/speed';
    let form = new FormData();
    form.append('access_token', access_token);
    form.append('qrcode', qrcode);
    form.append('speed', value);
    return axios.post(volume_operation_url, form).then(response => {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to config machine volume'};
    })
}

function light(qrcode, value) {
    let access_token = localStorage.getItem('access_token');
    let light_operation_url = machine_service_url + '/config/light';
    let form = new FormData();
    form.append('access_token', access_token);
    form.append('qrcode', qrcode);
    form.append('light', value);
    return axios.post(light_operation_url, form).then(response => {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to config machine volume'};
    })
}

function temp(qrcode, value) {
    let access_token = localStorage.getItem('access_token');
    let temp_operation_url = machine_service_url + '/config/temp';
    let form = new FormData();
    form.append('access_token', access_token);
    form.append('qrcode', qrcode);
    form.append('temp', value);
    return axios.post(temp_operation_url, form).then(response => {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to config machine temp'};
    })
}

function timing(qrcode, value) {
    let access_token = localStorage.getItem('access_token');
    let timing_operation_url = machine_service_url + '/config/timing';
    let form = new FormData();
    form.append('access_token', access_token);
    form.append('qrcode', qrcode);
    form.append('timing', value);
    return axios.post(timing_operation_url, form).then(response => {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to config machine timing'};
    })
}

function unbind(qrcode) {
    let access_token = localStorage.getItem('access_token');
    let unbind_url = machine_service_url + '/consumer/qrcode/unbind';
    let form = new FormData();
    form.append('qrcode', qrcode);
    form.append('access_token', access_token);
    return axios.post(unbind_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to unbind qrcode: ' + qrcode};
    })
}

function confirm_init(qrcode, bind_name) {
    let confirm_init_url = machine_service_url + '/deviceinit';
    let form = new FormData();
    form.append('qrcode', qrcode);
    form.append('deviceName', bind_name);
    let access_token = localStorage.getItem('access_token');
    form.append('access_token', access_token);
    return axios.post(confirm_init_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to init: ' + qrcode};
    })
}

function gain_share(qrcode, bind_name) {
    let confirm_init_url = machine_service_url + '/device/bind/share';
    let form = new FormData();
    form.append('qrcode', qrcode);
    form.append('deviceName', bind_name);
    let access_token = localStorage.getItem('access_token');
    form.append('access_token', access_token);
    return axios.post(confirm_init_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to init: ' + qrcode};
    })
}

function obtain_control_option(modelId) {
    let access_token = localStorage.getItem('access_token');
    let obtain_control_option_url = machine_service_url + '/control/option/probe?access_token=' + access_token + '&modelId=' + modelId;
    return axios.get(obtain_control_option_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to fetch control option for ' + modelId};
    });
}

//获取基本风量范围
function obtain_volume_range(modelId) {
    let access_token = localStorage.getItem('access_token');
    let obtain_volume_url = machine_service_url + '/probe/volume?access_token=' + access_token + '&modelId=' + modelId;
    return axios.get(obtain_volume_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to fetch volume range for ' + modelId};
    });
}

//得到设备隐藏风量值
function obtain_turboVolume_range(qrcode) {
    let access_token = localStorage.getItem('access_token');
    let obtain_volume_url = machine_service_url + '/turboVolume/getValue?access_token=' + access_token + '&qrcode=' + qrcode;

    return axios.get(obtain_volume_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to fetch turbo volume range for ' + qrcode};
    });

}

//查询设备隐藏风量开关状态
function obtain_turboVolume_status(qrcode) {
    let access_token = localStorage.getItem('access_token');
   let obtain_url = machine_service_url + '/turboVolume/getStatus?access_token=' + access_token + '&qrcode=' + qrcode;

    return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() =>{
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to fetch turbo volume status for ' + qrcode};
    })
}

//改变设备隐藏风量开关状态
function change_turboVolume_status(qrcode,status) {
    let access_token = localStorage.getItem('access_token');
    let turboVolume_change_url = machine_service_url + '/turboVolume/changeStatus';
    let form = new FormData();
    form.append('turboVolumeStatus',status);
    form.append('qrcode', qrcode);
    form.append('access_token', access_token);
    return axios.post(turboVolume_change_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to operate machine turboVolume status'};
    })
}

function obtain_light_range(modelId) {
    let access_token = localStorage.getItem('access_token');
    let obtain_volume_url = machine_service_url + '/probe/light?access_token=' + access_token + '&modelId=' + modelId;
    return axios.get(obtain_volume_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to fetch volume range for ' + modelId};
    });
}

function obtain_current_city(qrcode) {
    let access_token = localStorage.getItem('access_token');
    let obtain_city_url = machine_service_url + '/probe/cityId/byqrcode?access_token=' + access_token + '&qrcode=' + qrcode;
    return axios.get(obtain_city_url).then(function (response) {
        return response.data
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to fetch city for qrcode: ' + qrcode};
    })
}

function obtain_pm2_5_weekly(qrcode) {
    let access_token = localStorage.getItem('access_token');
    let obtain_url = machine_service_url + '/probe/daily/pm25?access_token=' + access_token + '&qrcode=' + qrcode;
    return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {
            responseCode: 'RESPONSE_ERROR',
            description: 'Fail to fetch machine weekly pm2.5 for qrcode: ' + qrcode
        };
    })
}

function obtain_bind_info(qrcode) {
    let access_token = localStorage.getItem('access_token');
    let obtain_url = machine_service_url + '/consumer/bind/probe/byqrcode?access_token=' + access_token + '&qrcode=' + qrcode;
    return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {
            responseCode: 'RESPONSE_ERROR',
            description: 'Fail to fetch machine weekly pm2.5 for qrcode: ' + qrcode
        };
    })
}

//绑定设备名称
function config_bind_name(qrcode, bind_name) {
    let access_token = localStorage.getItem('access_token');
    let config_url = machine_service_url + '/modify/bind/name';
    let form = new FormData();
    form.append('access_token', access_token);
    form.append('qrcode', qrcode);
    form.append('bindName', bind_name);
    return axios.post(config_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {
            responseCode: 'RESPONSE_ERROR',
            description: 'Fail to fetch machine weekly pm2.5 for qrcode: ' + qrcode
        };
    })
}

//滤网清洗提醒是否开启
function obtain_filter_isOpen(qrcode){
  let access_token = localStorage.getItem('access_token');
  let obtain_url = machine_service_url + '/filter/clean/isOpen?access_token=' + access_token + '&qrcode=' + qrcode;
  return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {
            responseCode: 'RESPONSE_ERROR',
            description: 'Fail to fetch filter isOpen for qrcode: ' + qrcode
        };
    })
}

//改变滤网清洗提醒状态
function change_filter_status(qrcode,status){
    let access_token = localStorage.getItem('access_token');
    let filter_change_url = machine_service_url + '/filter/clean/change';
    let form = new FormData();
    form.append('cleanRemindStatus',status);
    form.append('qrcode', qrcode);
    form.append('access_token', access_token);
    return axios.post(filter_change_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to operate machine filter status'};
    })
}

//滤网是否需要清洗
function obtain_filter_isClean(qrcode) {
    let access_token = localStorage.getItem('access_token');
    let obtain_url = machine_service_url + '/filter/clean?access_token=' + access_token + '&qrcode=' + qrcode;
  return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {
            responseCode: 'RESPONSE_ERROR',
            description: 'Fail to fetch filter isClean for qrcode: ' + qrcode
        };
    })
}

//滤网确认清洗
function confirm_filter_clean (qrcode) {
    let access_token = localStorage.getItem('access_token');
    let obtain_url = machine_service_url + '/filter/clean/confirm?access_token=' + access_token + '&qrcode=' + qrcode;
  return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {
            responseCode: 'RESPONSE_ERROR',
            description: 'Fail to confirm filter isClean for qrcode: ' + qrcode
        };
    })

}

//高效滤网更换提醒是否开启
function obtain_mainFilter_isOpen(qrcode) {
    let access_token = localStorage.getItem('access_token');
    let obtain_url = machine_service_url + '/efficientFilter/replaceRemind/isOpen?access_token=' + access_token + '&qrcode=' + qrcode;
    return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {
            responseCode: 'RESPONSE_ERROR',
            description: 'Fail to fetch efficientFilter isOpen for qrcode: ' + qrcode
        };
    })
}

//改变高效滤网提醒
function change_mainFilter_isOpen(qrcode,status) {
    let access_token = localStorage.getItem('access_token');
    let change_url = machine_service_url + '/efficientFilter/replaceRemind/status/change';
    let form = new FormData();
    form.append('replaceRemindStatus',status);
    form.append('qrcode', qrcode);
    form.append('access_token', access_token);
    return axios.post(change_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to change machine mainFilter status'};
    })
}

//获得高效滤网使用状态
function obtain_mainFilter_status(qrcode){
    let access_token = localStorage.getItem('access_token');
    let obtain_url = machine_service_url + '/efficientFilter/replaceStatus?access_token=' + access_token + '&qrcode=' + qrcode;

    return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {
            responseCode: 'RESPONSE_ERROR',
            description: 'Fail to fetch efficientFilter status for qrcode: ' + qrcode
        };
    })

}

//确认更改高效滤网状态
function confirm_mainFilter_status(qrcode) {
    let access_token = localStorage.getItem('access_token');
    let obtain_url = machine_service_url + '/efficientFilter/replace/confirm?access_token=' + access_token + '&qrcode=' + qrcode;
    return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {
            responseCode: 'RESPONSE_ERROR',
            description: 'Fail to confirm efficientFilter status for qrcode: ' + qrcode
        };
    })
}

function probe_component(model_id, component_name) {
    let access_token = localStorage.getItem('access_token');
    let probe_component_url = machine_service_url + '/model/component/probe?access_token=' + access_token + '&modelId=' + model_id + '&componentName=' + component_name;
    return axios.get(probe_component_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {
            responseCode: 'RESPONSE_ERROR',
            description: 'Fail to fetch component for model ' + model_id
        };
    })
}

function obtain_device_list() {
    let access_token = localStorage.getItem('access_token');
    let machine_list_url = machine_service_url + '/list?access_token=' + access_token;
    return axios.get(machine_list_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the list'};
    })
}

//获取耗材购买链接
function obtain_materials_link(modelId) {
    let access_token = localStorage.getItem('access_token');
    let obtain_url = machine_service_url + '/model/getMaterials?access_token=' + access_token  + '&modelId=' + modelId;
    return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to obtain the materials link'};
    })
}

//获取滤网提示消息
function obtain_alert_msg(textType) {
    let access_token = localStorage.getItem('access_token');
    let obtain_url = machine_service_url + '/text?access_token=' + access_token  + '&textType=' + textType;
    return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to obtain the alert'};
    })
}

//根据设备码获取用户列表
function obtain_userList(qrcode) {
    let access_token = localStorage.getItem('access_token');
    let obtain_url = machine_service_url + '/consumer/profile?access_token=' + access_token+ '&qrcode=' + qrcode;
    return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to obtain the userList'};
    })

}


//根据绑定的Id删除设备用户权限
function delete_user(bindId) {
    let access_token = localStorage.getItem('access_token');
    let obtain_url = machine_service_url + '/consumer/withdrawshare?access_token=' + access_token+ '&bindId=' + bindId;
    return axios.get(obtain_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to delete the user'};
    })


}

export const machine_service = {
    check_exist,
    check_exist_bind,
    check_exist_name,
    check_online,
    config_bind_name,
    confirm_init,
    gain_share,
    light,
    obtain_bind_info,
    obtain_code_value_via_url,
    obtain_control_option,
    obtain_current_city,
    obtain_machine_list,
    obtain_machine_status,
    obtain_machine_new_status,
    obtain_model,
    obtain_pm2_5_weekly,
    obtain_volume_range,
    obtain_light_range,
    obtain_filter_isOpen,
    operate,
    probe_component,
    unbind,
    volume,
    obtain_device_list,
    temp,
    timing,
    change_filter_status,
    obtain_filter_isClean,
    confirm_filter_clean,
    obtain_turboVolume_range,
    obtain_turboVolume_status,
    change_turboVolume_status,
    obtain_mainFilter_isOpen,
    obtain_mainFilter_status,
    change_mainFilter_isOpen,
    confirm_mainFilter_status,
    obtain_materials_link,
    obtain_alert_msg,
    obtain_userList,
    delete_user

}
