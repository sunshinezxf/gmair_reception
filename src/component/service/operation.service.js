import axios from 'axios';

const operation_service_url = 'http://192.168.50.22:8022/reception/machine';
let access_token="7add6df7-7789-46c8-a4e7-57b4e53a89aa";

//开启定时任务
function start_timing(qrcode,startHour,startMinute,endHour,endMinute,status) {
    // let access_token = localStorage.getItem("access_token");
    let start_timing_url = operation_service_url + '/confirm/timing/power';
    let form = new FormData();
    form.append('qrcode', qrcode);
    form.append('access_token', access_token);
    form.append('startHour', startHour);
    form.append('startMinute', startMinute);
    form.append('endHour', endHour);
    form.append('endMinute', endMinute);
    form.append('status',status);
    return axios.post(start_timing_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'};
    })
}

//获取定时任务
function obtain_timing_status(qrcode) {
    // let access_token = localStorage.getItem("access_token");
    let obtain_timing_status_url=operation_service_url+"/probe/onoff/status/by/code?access_token="+access_token+"&qrcode="+qrcode;
    return axios.get(obtain_timing_status_url).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'}
    })
}

//格式化时间
function format_time(hour,minute) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    let result = new Date(year + "-" + month + "-" + day + " " + hour + ":" + minute + ":00");
    return result;
}

function push_picture(qrcode) {
    // let access_token=localStorage.getItem("access_token");
    let push_picture_url=operation_service_url+"/share";
    let form = new FormData();
    form.append('qrcode', qrcode);
    form.append('access_token', access_token);
    return axios.post(push_picture_url, form).then(function (response) {
        console.log(response);
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'};
    })
}

export const operation_service={
    start_timing,obtain_timing_status,format_time,push_picture
}