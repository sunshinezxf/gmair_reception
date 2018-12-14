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
                <Route exact path="/register" component={Register}/>
                <Route path="/init/:qrcode" component={DeviceInit}/>
                <Route exact path="/machine/list" component={MachineList}/>
                <Route path='/machine/detail/:qrcode' component={MachineDetail}/>
                <Route exact path="/network/config" component={NetworkConfig}/>
                <Route exact path="/personal/information" component={Person}/>
                <Route path="/machine/bind/:qrcode" component={DeviceBind}/>
                <Route path="/wechat/bind" component={WechatBind}/>
                <Route path="/machine/share/:qrcode" component={DeviceShare}/>
                <Route path="/qrcode/generate" component={QRCodeGen} />
                <Route path="/machine/operation/:qrcode" component={DeviceOperation}/>
            </div>
        );
    }
}

export default Page;