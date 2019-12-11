import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MusicPlayerActions from '../../../ReduxModules/musicPlayer'

import classNames from 'classnames/bind'
import style from './musicPlayerButton.css'

const cn = classNames.bind(style)

class MusicPlayerButton extends Component {
    render () {
        return (
            <div className={cn('musicplayer-button')} onClick={(e) => {
                this.props.MusicPlayerActions.show()
            }}>
                <div className={cn("fas fa-music")}><span>MUSICPLAYER</span></div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        show : state.musicPlayer.show
    }),
    (dispatch) => ({
        MusicPlayerActions : bindActionCreators(MusicPlayerActions , dispatch)
    })
)(MusicPlayerButton)