import React from 'react'

import {Card} from 'antd-mobile'

import Navigation from '../navigation/navigation'
import {consumerservice} from "../service/consumer.service";

import {Button, ButtonToolbar} from 'react-bootstrap'
import {util} from "../service/util";
import {wechatservice} from "../service/wechat.service";

const person_info_area = {
    width: `100%`,
    height: `100%`
}

const person_card = {
    marginTop: `1.5rem`
}

const personal_info_item = {
    height: `3rem`,
    width: `85%`,
    margin: `3rem 7.5%`,
    textAlign: `left`
}

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mobile: '',
            address: '',
            wechat: '',
            bind: false,
            appid: ''
        }
        this.init_config = this.init_config.bind(this);
        this.bind_wechat = this.bind_wechat.bind(this);
        this.unbind_wechat = this.unbind_wechat.bind(this);
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
                    this.setState({appid: result.appId});
                    window.wx.ready(() => {
                        window.wx.hideAllNonBaseMenuItem();
                    });
                }
            });
        } else {
            alert("seems that you are not in wechat")
        }
    }

    componentDidMount() {
        if (util.is_weixin()) {
            util.load_script("https://res.wx.qq.com/open/js/jweixin-1.2.0.js", () => {
                this.init_config();
            })
        }
        consumerservice.profile().then(response => {
                if (response.responseCode === 'RESPONSE_OK') {
                    let person = response.data;
                    console.log(person)
                    let address = (person.province == null ? '' : person.province) + (person.city == null ? '' : person.city) + (person.district === 'null' ? '' : person.district) + person.address;
                    this.setState({name: person.name, mobile: person.phone, address: address, wechat: person.wechat})
                    if (new String(this.state.wechat) !== null && this.state.wechat !== '') {
                        this.setState({bind: false})
                    } else {
                        this.setState({bind: true})
                    }
                }
                if (response.responseCode === 'RESPONSE_ERROR') {
                    window.location.href = '/login';
                    return;
                }
            }
        );
    }

    bind_wechat = () => {
        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.state.appid + "&redirect_uri=" + encodeURI('https://reception.gmair.net/wechat/bind') + "&response_type=code&scope=snsapi_base&state=gmair#wechat_redirect";
    }

    unbind_wechat = () => {
        consumerservice.unbind_wechat().then(response => {
            if (response.responseCode === 'RESPONSE_OK') {
                window.location.href = '/personal/information'
            }
        })
    }

    render() {
        return (
            <div style={person_info_area}>
                <Card style={person_card}>
                    <Card.Header title='个人信息' extra='...'></Card.Header>
                    <Card.Body>
                        <div style={personal_info_item}>
                            <span><i className='glyphicon glyphicon-user'></i></span>
                            {this.state.name}
                        </div>
                        <div style={personal_info_item}>
                            <span><i className='glyphicon glyphicon-phone'></i></span>
                            {this.state.mobile}
                        </div>
                        <div style={personal_info_item}>
                            <span><i className='glyphicon glyphicon-map-marker'></i></span>
                            {this.state.address}
                        </div>
                    </Card.Body>
                </Card>
                <div style={personal_info_item}>
                    <ButtonToolbar>
                        <Button bsStyle={this.state.bind === true ? "success" : "danger"} block
                                onClick={this.state.bind === true ? this.bind_wechat : this.unbind_wechat}>
                            {this.state.bind === true ? "绑定微信" : "解绑微信"}
                        </Button>
                    </ButtonToolbar>
                </div>
                <Navigation index={1}/>
            </div>
        )
    }
}

export default Person;