import axios from 'axios'

import createHistory from 'history/createHashHistory';

axios.interceptors.response.use((response) => {
    return response
}, (err) => {
    if (err.response.status == '401') {
        const history = createHistory();
        history.push('/login')
    }
    return Promise.reject(err)
})

const location_url = 'https://microservice.gmair.net/reception/location';

function list_province() {
    let access_token = localStorage.getItem('access_token');
    let request_province_url = location_url + '/province/list?access_token=' + access_token;
    return axios.get(request_province_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function list_city(province_id) {
    let access_token = localStorage.getItem('access_token');
    let request_city_url = location_url + '/' + province_id + '/cities?access_token=' + access_token;
    return axios.get(request_city_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function list_district(city_id) {
    let district_url = location_url + '/' + city_id + '/districts';
    return axios.get(district_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function tell_location() {
    let tell_location_url = location_url + '/ip/address';
    return axios.get(tell_location_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function city_profile(city_id) {
    let access_token = localStorage.getItem('access_token');
    let city_profile_url = location_url + '/probe/provinceId?access_token=' + access_token + '&cityId=' + city_id;
    return axios.get(city_profile_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })

}

function district_profile(districtId) {
    let access_token = localStorage.getItem('access_token');
    let url = location_url + '/probe/district?access_token=' + access_token + '&districtId=' + districtId;
    return axios.get(url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })

}

function acquire_city_id(code) {
    let access_token = localStorage.getItem('access_token');
    let city_url = location_url + '/probe/cityId?access_token=' + access_token + '&code=' + code;
    return axios.get(city_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function get_city_list() {
    let url = "https://microservice.gmair.net/location/overview";
    return axios.get(url).then(response=>{
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

export const locationservice = {
    acquire_city_id, city_profile, list_province, list_city, list_district, tell_location,get_city_list,district_profile
};
