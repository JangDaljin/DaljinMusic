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
            
            <div className={cn('todaymusic-img')} style={{backgroundImage : `url('${this.props.music.getIn(['album' , 'albumImgUri'])}')`}}>

            </div>

            <div className={cn('todaymusic-info')}>
                <div className={cn('todaymusic-info-text')}>
                    <div className={cn('fixed')}><p>가수</p></div>
                    <div className={cn('nonfixed')}><p>{this.props.music.getIn('singer' , 'name')}</p></div>
                    <div className={cn('fixed')}><p>제목</p></div>
                    <div className={cn('nonfixed')}><p>{this.props.music.get('song')}</p></div>
                    <div className={cn('fixed')}><p>앨범</p></div>
                    <div className={cn('nonfixed')}><p>{this.props.album.getIn('album' , 'name')}</p></div>
                </div>
            </div> 

          </div>

        )
    }
}

export default connect(
    (state) => ({
        music : state.todaysMusic.music,
    }),
    (dispatch) => ({
        TodaysMusicActions : bindActionCreators(todaysMusicActions , dispatch)
    })
)(TodaysMusic)