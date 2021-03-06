import React from 'react'

import {Route} from 'react-router-dom'

import LoginPage from '../login/login_page'
import Register from '../register/register_page';
import NetworkConfig from '../confignetwork/network'
import DeviceInit from '../init/init';
import MachineList from '../machine/machinelist';
import MachineDetail from "../machine/machinedetail";
import Person from '../personal/person'
import DeviceBind from '../bind/devicebind'
import WechatBind from '../bind/wechatbind'
import DeviceShare from '../machine/deviceshare'
import QRCodeGen from '../qrcode/generate'
import DeviceOperation from '../../containers/machine/operation'
import FanContent from '../../containers/fan/fanContent'
import PersonAdjust from '../personal/person_adjust'
import FreshPanel from '../../containers/fresh/fresh_panel'
import DeviceList from '../machine/devicelist'
import UserList from '../machine/userList'

const gmair_page = {
    width: `100%`,
    height: `100%`,
    backgroundSize: `100% 100%`
}

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={gmair_page}>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/index" component={LoginPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route path="/authorize/:portal" component={LoginPage}/>
                <Route exact path="/register" component={Register}/>
                <Route path="/init/:qrcode" component={DeviceInit}/>
                <Route exact path="/machine/list" component={DeviceList}/>
                {/*<Route exact path="/device/list" component={DeviceList}/>*/}
                <Route path='/machine/detail/:qrcode' component={MachineDetail}/>
                <Route path='/fresh/detail/:qrcode' component={FreshPanel}/>
                <Route exact path="/network/config" component={NetworkConfig}/>
                <Route exact path="/personal/information" component={Person}/>
                <Route exact path="/personal/adjust" component={PersonAdjust}/>
                <Route path="/machine/bind/:qrcode" component={DeviceBind}/>
                <Route path="/wechat/bind" component={WechatBind}/>
                <Route path="/machine/share/:qrcode" component={DeviceShare}/>
                <Route path="/qrcode/generate" component={QRCodeGen}/>
                <Route path="/machine/operation/:qrcode" component={DeviceOperation}/>
                <Route path="/fan/detail/:qrcode" component={FanContent}/>
                <Route path="/machine/userList/:qrcode" component={UserList}/>
            </div>
        );
    }
}

export default Page;
