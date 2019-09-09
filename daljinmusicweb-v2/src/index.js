import * as serviceWorker from './serviceWorker';

import React from 'react'
import ReactDom from 'react-dom'
import { createStore , applyMiddleware } from 'redux'
import createSagaMiddleWare from 'redux-saga'
import reducers from './reduxmodules';
import { Provider } from 'react-redux'

import { watchLogin } from './reduxmodules/loginsaga'

import App from './app'

const sagaMiddleWare = createSagaMiddleWare()

const store = createStore(reducers , applyMiddleware(sagaMiddleWare))

sagaMiddleWare.run(watchLogin)

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
