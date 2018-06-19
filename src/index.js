import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gmair from './gmair';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Gmair/>, document.getElementById('root'));

registerServiceWorker();
