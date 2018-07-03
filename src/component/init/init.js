import React from 'react'

import {machine_service} from '../service/mahcine.service';

const gmair_init_page = {
    width: `100%`,
    height: `100%`,
    backgroundColor: `#F3F3F3`
}

const gmair_device_name = {
    paddingTop: `5rem`,
    width: `100%`,
    textAlign: `center`
}

class DeviceInit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qrcode: ''
        }
    }

    componentDidMount() {
        let access_token = localStorage.getItem("access_token");
        if(access_token === undefined || access_token === null || access_token === '') {
            this.props.history.push('/login');
        }
        var qrcode = this.props.match.params.qrcode;
        machine_service.check_exist(qrcode).then(response => {
            if(response.responseCode === 'RESPONSE_ERROR') {
                this.props.history.push('/login');
            }
            if(response.responseCode === 'RESPONSE_NULL') {
                
            }
        })
    }

    render() {
        return (
            <div style={gmair_init_page}>
                <div style={gmair_device_name}>
                    <div><span><i className='glyphicon glyphicon-home'></i></span></div>
                </div>
            </div>
        )
    }
}

export default DeviceInit