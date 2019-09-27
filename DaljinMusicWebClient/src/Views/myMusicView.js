import React , { Component } from 'react'

import Header from '../Components/Header/header'
import MyMusicViewBody from '../Components/MyMusicViewBody/myMusicViewBodyc'

export default class MyMusicView extends Component {


    render () {
        return (
            <div>
                <Header />
                <MyMusicViewBody />
            </div>
        )
    }
}