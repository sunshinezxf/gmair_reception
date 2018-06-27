import React from 'react'

import {Route} from 'react-router-dom'

import LoginPage from '../login/login_page'
import Register from "../register/register_page";

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
            </div>
        );
    }
}

export default Page;