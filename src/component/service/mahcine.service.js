import axios from 'axios'

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

function obtain_volume_range(modelId) {
    let access_token = localStorage.getItem('access_token');
    let obtain_volume_url = machine_service_url + '/probe/volume?access_token=' + access_token + '&modelId=' + modelId;
    return axios.get(obtain_volume_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to fetch volume range for ' + modelId};
    });
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
    operate,
    probe_component,
    unbind,
    volume,
    obtain_device_list
}
