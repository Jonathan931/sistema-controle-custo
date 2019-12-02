import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import { boot } from './boot';

boot();
ReactDOM.render(<App />, document.getElementById('root'));
