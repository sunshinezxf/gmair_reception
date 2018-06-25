import React from 'react'

import ReactRevealText from 'react-reveal-text'

import {Button} from 'react-bootstrap'

import {FormGroup} from 'react-bootstrap'

import {FormControl} from 'react-bootstrap'

import {InputGroup} from 'react-bootstrap'

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

const login_btn = {
    color: `#00AEEF`,
    fontSize: `1.4rem`,
    backgroundColor: `#FFFFFF`,
    textAlign: `center`
}


class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = {
            showtext: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({showtext: true});
        }, 1300);
    }

    render() {
        return (
            <div style={gmair_login_page}>
                <div className="gmair_logo">
                    <img src={gmair_white} style={logo} alt="GMAIR_LOGO"></img>
                </div>
                <ReactRevealText className="gmair_logo_slogan" show={this.state.showtext}>唤醒新鲜空气</ReactRevealText>
                <div className="gmair_login_area">
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon style={white_icon}><span className="glyphicon glyphicon-phone"></span></InputGroup.Addon>
                            <FormControl type="tel" placeholder = '请输入手机号码' style={transparent_input}></FormControl>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon style={white_icon}><span className="glyphicon glyphicon-lock"></span></InputGroup.Addon>
                            <FormControl type="text" placeholder = '请输入密码' style={transparent_input}></FormControl>
                        </InputGroup>
                    </FormGroup>
                </div>
                <div className="gmair_login_btn">
                    <Button block style={login_btn}>登&nbsp;录</Button>
                </div>
            </div>
        )
    }
}

export default LoginPage