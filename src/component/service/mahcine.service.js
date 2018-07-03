import axios from 'axios'

const machine_service_url = 'https://microservice.gmair.net/reception/machine';

function check_exist(qrcode) {
    let access_token = localStorage.getItem("access_token");
    let qrcode_url = machine_service_url + '/qrcode/status';
    let form = new FormData();
    form.set('qrcode', qrcode);
    form.set('access_token', access_token);
    return axios.post(qrcode_url, form).then(function (response) {
        return response.data;
    }).catch(() => {
        return {responseCode: 'RESPONSE_ERROR', description: 'Fail to process the request'};
    })

}

export const machine_service = {
    check_exist
}