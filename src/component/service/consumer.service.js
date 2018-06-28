import axios from 'axios'

const consumer_url = 'https://microservice.gmair.net';

function request_login_code(mobile) {
    let request_code_url = consumer_url + '/auth/consumer/authentication/request';
    let form = new FormData();
    form.set('phone', mobile);
    return axios.post(request_code_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    });
}

function request_register_code(mobile) {
    let request_code_url = consumer_url + '/auth/consumer/registration/request';
    let form = new FormData();
    form.set('phone', mobile);
    return axios.post(request_code_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    });
}

function login(username, code) {
    let login_url = consumer_url + '/oauth/consumer/token';
    let form = new FormData();
    form.set('username', username);
    form.set('password', code);
    form.set('grant_type', 'password');
    form.set('client_secret', '123456');
    form.set('client_id', 'client_2');
    return axios.post(login_url, form).then(response => {
        if (response.status === 200) {
            let access_token = response.data.access_token;
            localStorage.setItem('access_token', access_token);
        } else {
            console.log('authentication failed for user: ' + username)
        }
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    });
}

function exist(phone) {
    let exist_url = consumer_url + '/reception/consumer/check/phone?phone=' + phone;
    return axios.get(exist_url).then(response => {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    });
}

function register(wechat, username, mobile, code, province, city, address) {
    let register_url = consumer_url + '/auth/consumer/register';
    let form = new FormData();
    form.set('name', username);
    form.set('wechat', wechat);
    form.set('phone', mobile);
    form.set('addressProvince', province);
    form.set('addressCity', city);
    form.set('addressDetail', address);
    return axios.post(register_url, form).then(response => {
        return response;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    });
}



export const consumerservice = {
    request_login_code, request_register_code, login, exist, register
}