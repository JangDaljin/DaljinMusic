import React , { Component } from 'react'
import {
    BrowserRouter,
    Route
} from 'react-router-dom'
import IndexView from './Views/indexView'
import LoginView from './Views/loginView'
import MusicView from './Views/musicView'


class Router extends Component {

    render () {
        return (
            <BrowserRouter>
                <Route path="/" component={IndexView} />
                <Route path="/login" component={LoginView} />
                <Route path="/music" component={MusicView} />
            </BrowserRouter>
        )
    }
}

export default Router