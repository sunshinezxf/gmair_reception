import React from 'react'

import gmair_blue from '../../material/logo/gmair_blue.png'

import 'antd-mobile/dist/antd-mobile.css'

import {InputItem, Button, WhiteSpace} from 'antd-mobile';

const LoginPage = () => (
    <div className="gmair_page">
        <div className="gmair_logo_area">
            <img src={gmair_blue} className="gmair_logo" alt="gmair_logo"></img>
        </div>
        <div className="gmair_logo_slogan">果麦新风，唤醒新鲜空气</div>
        <div>
            <InputItem type="phone" placeholder="请输入手机号码">手机号码</InputItem>
            <InputItem placeholder="请输入动态密码" extra={<a>发送</a>}>短信验证</InputItem>
        </div>
        <WhiteSpace />
        <Button type="primary">登录</Button>
    </div>
)

export default LoginPage