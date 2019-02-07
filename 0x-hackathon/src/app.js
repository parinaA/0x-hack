import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'babel-polyfill';
import Routers from './components/Router';

ReactDOM.render(<Routers />, document.getElementById('app'));

