import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as musicActions from './reduxModules/music'

import styles from './musicPlayer.css'
import classNames from 'classnames/bind'
const cn = classNames.bind(styles)

class MusicPlayer extends Component {


    render () {
        return (
            <div className={cn('musicplayer-wrap')}>
                <div className={cn('musicplayer')}>
                    <div className={cn('musicplayer-left')}>
                        <div className={cn('musicplayer-album-wrap')}>
                            <img className={cn('musicplayer-album-img')} src="twice.jpg" alt="아직없음" />
                        </div>
                        <div className={cn('musicplayer-title-wrap')}>
                            <h1>가수 - 노래제목</h1>
                        </div>
                    </div>
                    <div className={cn('musicplayer-right')}>
                        <div className={(cn('musicplayer-prev' , 'musicplayer-button'))}>
                            <i className="fas fa-backward fa-3x"></i>
                        </div>
                        <div className={(cn('musicplayer-pausenstart' , 'musicplayer-button'))}>
                            <i className={cn('fas fa-play-circle fa-3x', {'hidden' : this.props.isPlaying})}></i>
                            <i className={cn('fas fa-pause-circle fa-3x',{'hidden' : !this.props.isPlaying})}></i>
                        </div>
                        <div className={(cn('musicplayer-next' , 'musicplayer-button'))}>
                            <i className="fas fa-forward fa-3x"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(    
    (state) => ({
        isPlaying: state.music.isPlaying,
        previous : state.music.previous,
        current : state.music.current,
        next : state.music.next
    }), 
    (dispatch) => ({
        MusicActions : bindActionCreators(musicActions, dispatch)
    }))(MusicPlayer);