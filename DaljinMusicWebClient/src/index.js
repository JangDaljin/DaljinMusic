import * as serviceWorker from './serviceWorker';

import React from 'react'
import ReactDom from 'react-dom'
import { createStore , applyMiddleware } from 'redux'
import createSagaMiddleWare from 'redux-saga'
import { Provider } from 'react-redux'

import { rootReducer , rootSaga } from './ReduxModules/root'
import Router from './router'


const sagaMiddleWare = createSagaMiddleWare()

const store = createStore(rootReducer , applyMiddleware(sagaMiddleWare))

sagaMiddleWare.run(rootSaga)

ReactDom.render(
    <Provider store={store}>
        <Router />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
