import React , { Component } from 'react'
import {
    BrowserRouter,
    Route
} from 'react-router-dom'
import IndexView from './Views/indexView'
import AuthView from './Views/authView'
import Top100View from './Views/top100View'

class Router extends Component {

    render () {
        return (
            <BrowserRouter>
                <Route exact path="/" component={IndexView} />
                <Route path="/home" component={IndexView} />
                <Route path="/top100" component={Top100View} />
                <Route path="/mymusic" component={IndexView} />
                <Route path="/othermusic" component={IndexView} />
                <Route path="/auth"  component={AuthView} />
            </BrowserRouter>
        )
    }
}

export default Router