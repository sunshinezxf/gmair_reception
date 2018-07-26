import axios from 'axios'

const machine_service_url = 'https://microservice.gmair.net/reception/machine';

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

function check_exist_name(qrcode, bind_name) {
    let access_token = localStorage.getItem("access_token");
    let exist_name_url = machine_service_url + '/check/existname?access_token=' + access_token + '&deviceName=' + bind_name + '&qrcode=' + qrcode;
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

function power(qrcode, operation) {
    let access_token = localStorage.getItem('access_token');
    let power_operate_url = machine_service_url + '/operate/power/' + operation;
    let form = new FormData();
    form.append('qrcode', qrcode);
    form.append('access_token', access_token);
    return axios.post(power_operate_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to operate machine power status'};
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

export const machine_service = {
    check_exist, check_exist_name, check_online, confirm_init, obtain_code_value_via_url, obtain_machine_list, obtain_machine_status, obtain_model, power, unbind
}