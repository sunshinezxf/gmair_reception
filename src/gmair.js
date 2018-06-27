import React, {Component} from 'react';

import Page from './component/page/page'

import {BrowserRouter} from 'react-router-dom'


class Gmair extends Component {
    render() {
        return (
            <BrowserRouter>
                <Page></Page>
            </BrowserRouter>
        );
    }
}

export default Gmair;
