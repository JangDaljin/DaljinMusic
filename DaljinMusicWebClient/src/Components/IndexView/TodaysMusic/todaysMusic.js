import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as todaysMusicActions from '../../../ReduxModules/todaysMusic'
import * as MusicPlayerActions from '../../../ReduxModules/musicPlayer'
import classNames from 'classnames/bind'
import styles from './todaysMusic.css'
const cn = classNames.bind(styles)




class TodaysMusic extends Component {

    constructor(props) {
        super(props);
        props.TodaysMusicActions.fetchTodaysMusic()
    }

    play = () => {
        this.props.MusicPlayerActions.fetchPlayListItemAdd({'userId' : this.props.userId , 'addList' : [this.props.music.get('_id')] })

        //서버에서 응답 받을때까지 대기하고 재생
        const interval = setInterval(() => {
            if(!this.props.musicPlayerMonitor) {
                this.props.MusicPlayerActions.onRemote({'play' : true})
                clearInterval(interval)
            }
        } , 1000)
        
    }

    render () {
        return (
          <div className={cn('todaymusic')} onClick={(e) => { this.play() }}>

            <div className={cn('todaymusic-title')}>
                <p>#오늘의 라이브</p>
            </div>
            <div className={cn('todaymusic-img-wrap')}>
                <div className={cn('todaymusic-img')} style={{backgroundImage : `url('${this.props.music.getIn(['album' , 'albumImgUri'])}')`}}>
                </div>
            </div>

            <div className={cn('todaymusic-info')}>
                <div className={cn('todaymusic-info-text')}>
                    <div className={cn('fixed')}><p>가수</p></div>
                    <div className={cn('nonfixed')}><p>{this.props.music.getIn(['singer' , 'name'])}</p></div>
                    <div className={cn('fixed')}><p>제목</p></div>
                    <div className={cn('nonfixed')}><p>{this.props.music.get('song')}</p></div>
                    <div className={cn('fixed')}><p>앨범</p></div>
                    <div className={cn('nonfixed')}><p>{this.props.music.getIn(['album' , 'name'])}</p></div>
                </div>
            </div> 

          </div>

        )
    }
}

export default connect(
    (state) => ({
        userId : state.auth.userId,
        music : state.todaysMusic.music,
        musicPlayerMonitor : state.musicPlayer.monitor,
    }),
    (dispatch) => ({
        TodaysMusicActions : bindActionCreators(todaysMusicActions , dispatch),
        MusicPlayerActions : bindActionCreators(MusicPlayerActions , dispatch)
    })
)(TodaysMusic)