import axios from 'axios'

const wechat_url = 'https://microservice.gmair.net/wechat';

function configuration(url) {
    let request_config_url = wechat_url + '/config/init';
    let form = new FormData();
    form.append('url', url);
    return axios.post(request_config_url, form).then(response => {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    });
}

function openid() {
    let openid = localStorage.getItem('openid');
    if (openid == null || openid === '') {
        return null;
    }
    return openid;
}

function openidbycode(code) {
    let request_openid_url = 'https://microservice.gmair.net/reception/wechat/openid/bycode';
    let form = new FormData();
    form.append('code', code);
    return axios.post(request_openid_url, form).then(response => {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

export const wechatservice = {
    configuration, openid, openidbycode
};