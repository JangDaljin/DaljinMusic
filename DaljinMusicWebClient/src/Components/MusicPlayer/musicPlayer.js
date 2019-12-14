import React , { Component } from 'react'
import { connect } from 'react-redux'
import * as musicPlayerActions from '../../ReduxModules/musicPlayer'
import { bindActionCreators } from 'redux'

import classNames from 'classnames/bind'
import style from './musicPlayer.css'
const cn = classNames.bind(style)

const mmss = (value) => {
    let { m , s } = 0
    if(typeof value == 'number') {
        m = Math.floor(value / 60)
        s = Math.round(value % 60)
    }
    else {
        m = 0;
        s = 0;
    }

    return `${m}:${s < 10 ? '0'+s : s}`
}

class MusicPlayer extends Component {

    state = {
        progressDraging : false,
    }

    componentDidMount () {
        this.audio.ontimeupdate = () => {
            this.props.MusicPlayerActions.changeCurrentDuration(this.audio.currentTime)
        }

        this.audio.onended = () => {
            this.onClickNextMusic(this.props.currentMusicIndex)
        }

        document.addEventListener('keydown' , this.onKeyPress)
    }

    componentWillUnmount () {
        document.removeEventListener('keydown' , this.onKeyPress)
    }

    onKeyPress = (e) => {
        //ESC press
        switch(e.keyCode) {
            //ESC
            case 27 : 
                this.props.MusicPlayerActions.hide()
                break;
            //SPACE
            case 32 :
                if(this.props.isPlaying)
                    this.onClickPause()
                else {
                    this.onClickPlay()
                }
                break;
            default :
                break;
        }
    }

    componentDidUpdate(prevProps , prevState) {
        if(prevProps !== this.props) {
            if(prevProps.authMonitor && !this.props.authMonitor) {
                if(this.props.isAuthenticated) {
                    this.props.MusicPlayerActions.fetchGetPlayList({'userId' : this.props.userId})
                }
                else {
                    this.props.MusicPlayerActions.clearPlayList()
                    //this.props.MusicPlayerActions.changeCurrentMusicIndex(-1)
                }
            }

            //프로그래스 위치 조정(그래픽)
            if(prevProps.currentDuration !== this.props.currentDuration) {
                const progressballLeft = (this.props.currentDuration / this.props.playList.getIn([this.props.currentMusicIndex , 'duration'])) * 100
                this.progressball.style.setProperty('--progress-ball-left' , `${progressballLeft}%`)
            }

            //현재 재생 인덱스 변경되면 새노래 시작
            if(prevProps.currentMusicIndex !== this.props.currentMusicIndex) {
                this.audio.pause()
                if(this.props.currentMusicIndex === -1) {
                    this.audio.currentTime = 0
                    this.source.src = ''
                    this.props.MusicPlayerActions.pause()
                }
                else {
                    this.source.src =  `${process.env.REACT_APP_SERVER}/mymusic/playmusic?musicid=${this.props.playList.getIn([this.props.currentMusicIndex , '_id'])}`
                    this.audio.load()
                    this.audio.play()
                    this.props.MusicPlayerActions.play()
                }
            }

            //외부에서 원격명령
            if(prevProps.remote !== this.props.remote) {
                if(this.props.remote.get('play')) 
                    this.props.MusicPlayerActions.changeCurrentMusicIndex(this.props.addedIndex)
                
                if(this.props.remote.get('pause')) 
                    this.onClickPause()

                if(this.props.remote.get('next'))
                    this.onClickNextMusic()

                if(this.props.remote.get('prev'))
                    this.onClickPrevMusic()
                
                this.props.MusicPlayerActions.offRemote()
            }
        }
    }

    onClickPlay = () => {
        if(this.props.playList.size === 0) {
            //아무것도 안함.
        }
        else if(this.props.currentMusicIndex === -1) {
            let index = 0;
            if(this.props.playOption.get('random')) {
                index = this.props.randomPlayList.getIn([0 , 'index'])
            }
            this.props.MusicPlayerActions.changeCurrentMusicIndex(index)
        }
        else {
            this.audio.play()
            this.props.MusicPlayerActions.play()
        }
    }


