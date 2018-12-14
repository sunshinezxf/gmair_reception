import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gmair from './gmair';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider} from 'react-redux';
import reducer from './reducers/index';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

let store=createStore(reducer);
ReactDOM.render(<Provider store={store}><LocaleProvider locale={zhCN}><Gmair/></LocaleProvider></Provider>, document.getElementById('root'));

registerServiceWorker();
