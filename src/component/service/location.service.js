import axios from 'axios'

const location_url = 'https://microservice.gmair.net/reception/location';

function list_province() {
    let request_province_url = location_url + '/province/list';
    return axios.get(request_province_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

function list_city(province_id) {
    let request_city_url = location_url + '/' + province_id + '/cities';
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
    let tell_location_url = location_url + '/reception/location/ip/address';
    return axios.get(tell_location_url).then(function(response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

export const locationservice = {
    list_province, list_city, list_district, tell_location
}