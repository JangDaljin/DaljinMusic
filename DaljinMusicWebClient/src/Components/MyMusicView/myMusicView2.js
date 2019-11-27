import React , { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as myMusicAction from '../../ReduxModules/myMusic'

import classNames from 'classnames/bind'
import style from './myMusicView2.css'
const cn = classNames.bind(style)

class MyMusicView extends Component {

    componentDidUpdate () {

    }

    componentDidUpdate () {

    }



}

export default connect(
    (state) => ({
        myMusicLists : state.myMusic.myMusicLists,
        currentSelectedListIndex : state.myMusic.currentSelectedListIndex,
        userId : state.auth.userId,
        isAuthenticated : state.auth.isAuthenticated,
        authMonitor : state.auth.monitor,
    }),
    (dispatch) => ({
        MyMusicActions : bindActionCreators(myMusicAction , dispatch)
    })
)(withRouter(MyMusicView))