    onClickPause = () => {
        this.audio.pause()
        this.props.MusicPlayerActions.pause()
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
        e.stopPropagation()
        this.calcSeekTime(e.nativeEvent.offsetX)
        this.setState({progressDraging : true})    
    }

    onMouseUpProgressBar = (e) => {
        e.stopPropagation()
        this.setState({progressDraging : false})
    }

    onMouseOutProgressBar = (e) => {
        if(this.state.progressDraging) {
            this.onMouseUpProgressBar(e)
        }
    }

    onMouseMoveProgressBar = (e) => {
        e.stopPropagation()
        if(this.state.progressDraging) {
            //console.log(e.nativeEvent.offsetX)
            this.calcSeekTime(e.nativeEvent.offsetX)
        }
    }

    calcSeekTime = (x) => {
        const width = this.progressbar.clientWidth
        const seekTime = parseInt((x / width) * this.props.playList.getIn([this.props.currentMusicIndex , 'duration']))

        this.props.MusicPlayerActions.changeCurrentDuration(seekTime)
        this.audio.currentTime = seekTime
    }

    onClickNextMusic = () => {
        if(this.props.currentMusicIndex === -1) return

        
        if(this.props.playOption.get('one')) {
            this.audio.currentTime = 0
        }
        else {
            let index;
            if(this.props.playOption.get('random')) {
                let randomIndex = this.props.playList.getIn([this.props.currentMusicIndex , 'randomIndex'])
                randomIndex = randomIndex + 1 >= this.props.randomPlayList.size ? this.props.playOption.get('loop') ? 0 : -1 : randomIndex + 1
                if(randomIndex === -1) 
                    index = -1;
                else
                    index = this.props.randomPlayList.getIn([randomIndex , 'index'])
                //console.log(`next : ${index}`)
            }
            else {
                index = this.props.currentMusicIndex + 1 >= this.props.playList.size ? this.props.playOption.get('loop') ? 0 : -1 : this.props.currentMusicIndex + 1
            }
            this.props.MusicPlayerActions.changeCurrentMusicIndex(index)
        }
        
    }

    onClickPrevMusic = () => {
        if(this.props.currentMusicIndex === -1) return

        
        if(this.props.playOption.get('one')) {
            this.audio.currentTime = 0
        }
        else {
            let index;
            if(this.props.playOption.get('random')) {
                let randomIndex = this.props.playList.getIn([this.props.currentMusicIndex , 'randomIndex'])
                randomIndex = randomIndex - 1 <= -1 ? this.props.playOption.get('loop') ? this.props.randomPlayList.size - 1 : -1 : randomIndex - 1
                if(randomIndex === -1)
                    index = -1
                else 
                    index = this.props.randomPlayList.getIn([randomIndex , 'index'])
                //console.log(`prev : ${index}`)
            }
    
            else {
                index = this.props.currentMusicIndex - 1 <= -1 ? this.props.playOption.get('loop') ? this.props.playList.size - 1 : -1 : this.props.currentMusicIndex - 1
            }
            this.props.MusicPlayerActions.changeCurrentMusicIndex(index)
        }

        
    }

    

