import React from 'react'

import register from './register.png'

import Slogan from '../slogan/slogan'

import Footer from '../footer/footer'

import {Button, FormGroup, FormControl, InputGroup, HelpBlock} from 'react-bootstrap'

import gmair_white from '../../material/logo/gmair_white.png'

import {consumerservice} from "../service/consumer.service";

import {locationservice} from "../service/location.service";

const gmair_register_page = {
    backgroundImage: `url(${register})`,
    width: `100%`,
    height: `100%`,
    backgroundSize: `100% 100%`
}

const logo = {
    height: `6rem`,
    width: `14rem`
}

const white_icon = {
    color: `white`,
    backgroundColor: `transparent`,
    border: `unset`
}

const transparent_input = {
    backgroundColor: `transparent`,
    color: `#FFFFFF`,
    border: `1px solid transparent`,
    borderBottom: `1px solid #FFFFFF`,
    boxShadow: `unset`,
    width: `100%`
}

const help_text = {
    color: `#FFFFFF`,
    marginLeft: `1.45rem`
}

const password_btn = {
    color: `#00AEEF`,
    opacity: `0.75`
}

const register_btn = {
    color: `#00AEEF`,
    fontSize: `1.4rem`,
    backgroundColor: `#FFFFFF`,
    textAlign: `center`
}

class RegisterPage extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            openid: '',
            username: '',
            mobile: '',
            mobile_desc: '',
            password: '',
            expected_password: '',
            address_province: '',
            address_city: '',
            address: '',
            verification_text: '获取验证码',
            filled: false,
            ready2send: false,
            ready2reg: false
        }

        this.read_username = this.read_username.bind(this);
        this.read_mobile = this.read_mobile.bind(this);
        this.read_password = this.read_password.bind(this);
        this.read_address = this.read_address.bind(this);
        this.validate = this.validate.bind(this);
        this.validate_mobile = this.validate_mobile.bind(this);
    }

    componentDidMount() {
        locationservice.tell_location().then(response => {
            if(response.responseCode !== undefined && response.responseCode === 'RESPONSE_OK') {
                let address = response.data;
                this.setState({address_province: address.province, address_city: address.city, address: address.province + address.city});
            }
        });
    }

    componentWillUnmount() {
        this.setState({
            openid: '',
            username: '',
            mobile: '',
            password: '',
            expected_password: '',
            address_province: '',
            address_city: '',
            address: '',
            filled: false,
            mobile_confirmed: false,
            code_confirmed: false,
            ready2send: false,
            ready2reg: false
        })
    }

    validate_mobile = () => {
        var pattern = /^((\+?86)|(\+86\+86))?1\d{10}$/;
        if (pattern.test(this.state.mobile) === true) {
            console.log("enter mobile")
            //check whether the phone number is occupied by existing user
            consumerservice.exist(this.state.mobile).then(response => {
                if (response.responseCode == 'RESPONSE_NULL') {
                    this.setState({ready2send: true, mobile_confirmed: true}, this.validate);
                } else if(response.responseCode == 'RESPONSE_OK') {
                    //the mobile phone number has already been registered
                    this.setState({mobile_desc: '此手机号已注册，请前往登录。', ready2send: false, mobile_confirmed: false}, this.validate);
                } else {
                    this.setState({ready2send: false, mobile_confirmed: false}, this.validate);
                }
            })
        }else {
            this.setState({ready2send: false, mobile_desc: ''}, this.validate);
        }
    }

    validate_code = () => {
        let expected_code = this.state.expected_password;
        let code = this.state.password;
        if (code === expected_code) {
            this.setState({code_confirmed: true}, this.validate);
        } else {
            this.setState({code_confirmed: false}, this.validate);
        }
    }

    validate = () => {
        if (this.state.username !== '' && this.state.mobile_confirmed == true && this.state.code_confirmed == true && this.state.address !== '') {
            this.setState({ready2reg: true});

        } else {
            this.setState({ready2reg: false});
        }
    }

    read_username = (e) => {
        this.setState({username: e.target.value}, this.validate);
    }

    read_mobile = (e) => {
        this.setState({mobile: e.target.value}, this.validate_mobile);
    }

    read_password = (e) => {
        this.setState({password: e.target.value}, this.validate_code);
    }

    read_address = (e) => {
        this.setState({address: e.target.value}, this.validate);
    }

    send_code = () => {
        consumerservice.request_register_code(this.state.mobile).then(response => {
            this.setState({ready2send: false});
            if (response.responseCode !== undefined && response.responseCode === 'RESPONSE_OK') {
                this.setState({expected_password: response.data.serial});
                let interval = 60;
                let verification_interval = setInterval(() => {
                    interval = interval - 1;
                    this.setState({verification_text: interval + 's后重发'});
                    if (interval < 0) {
                        this.setState({verification_text: '获取验证码', ready2send: true});
                        clearInterval(verification_interval);
                    }
                }, 1000);
            }
        });
    }

    register = () => {
        this.setState({ready2send: false, ready2reg: false});
        consumerservice.register(this.state.openid, this.state.username, this.state.mobile, this.state.password, this.state.address_province, this.state.address_city, this.state.address).then(response => {
            console.log(response);
        });
    }

    render() {
        return(
            <div style={gmair_register_page}>
                <div className="gmair_logo">
                    <img src={gmair_white} style={logo} alt="GMAIR_LOGO"></img>
                </div>
                <Slogan></Slogan>
                <div className="gmair_register_area">
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon style={white_icon}><span className="glyphicon glyphicon-user"></span></InputGroup.Addon>
                            <FormControl type="text" placeholder='请输入姓名' style={transparent_input} value={this.state.username} onChange={this.read_username}></FormControl>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon style={white_icon}><span className="glyphicon glyphicon-phone"></span></InputGroup.Addon>
                            <FormControl type="tel" placeholder='请输入手机号码' style={transparent_input} value={this.state.mobile} onChange={this.read_mobile}></FormControl>
                        </InputGroup>
                        <HelpBlock style={help_text}>{this.state.mobile_desc}</HelpBlock>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon style={white_icon}><span className="glyphicon glyphicon-lock"></span></InputGroup.Addon>
                            <FormControl type="password" placeholder = '请输入动态验证码' style={transparent_input} value={this.state.password} onChange={this.read_password}></FormControl>
                            <InputGroup.Addon><Button style={password_btn} disabled={!this.state.ready2send} onClick={this.send_code}>{this.state.verification_text}</Button></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon style={white_icon}><span className="glyphicon glyphicon-map-marker"></span></InputGroup.Addon>
                            <FormControl type="text" placeholder='请输入地址' style={transparent_input} value={this.state.address} onChange={this.read_address}></FormControl>
                        </InputGroup>
                    </FormGroup>
                </div>
                <div className="gmair_register_btn">
                    <Button block style={register_btn} disabled={!this.state.ready2reg} onClick={this.register}>注&nbsp;册</Button>
                </div>
                <Footer name="已有账号，请点击登录" link="/login"/>
            </div>
        )
    }
}
export default RegisterPage