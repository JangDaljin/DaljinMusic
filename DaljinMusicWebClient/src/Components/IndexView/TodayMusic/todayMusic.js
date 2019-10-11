import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as todaysMusicActions from '../../../ReduxModules/todaysMusic'

import classNames from 'classnames/bind'
import styles from './todayMusic.css'
const cn = classNames.bind(styles)




class TodaysMusic extends Component {

    constructor(props) {
        super(props);
        props.TodaysMusicActions.fetchTodaysMusic()
    }

    render () {
        return (
          <div className={cn('todaymusic')}>

            <div className={cn('todaymusic-title')}>
                <p>#오늘의 라이브</p>
            </div>
            
            <div className={cn('todaymusic-img')} style={{backgroundImage : `url(${this.props.albumImgUri})`}}>

            </div>

            <div className={cn('todaymusic-info')}>
                <div className={cn('todaymusic-info-text')}>
                    <div className={cn('fixed')}><p>가수</p></div>
                    <div className={cn('nonfixed')}><p>{this.props.singer}</p></div>
                    <div className={cn('fixed')}><p>제목</p></div>
                    <div className={cn('nonfixed')}><p>{this.props.song}</p></div>
                    <div className={cn('fixed')}><p>앨범</p></div>
                    <div className={cn('nonfixed')}><p>{this.props.album}</p></div>
                </div>
                <div className={cn('todaymusic-info-button')}>
                    <i className="fas fa-headphones fa-2x"></i>
                </div>
            </div> 
          </div>

        )
    }
}

export default connect(
    (state) => ({
        song : state.todaysMusic.song,
        singer : state.todaysMusic.singer,
        album : state.todaysMusic.album,
        albumImgUri : state.todaysMusic.albumImgUri
    }),
    (dispatch) => ({
        TodaysMusicActions : bindActionCreators(todaysMusicActions , dispatch)
    })
)(TodaysMusic)