    render () {
        return (
            <div className={cn('musicplayer-background' , {'musicplayer-show' : this.props.show} , {'musicplayer-hide' : !this.props.show} )}>

                <div className={cn('musicplayer-close-button')} onClick={(e) => { this.props.MusicPlayerActions.hide()}}>
                    <i className="fas fa-times"></i>
                </div>

                <div className={cn('musicplayer')} onClick={(e) => e.stopPropagation()}>
                    <div className={cn('controller')}>

                        <div className={cn('info')}>
                            <div className={cn('img-wrap')}>
                                {this.props.currentMusicIndex !== -1 &&
                                    <div className={cn('img')} style={{backgroundImage:`url('${this.props.playList.getIn([this.props.currentMusicIndex , 'album' , 'albumImgUri'])}')`}}>

                                    </div>
                                }
                            </div>
                            <div className={cn('info-text')}>
                                <div className={cn('info-song')}>{this.props.currentMusicIndex !== -1 && this.props.playList.getIn([this.props.currentMusicIndex , 'song'])}</div>
                                <div className={cn('info-singer')}>{this.props.currentMusicIndex !== -1 && this.props.playList.getIn([this.props.currentMusicIndex , 'singer' , 'name'])}</div>
                                <div className={cn('info-album')}>{this.props.currentMusicIndex !== -1 && this.props.playList.getIn([this.props.currentMusicIndex , 'album' , 'name'])}</div>
                            </div>
                        </div>
                    

                        <div className={cn('progress')}>
                            <audio ref={ref => this.audio = ref} autoPlay>
                                <source ref={ref => this.source = ref} src='' type="audio/mpeg" /> 
                            </audio>

                            <div className={cn('duration')}>{mmss(this.props.currentDuration)}</div>
                            <div className={cn('progress-bar')}>
 
                                <div className={cn('progress-ball')} ref={ref => this.progressball = ref}>

                                </div>

                                <div className={cn('progress-panel')}  ref={ref => this.progressbar = ref} onMouseDown={this.onMouseDownProgressBar}
                                onMouseUp={this.onMouseUpProgressBar}
                                onMouseMove={this.onMouseMoveProgressBar}
                                onMouseOut={this.onMouseOutProgressBar}>

                                </div>
                            </div>
                            <div className={cn('duration')}>{mmss(this.props.playList.getIn([this.props.currentMusicIndex , 'duration']))}</div>
                        </div>

                        <div className={cn('buttons')}>
                                <div className={cn("button fas fa-fast-backward")} onClick={(e) => this.onClickPrevMusic() }></div>
                                {this.props.isPlaying ?
                                    <div className={cn("button fas fa-pause")} onClick={(e) => this.onClickPause() }></div>
                                    :
                                    <div className={cn("button fas fa-play")} onClick={(e) => this.onClickPlay() }></div>
                                }
                                
                                <div className={cn("button fas fa-fast-forward")} onClick={(e) => this.onClickNextMusic()}></div>
                                
                        </div>

                        <div className={cn('buttons')}>
                            <div className={cn("button fas fa-sync" , { 'button-active' : this.props.playOption.get('loop') })} onClick={(e) => this.props.MusicPlayerActions.changePlayOption({'loop' : !this.props.playOption.get('loop')})}></div>
                            <div className={cn("button fas fa-sort-numeric-down" , { 'button-active' : this.props.playOption.get('one') })} onClick={(e) => this.props.MusicPlayerActions.changePlayOption({'one' : !this.props.playOption.get('one')})}></div>
                            <div className={cn("button fas fa-random" , { 'button-active' : this.props.playOption.get('random') })} onClick={(e) => this.props.MusicPlayerActions.changePlayOption({'random' : !this.props.playOption.get('random')})}></div>
                        </div>
                    </div>

                    <div className={cn('list')}>

                        <div className={cn('list-items')}>
                            {this.props.playList.map(
                                (value , index) => (
                                    <div key={index} className={cn('list-item')}>
                                        <div className={cn('list-item-text')} onClick={(e) => { this.props.MusicPlayerActions.changeCurrentMusicIndex(index) }}>
                                            {this.props.currentMusicIndex === index &&
                                                <i className={cn("far fa-play-circle" , "current-music-mark")}></i>
                                            }
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
        randomPlayList : state.musicPlayer.randomPlayList,
        playOption : state.musicPlayer.playOption,
        currentMusicIndex : state.musicPlayer.currentMusicIndex,
        currentDuration : state.musicPlayer.currentDuration,
        isPlaying : state.musicPlayer.isPlaying,
        show : state.musicPlayer.show,
        remote : state.musicPlayer.remote,
        musicPlayerMonitor : state.musicPlayer.monitor,
        addedIndex : state.musicPlayer.addedIndex
    }),
    (dispatch) => ({
        MusicPlayerActions : bindActionCreators(musicPlayerActions , dispatch)
    })
)(MusicPlayer)