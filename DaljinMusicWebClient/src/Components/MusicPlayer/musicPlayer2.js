import React , { Component } from 'react'
import { Map , List , fromJS } from 'immutable'
import { connect } from 'react-redux'
import * as musicPlayerActions from '../../ReduxModules/musicPlayer'
import { bindActionCreators } from 'redux'



import classNames from 'classnames/bind'
import style from './musicPlayer2.css'
const cn = classNames.bind(style)

class MusicPlayer extends Component {

    componentDidUpdate(prevProps , prevState) {
        if(prevProps.authMonitor && !this.props.authMonitor) {
            if(this.props.isAuthenticated) {
                this.props.MusicPlayerActions.fetchGetPlayList({'userId' : this.props.userId})
            }
            else {
                this.props.MusicPlayerActions.clearPlayList()   
            }
        }
    }

    onClickPlay = () => {
        this.props.MusicPlayerActions.fetchPlayMusic()
    }

    onClickPause = () => {
        this.props.MusicPlayerActions.fetchPauseMusic()
    }

    render () {
        return (
            <div className={cn('musicplayer-background' , {'musicplayer-show' : this.props.show} , {'musicplayer-hide' : !this.props.show} )} onClick={(e) => {this.props.MusicPlayerActions.hide()}}>

                <div className={cn('musicplayer')} onClick={(e) => e.stopPropagation()}>
                    <div className={cn('controller')}>


                        <div className={cn('info')}>
                            <div className={cn('img-wrap')}>
                                <div className={cn('img')}>

                                </div>
                            </div>
                            <div className={cn('info-text')}>
                                <div className={cn('info-song')}>SONG</div>
                                <div className={cn('info-singer')}>SINGER</div>
                                <div className={cn('info-album')}>ALBUM</div>
                            </div>
                        </div>
                    

                        <div className={cn('progress')}>
                            <div className={cn('duration')}>00:00</div>
                            <div className={cn('progress-bar')}>
                                <div className={cn('progress-ball')}>

                                </div>
                            </div>
                            <div className={cn('duration')}>11:11</div>
                        </div>

                        <div className={cn('buttons')}>
                                <div className={cn("button fas fa-fast-backward")}></div>
                                {this.props.isPlaying ?
                                    <div className={cn("button fas fa-play")} onClick={this.onClickPause}></div>
                                    :
                                    <div className={cn("button fas fa-pause")} onClick={this.onClickPlay}></div>
                                }
                                
                                <div className={cn("button fas fa-fast-forward")}></div>
                                
                        </div>

                        <div className={cn('buttons')}>
                            <div className={cn("button fas fa-exchange-alt")}></div>
                            <div className={cn("button fas fa-sort-numeric-down")}></div>
                            <div className={cn("fas fa-random")}></div>
                        </div>
                    </div>

                    <div className={cn('list')}>

                        <div className={cn('list-items')}>
                            {this.props.playList.map(
                                (value , index) => (
                                    <div key={index} className={cn('list-item')}>
                                        <div className={cn('list-item-text')}>
                                            {value.getIn(['singer' , 'name'])} - {value.getIn(['song'])} - {value.getIn(['album' , 'name'])}
                                        </div>
                                        <div className={cn('list-item-check')}>
                                        {value.get('checked') ?
                                            <span className="far fa-check-circle checkbox" onClick={(e) => {e.stopPropagation(); this.props.MusicPlayerActions.changeChecked(index)} }></span>
                                            :
                                            <span className="far fa-circle checkbox" onClick={(e) => {e.stopPropagation(); this.props.MusicPlayerActions.changeChecked(index)} }></span>
                                        }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className={cn('list-buttons')}>
                            <div className={cn("button fas fa-trash")}><span>선택삭제</span></div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        userId : state.auth.userId,
        isAuthenticated : state.auth.isAuthenticated,
        authMonitor : state.auth.monitor,
        playList : state.musicPlayer.playList,
        playingOption : state.musicPlayer.playingOption,
        currentMusicIndex : state.musicPlayer.currentMusicIndex,
        currentDuration : state.musicPlayer.currentDuration,
        isPlaying : state.musicPlayer.isPlaying,
        show : state.musicPlayer.show
    }),
    (dispatch) => ({
        MusicPlayerActions : bindActionCreators(musicPlayerActions , dispatch)
    })
)(MusicPlayer)