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

export const machine_service = {
    check_exist, check_online, obtain_machine_list, obtain_machine_status
}