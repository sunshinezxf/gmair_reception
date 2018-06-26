import React from 'react'

import {Button} from 'react-bootstrap'

import {FormGroup} from 'react-bootstrap'

import {FormControl} from 'react-bootstrap'

import {InputGroup} from 'react-bootstrap'

import Slogan from '../slogan/slogan'

import login from './login.png'

import gmair_white from '../../material/logo/gmair_white.png'

const gmair_login_page = {
    backgroundImage: `url(${login})`,
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

const login_btn = {
    color: `#00AEEF`,
    fontSize: `1.4rem`,
    backgroundColor: `#FFFFFF`,
    textAlign: `center`
}


class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.read_mobile = this.read_mobile.bind(this);
        this.state = {
            showtext: false,
            mobile: '',
            password: ''
        };
    }

    render() {
        return (
            <div style={gmair_login_page}>
                <div className="gmair_logo">
                    <img src={gmair_white} style={logo} alt="GMAIR_LOGO"></img>
                </div>
                <Slogan></Slogan>
                <div className="gmair_login_area">
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon style={white_icon}><span className="glyphicon glyphicon-phone"></span></InputGroup.Addon>
                            <FormControl type="tel" placeholder = '请输入手机号码' style={transparent_input} value={this.state.mobile} onChange={this.read_mobile}></FormControl>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon style={white_icon}><span className="glyphicon glyphicon-lock"></span></InputGroup.Addon>
                            <FormControl type="password" placeholder = '请输入密码' style={transparent_input}></FormControl>
                            <InputGroup.Addon style={password_btn}>获取验证码</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>
                <div className="gmair_login_btn">
                    <Button block style={login_btn}>登&nbsp;录</Button>
                </div>
            </div>
        )
    }

    read_mobile = (e) => {
        this.setState({mobile: e.target.value}, this.validate_mobile);
    }

    validate_mobile = () => {
        var pattern = /^((\+?86)|(\+86\+86))?1\d{10}$/;
        if (pattern.test(this.state.mobile) === true) {
            console.log("mobile number received.");
        }
    }
}

export default LoginPage