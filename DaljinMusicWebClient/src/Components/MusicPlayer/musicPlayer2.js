import React , { Component } from 'react'
import { connect } from 'react-redux'
import * as musicPlayerActions from '../../ReduxModules/musicPlayer'
import { bindActionCreators } from 'redux'



import classNames from 'classnames/bind'
import style from './musicPlayer2.css'
const cn = classNames.bind(style)

const mmss = (value) => {
    const m = parseInt(value / 60)
    const s = Math.round(value % 60)

    return `${m}:${s < 10 ? '0'+s : s}`
}

class MusicPlayer extends Component {

    state = {
        progressDraging : false
    }

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

    onClickPlay = (_index , _duration) => {
        let index , duration

        if(typeof _index == 'undefined') {
            index = this.props.currentMusicIndex
        }
        else {
            index = _index
        }

        if(typeof _duration == 'undefined') {
            duration = 0;
        }
        else {
            duration = _duration
        }


        this.props.MusicPlayerActions.fetchPlayMusic({'index' : index , 'duration' : duration , '_id' : this.props.playList.getIn([index , '_id'])})
    }

    onClickPause = () => {
        this.props.MusicPlayerActions.fetchPauseMusic()
    }

    onClickListItemRemove = () => {

        this.props.MusicPlayerActions.fetchPlayListItemRemove({
            'userId' : this.props.userId ,
            'removeList' : this.props.playList.map((value , index) => { if(value.get('checked')) { return index } else { return -1 }}).filter(value => value !== -1).toJS()
        })
        
    }

    onClickListItmeAllCheck = () => {
        this.props.MusicPlayerActions.changeChecked()
    }

    onMouseDownProgressBar = (e) => {
        this.setState({progressDraging : true})    
    }

    onMouseUpProgressBar = (e) => {
        this.setState({progressDraging : false})    
    }

    onMouseMoveProgressBar = (e) => {
        e.stopPropagation()
        if(this.state.progressDraging) {
            console.log(e.nativeEvent.offsetX)
            this.progressball.style.setProperty('--progress-ball-left' , `${e.nativeEvent.offsetX}px`)
        }
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
                                <div className={cn('info-song')}>{this.props.playList.getIn([this.props.currentMusicIndex , 'song'])}</div>
                                <div className={cn('info-singer')}>{this.props.playList.getIn([this.props.currentMusicIndex , 'singer' , 'name'])}</div>
                                <div className={cn('info-album')}>{this.props.playList.getIn([this.props.currentMusicIndex , 'album' , 'name'])}</div>
                            </div>
                        </div>
                    

                        <div className={cn('progress')}>
                            <div className={cn('duration')}>{mmss(this.props.currentDuration)}</div>
                            <div className={cn('progress-bar')} 
                                
                            >
 
                                <div className={cn('progress-ball')} ref={ref => this.progressball = ref}>

                                </div>

                                <div className={cn('progress-panel')} onMouseDown={this.onMouseDownProgressBar}
                                onMouseUp={this.onMouseUpProgressBar}
                                onMouseMove={this.onMouseMoveProgressBar}
                                onMouseOut={this.onMouseUpProgressBar}>

                                </div>
                            </div>
                            <div className={cn('duration')}>{mmss(this.props.playList.getIn([this.props.currentMusicIndex , 'duration']))}</div>
                        </div>

                        <div className={cn('buttons')}>
                                <div className={cn("button fas fa-fast-backward")}></div>
                                {this.props.isPlaying ?
                                    <div className={cn("button fas fa-pause")} onClick={(e) => this.onClickPause() }></div>
                                    :
                                    <div className={cn("button fas fa-play")} onClick={(e) => this.onClickPlay() }></div>
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
                                        <div className={cn('list-item-text')} onClick={(e) => { this.onClickPlay(index) }}>
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
                            <div className={cn("button fas fa-tasks")} onClick={this.onClickListItmeAllCheck}><span>전체선택</span></div>
                            <div className={cn("button fas fa-trash")} onClick={this.onClickListItemRemove}><span>선택삭제</span></div>
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