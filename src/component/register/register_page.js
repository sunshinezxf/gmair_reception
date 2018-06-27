import React from 'react'

import register from './register.png'

import Slogan from '../slogan/slogan'

import Footer from '../footer/footer'

import {Button, FormGroup, FormControl, InputGroup} from 'react-bootstrap'

import gmair_white from '../../material/logo/gmair_white.png'

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
            username: '',
            mobile: '',
            password: '',
            address: '',
            filled: false
        }

        this.read_username = this.read_username.bind(this);
        this.read_mobile = this.read_mobile.bind(this);
        this.read_password = this.read_password.bind(this);
        this.read_address = this.read_address.bind(this);
        this.validate = this.validate.bind(this);
        this.validate_mobile = this.validate_mobile.bind(this);
    }

    validate_mobile = () => {
        var pattern = /^((\+?86)|(\+86\+86))?1\d{10}$/;
        if (pattern.test(this.state.mobile) === true) {
            console.log("mobile number received.");
        }
    }

    validate = () => {
        if (this.state.username !== '' && this.state.mobile !== '' && this.state.password !== '' && this.state.address !== '') {
            this.setState({filled: true});
        } else {
            this.setState({filled: false});
        }
    }

    read_username = (e) => {
        this.setState({username: e.target.value}, this.validate);
    }

    read_mobile = (e) => {
        this.setState({mobile: e.target.value}, this.validate_mobile);
    }

    read_password = (e) => {
        this.setState({password: e.target.value}, this.validate);
    }

    read_address = (e) => {
        this.setState({address: e.target.value}, this.validate);
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
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon style={white_icon}><span className="glyphicon glyphicon-lock"></span></InputGroup.Addon>
                            <FormControl type="password" placeholder = '请输入动态验证码' style={transparent_input} value={this.state.password} onChange={this.read_password}></FormControl>
                            <InputGroup.Addon><Button style={password_btn}>获取验证码</Button></InputGroup.Addon>
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
                    <Button block style={register_btn}>注&nbsp;册</Button>
                </div>
                <Footer name="已有账号，请点击登录" link="/login"/>
            </div>
        )
    }
}
export default RegisterPage