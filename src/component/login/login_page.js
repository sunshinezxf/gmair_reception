import React from 'react'

import {Button, FormGroup, FormControl, InputGroup} from 'react-bootstrap'

import Slogan from '../slogan/slogan'

import Footer from '../footer/footer'

import login from './login.png'

import gmair_white from '../../material/logo/gmair_white.png'

import {consumerservice} from '../service/consumer.service.js'

import {util} from '../service/util.js'
import {wechatservice} from "../service/wechat.service";

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
    color: `#00AEEF`
}

const login_btn = {
    color: `#00AEEF`,
    fontSize: `1.4rem`,
    backgroundColor: `#FFFFFF`,
    letterSpacing: `5px`,
    textAlign: `center`,
}


class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.read_mobile = this.read_mobile.bind(this);
        this.read_code = this.read_code.bind(this);
        this.send_code = this.send_code.bind(this);
        this.validate_mobile = this.validate_mobile.bind(this);
        this.validate_code = this.validate_code.bind(this);
        this.login = this.login.bind(this);

        this.init_config = this.init_config.bind(this);

        this.state = {
            showtext: false,
            verification_text: '获取验证码',
            mobile: '',
            password: '',
            expected_password: '',
            ready2send: false,
            ready2login: false,
            entry: '',
            status: ''
        };
    }

    init_config = () => {
        let url = window.location.href;
        if (util.is_weixin()) {
            wechatservice.configuration(url).then(response => {
                if (response.responseCode === 'RESPONSE_OK') {
                    let result = response.data;
                    window.wx.config({
                        beta: true,
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: result.appId, // 必填，公众号的唯一标识
                        timestamp: result.timestamp, // 必填，生成签名的时间戳
                        nonceStr: result.nonceStr, // 必填，生成签名的随机串
                        signature: result.signature,// 必填，签名
                        jsApiList: ['hideAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
                    });
                    window.wx.ready(() => {
                        window.wx.hideAllNonBaseMenuItem();

                        let reg = new RegExp("(^|&)code=([^&]*)(&|$)");
                        let r = this.props.location.search.substr(1).match(reg);
                        let code = '';
                        if (r != null) {
                            code = unescape(r[2]);
                        }
                        if (wechatservice.openid() !== null) {
                            consumerservice.loginbyopenid(wechatservice.openid()).then(response => {
                                if (response.responseCode === 'RESPONSE_OK') {
                                    window.location.href = '/machine/list';
                                }
                            })
                        }
                        if (code === '' && wechatservice.openid() == null) {
                            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + result.appId + "&redirect_uri=" + encodeURI('https://reception.gmair.net/login') + "&response_type=code&scope=snsapi_base&state=gmair#wechat_redirect";
                        }
                        if (code !== '' && wechatservice.openid() == null) {
                            wechatservice.openidbycode(code).then(response => {
                                if (response.responseCode === 'RESPONSE_OK') {
                                    let openid = response.data;
                                    localStorage.setItem('openid', openid);
                                    consumerservice.loginbyopenid(openid).then(response => {
                                        if (response.responseCode === 'RESPONSE_OK') {
                                            window.location.href = '/machine/list';
                                        }
                                    })
                                }
                            })
                        }
                    });
                }
            });
        } else {
            // alert("seems that you are not in wechat")
        }
    }

    componentDidMount() {
        let portal = this.props.match.params.portal;
        if (portal !== undefined && portal !== null) {
            this.setState({
                entry: portal
            })
            // util.load_script("https://reception.gmair.net/plugin/vconsole.min.js", () => {
            //     var vConsole = new window.VConsole();
            // })
        }
        if (util.is_weixin()) {
            util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
                this.init_config();
            })
        }
        // util.load_script("https://reception.gmair.net/plugin/vconsole.min.js", () => {
        //     var vConsole = new window.VConsole();
        // })
    }

    componentWillUnmount() {
        this.setState({
            showtext: false,
            verification_text: '获取验证码',
            mobile: '',
            password: '',
            expected_password: '',
            ready2send: false,
            ready2login: false
        });
    }

    render() {

        let btn_message = "登录";
        if (this.state.entry === "xiaoai") {
            btn_message = "授权绑定";
        }
        if (this.state.entry === "aligenie") {
            btn_message = "授权绑定";
        }
        return (
            <div style={gmair_login_page}>
                <div className="gmair_logo">
                    <img src={gmair_white} style={logo} alt="GMAIR_LOGO"></img>
                </div>
                <Slogan></Slogan>
                <div className="gmair_login_area">
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon style={white_icon}><span
                                className="glyphicon glyphicon-phone"></span></InputGroup.Addon>
                            <FormControl type="tel" placeholder='请输入手机号码' style={transparent_input}
                                         value={this.state.mobile} onChange={this.read_mobile}></FormControl>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon style={white_icon}><span
                                className="glyphicon glyphicon-lock"></span></InputGroup.Addon>
                            <FormControl type="password" placeholder='请输入动态验证码' style={transparent_input}
                                         value={this.state.password} onChange={this.read_code}></FormControl>
                            <InputGroup.Addon><Button disabled={!this.state.ready2send} onClick={this.send_code}
                                                      style={password_btn}>{this.state.verification_text}</Button></InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </div>
                <div className="gmair_login_btn">
                    <Button block style={login_btn} onClick={this.login}
                            disabled={!this.state.ready2login}>{btn_message}</Button>
                </div>
                <Footer name="尚无账号，请点击注册" link="/register"/>
            </div>
        )
    }

    read_mobile = (e) => {
        this.setState({mobile: e.target.value}, this.validate_mobile);
    }

    read_code = (e) => {
        this.setState({password: e.target.value}, this.validate_code);
    }

    validate_mobile = () => {
        var pattern = /^((\+?86)|(\+86\+86))?1\d{10}$/;
        if (pattern.test(this.state.mobile) === true) {
            this.setState({ready2send: true});
        } else {
            this.setState({ready2send: false});
        }
    }

    validate_code = () => {
        let expected_code = this.state.expected_password;
        let code = this.state.password;
        if (code === expected_code) {
            this.setState({ready2login: true});
        } else {
            this.setState({ready2login: false});
        }
    }

    send_code = () => {
        consumerservice.request_login_code(this.state.mobile).then(response => {
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

    login = () => {
        this.setState({ready2send: false, ready2login: false});
        if (this.state.entry == "xiaoai") {
            consumerservice.login(this.state.mobile, this.state.password).then(response => {
                if (response.responseCode == 'RESPONSE_OK') {
                    let url = "https://microservice.gmair.net/oauth/consumer/authorize?response_type=code&client_id=client_3&redirect_uri=https%3A%2F%2Foauth-redirect.api.home.mi.com%2Fr%2F2147479194&access_token=" + localStorage.getItem("access_token") + "&state=" + new URLSearchParams(window.location.search).get("state");
                    window.location.href = url;
                }
            });
        } else if (this.state.entry == "aligenie") {
            consumerservice.login(this.state.mobile, this.state.password).then(response => {
                if (response.responseCode == 'RESPONSE_OK') {
                    let url = "https://microservice.gmair.net/oauth/consumer/authorize?response_type=code&client_id=client_4&redirect_uri=https%3A%2F%2Fopen.bot.tmall.com%2Foauth%2Fcallback&access_token=" + localStorage.getItem("access_token") + "&state=" + new URLSearchParams(window.location.search).get("state");
                    window.location.href = url;
                }
            });
        } else {
            consumerservice.login(this.state.mobile, this.state.password).then(response => {
                if (response.responseCode == 'RESPONSE_OK') {
                    window.location.href = '/machine/list';
                }
            });
        }

    }
}

export default LoginPage
