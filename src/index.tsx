import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './service-worker';
import { Provider } from 'react-redux';

import { store } from './store';
import { api } from './api';

import App from './app';

(window as any)['api'] = api;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
