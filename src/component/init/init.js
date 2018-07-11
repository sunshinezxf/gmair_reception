import React from 'react'

import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import {machine_service} from '../service/mahcine.service';

const gmair_init_page = {
    width: `100%`,
    height: `100%`,
    backgroundColor: `#F3F3F3`
}

const gmair_device_name = {
    padding: `5rem 0 1rem 0`,
    width: `100%`,
    textAlign: `center`,
    backgroundColor: `#00AEEF`,
    opacity: `0.75`,
    border: `solid #00AEEF`,
    fontSize: `1.6rem`
}

const gmair_device_name_text = {
    color: `white`,
    letterSpacing: `0.05rem`,
    fontFamily: `FZLanTingKanHei-R-GBK`,
    fontWeight: `lighter`
}

const gmair_device_item = {
    color: `#00AEEF`,
    letterSpacing: `0.05rem`,
    fontFamily: `FZLanTingKanHei-R-GBK`,
    fontWeight: `lighter`
}

const gmair_device_name_arc = {
    backgroundColor: `#00AEEF`,
    border: `0.1rem solid #00AEEF`,
    borderRadius: `0 0 50rem 50rem`,
    height: `4rem`,
    width: `100%`,
    opacity: `0.75`
}

const gmair_device_content = {
    width: `90%`,
    margin: `10rem 5% 0rem 5%`
}

const transparent_input = {
    backgroundColor: `#F3F3F3`,
    color: `black`,
    border: `1px solid transparent`,
    borderBottom: `1px solid #C9C9C9`,
    boxShadow: `unset`,
    width: `100%`
}

const gmair_confirm_btn = {
    width: `85%`,
    margin: `5rem 7.5% 0 7.5%`,
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
        let qrcode = this.props.match.params.qrcode;
        machine_service.check_exist(qrcode).then(response => {
            if(response.responseCode === 'RESPONSE_ERROR') {
                this.props.history.push('/login');
                return;
            }
            if(response.responseCode === 'RESPONSE_NULL') {
                //qrcode not exist
                this.props.history.push('/login');
                return;
            }
        })
    }

    render() {
        return (
            <div style={gmair_init_page}>
                <div style={gmair_device_name}>
                    <div><span style={gmair_device_name_text}><i
                        className='glyphicon glyphicon-home'></i>&nbsp;设备初始化</span></div>
                </div>
                <div style={gmair_device_name_arc}></div>
                <div style={gmair_device_content}>
                    <FormGroup>
                        <ControlLabel>
                            <div style={gmair_device_item}><span><i
                                className='glyphicon glyphicon-pencil'></i></span> &nbsp;设备名称
                            </div>
                        </ControlLabel>
                        <FormControl style={transparent_input} type="text" placeholder="请输入设备别名"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>
                            <div style={gmair_device_item}><span><i
                                className='glyphicon glyphicon-tags'></i></span> &nbsp;设备型号
                            </div>
                        </ControlLabel>
                        <FormControl style={transparent_input} type="text" placeholder="Enter text"/>
                    </FormGroup>
                </div>
                <div style={gmair_confirm_btn}>
                    <Button bsStyle='info' block>确认信息</Button>
                </div>
            </div>
        )
    }
}

export default DeviceInit