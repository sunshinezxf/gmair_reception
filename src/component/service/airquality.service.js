import axios from 'axios'

const airquality_url = 'https://microservice.gmair.net/reception/airquality';

function config_default_outdoor(qrcode, city_id) {
    let access_token = localStorage.getItem('access_token');
    let config_default_outdoor_url = airquality_url + '/city/modify';
    let form = new FormData();
    form.append('access_token', access_token);
    form.append('qrcode', qrcode);
    form.append('cityId', city_id);
    return axios.post(config_default_outdoor_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function obtain_latest_aqi(cityId) {
    let access_token = localStorage.getItem('access_token');
    let obtain_aqi_url = airquality_url + '/city?access_token=' + access_token + '&cityId=' + cityId;
    return axios.get(obtain_aqi_url).then(function(response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'};
    })
}

function obtain_city_pm2_5_24hrs(city_id) {
    let access_token = localStorage.getItem('access_token');
    let obtain_aqi_url = airquality_url + '/city/daily/aqi?access_token=' + access_token + '&cityId=' + city_id;
    return axios.get(obtain_aqi_url).then(function(response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'};
    })
}

export const airquality_service = {
    config_default_outdoor, obtain_city_pm2_5_24hrs, obtain_latest_aqi
}