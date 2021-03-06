import React , { Component } from 'react'
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom'
import IndexView from './Components/IndexView/indexView'
import AuthView from './Components/AuthView/authView2'
//import AuthView from './Components/AuthView/authView'
import Top100View from './Components/Top100View/top100View'
import MyMusicView from './Components/MyMusicView/myMusicView'
import SearchView from './Components/SearchView/searchView'
import ErrorView from './Components/ErrorView/errorView'
import Header from './Components/Header/header'
import SignUpView from './Components/SignUpView/signUpView'
import AdminView from './Components/AdminView/adminView2'
import MusicPlayer from './Components/MusicPlayer/musicPlayer'
import Modal from './Components/Modal/modal'
import MessageView from './Components/MessageView/messageView'
class Router extends Component {

    render () {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path="/" component={IndexView} />
                    <Route path="/top100" component={Top100View} />
                    <Route path="/mymusic" component={MyMusicView} />
                    <Route path="/search" component={SearchView} />
                    <Route path="/auth"  component={AuthView} />
                    <Route path="/signup" component={SignUpView} />
                    <Route path="/admin" component={AdminView} />
                    <Route component={ErrorView} />
                </Switch>
                <MusicPlayer />
                <Modal />
                {/*
                <MessageView />
                */}
            </BrowserRouter>
        )
    }
}

export default Router