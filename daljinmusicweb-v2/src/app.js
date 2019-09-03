import React , { Component } from 'react'
import {
    BrowserRouter,
    Route
} from 'react-router-dom'

import IndexView from './indexView'
import MusicView from './musicView'


class app extends Component {

    render () {
        return (
        <BrowserRouter>
            <Route exact path="/" component={IndexView} />
            <Route path="/music" component={MusicView} />
        </BrowserRouter>
        )
    }
}

export default app