import React from 'react'

import {Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap'

import QRCode from 'qrcode.react'

class QRCodeGen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qrcode: '',
            ready2gen: false,
            size: 180,
            fgColor: '#00AEEF',
            bgColor: '#F3F3F3',
            level: 'H',
            renderAs: 'canvas',
            show_qrcode_img: false,
            code_url: ''
        };
        this.validate_qrcode = this.validate_qrcode.bind(this);
        this.read_qrcode = this.read_qrcode.bind(this);
        this.confirm_gen = this.confirm_gen.bind(this);
        this.clear_qrcode = this.clear_qrcode.bind(this);
    }

    read_qrcode = (e) => {
        this.setState({qrcode: e.target.value}, this.validate_qrcode)
    }

    validate_qrcode = () => {
        let qrcode = this.state.qrcode;
        if (qrcode !== '') {
            this.setState({ready2gen: true})
        } else {
            this.setState({ready2gen: false})
        }
    }

    confirm_gen = () => {
        let qrcode = this.state.qrcode;
        let code_url = "https://reception.gmair.net/init/" + qrcode;
        this.setState({code_url: code_url, show_qrcode_img: true});
    }

    clear_qrcode = () => {
        this.setState({qrcode: '', ready2gen: false, show_qrcode_img: false});
    }

    render() {
        return (
            <div style={gmair_init_page}>
                <div style={gmair_device_name}>
                    <div><span style={gmair_device_name_text}><i
                        className='glyphicon glyphicon-home'></i>&nbsp;二维码图片生成</span></div>
                </div>
                <div style={gmair_device_name_arc}></div>
                <div style={gmair_device_content}>
                    <FormGroup>
                        <ControlLabel>
                            <div style={gmair_device_item}><span><i
                                className='fa fa-tag'></i></span> &nbsp;设备二维码
                            </div>
                        </ControlLabel>
                        <FormControl style={transparent_input} type="text" placeholder="请输入设备二维码"
                                     onChange={this.read_qrcode} disabled={this.state.show_qrcode_img}
                                     value={this.state.qrcode}/>
                    </FormGroup>
                    <FormGroup>
                        <div style={code_area}>
                            {this.state.show_qrcode_img &&
                            <QRCode
                                value={this.state.code_url}
                                size={this.state.size}
                                fgColor={this.state.fgColor}
                                bgColor={this.state.bgColor}
                                level={this.state.level}
                                renderAs={this.state.renderAs}
                            />
                            }
                        </div>
                    </FormGroup>
                </div>
                <div style={gmair_confirm_btn}>
                    {this.state.show_qrcode_img ?
                        <Button bsStyle='info' onClick={this.clear_qrcode} block>重新生成</Button>
                        :
                        <Button bsStyle='info' onClick={this.confirm_gen} block
                                disabled={!this.state.ready2gen}>开始生成</Button>
                    }

                </div>
            </div>
        )
    }
}


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

const code_area = {
    width: `100%`,
    textAlign: `center`
}

export default QRCodeGen;