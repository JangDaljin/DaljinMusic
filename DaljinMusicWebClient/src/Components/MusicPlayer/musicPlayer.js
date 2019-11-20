import React , { Component } from 'react'
import PlayList from './playList'
import { connect } from 'react-redux'
import * as musicPlayerActions from '../../ReduxModules/musicPlayer'
import { bindActionCreators } from 'redux'


import styles from './musicPlayer.css'
import classNames from 'classnames/bind'
const cn = classNames.bind(styles)

const mmss = (value) => {
    const m = parseInt(value / 60)
    const s = value % 60

    return `${m}:${s < 10 ? '0'+s : s}`
}

class MusicPlayer extends Component {

    constructor(props) {
        super(props)


        this.state = {
            isShow : false,
            isShowPlayList : false,
            progressDraging : false,
        }
    }

    onProgressbarDown = (e) => {
        this.setState({progressDraging : true})
        this.onProgressMoving(e)
    }

    onProgressbarDrag = (e) => {
        if(this.state.progressDraging) {
            this.onProgressMoving(e)
        }
    }

    onProgressbarUp = (e) => {
        this.setState({progressDraging : false})
    }

    onProgressMoving = (e) => {
        e.preventDefault()
        let x = e.nativeEvent.offsetX-10
        const width = this.progressbar.clientWidth - 20
        if(x < 0) { x = 0 }
        else if( x > width) { x = width}

        const seekTime = parseInt((x / width) * this.props.playList.getIn([this.props.currentMusicIndex , 'duration']))
        this.props.MusicPlayerActions.changeCurrentDuration({duration : seekTime})
        this.progressbar.style.setProperty('--progressbar-left' , `${x}px`)
    }

    render () {
        return (
            <React.Fragment>
            <div className={cn('musicplayer-scroller' , { 'scroller-rotate' : this.state.isShow} , {'scroller-none' : !this.state.isShow})}>
                <div className={cn('fas fa-angle-up fa-2x')} onClick={(e) => { this.setState({isShow : !this.state.isShow})}}>
                </div> 
            </div>


            <div className={cn('musicplayer' , { 'musicplayer-down' : !this.state.isShow } , {'musicplayer-up' : this.state.isShow})}>
                <div className='controller'>
                    <div className='left'>
                            <div className='img-wrap'>
                                <div className='img' style={{backgroundImage:`url('${this.props.playList.getIn([this.props.currentMusicIndex , 'album' , 'albumImgUri'])}')`}}>

                                </div>
                            </div>

                            <div className='info'>

                                <div className='text'>
                                    
                                    <div>
                                        {this.props.playList.size > 0 &&
                                        <p>
                                            {this.props.playList.getIn([this.props.currentMusicIndex , 'singer' , 'name'])}
                                            -
                                            {this.props.playList.getIn([this.props.currentMusicIndex , 'song'])}
                                            -
                                            {this.props.playList.getIn([this.props.currentMusicIndex , 'album' , 'name'])}
                                        </p>
                                        }
                                    </div>
                                </div>

                                <div className='progress'>
                                    <span className='currenttime time'>{mmss(this.props.currentDuration)}</span>
                                    <div className='progressbar' ref={ ref => this.progressbar = ref} 
                                        onMouseDown={this.onProgressbarDown} 
                                        onMouseMove={this.onProgressbarDrag}
                                        onMouseUp={this.onProgressbarUp}
                                        onMouseLeave={this.onProgressbarUp}>
                                    </div>
                                    <span className='fulltime time'>{mmss(this.props.playList.getIn([this.props.currentMusicIndex , 'duration']))}</span>
                                </div>

                            </div>
                    </div>
                    <div className='center'>
                        <div className='buttons buttons1'>
                            <div className="button fas fa-fast-backward"></div>
                            <div className="button fas fa-pause"></div>
                            <div className="button fas fa-play"></div>
                            <div className="button fas fa-fast-forward"></div>
                        </div>
                        <div className='buttons buttons2'>
                            <div className="button fas fa-exchange-alt"></div>
                            <div className="button fas fa-sort-numeric-down"></div>
                        </div>
                            
                    </div>

                    <div className='right'>
                        <div className="fas fa-list fa-2x" onClick={(e) => { 
                            this.setState({isShowPlayList : !this.state.isShowPlayList}) }}></div>
                    </div>
                </div>

               
            <PlayList show={this.state.isShowPlayList} />
            </div>
            </React.Fragment>
        )
    }
}


export default connect(
    (state) => ({
        playList : state.musicPlayer.playList,
        playingOption : state.musicPlayer.playingOption,
        currentMusicIndex : state.musicPlayer.currentMusicIndex,
        currentDuration : state.musicPlayer.currentDuration,
    }),
    (dispatch) => ({
        MusicPlayerActions : bindActionCreators(musicPlayerActions , dispatch),
    })
)(MusicPlayer)