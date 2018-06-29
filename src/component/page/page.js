import React from 'react'

import {Route} from 'react-router-dom'

import LoginPage from '../login/login_page'
import Register from '../register/register_page';
import NetworkConfig from '../confignetwork/network'
import DeviceInit from "../init/init";

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
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/index" component={LoginPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={Register}/>
                <Route path="/init/:qrcode" component={DeviceInit}/>
                <Route exact path="/network/config" component={NetworkConfig}/>
            </div>
        );
    }
}

export default Page;