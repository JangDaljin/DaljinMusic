import React , { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './todayMusic.css'
const cn = classNames.bind(styles)



export default class TodayMusic extends Component {



    render () {

        const todayMusicImg = {
            backgroundImage: `url('twice.jpg')`
        }

        return (
          <div className={cn('todaymusic')}>

            <div className={cn('todaymusic-title')}>
                <p>#오늘의 라이브</p>
            </div>
            
            <div className={cn('todaymusic-img')} style={todayMusicImg}>

            </div>

            <div className={cn('todaymusic-info')}>
                <div className={cn('todaymusic-info-text')}>
                    <div className={cn('fixed')}><p>가수</p></div>
                    <div className={cn('nonfixed')}><p>Twice</p></div>
                    <div className={cn('fixed')}><p>제목</p></div>
                    <div className={cn('nonfixed')}><p>LIKE IT</p></div>
                    <div className={cn('fixed')}><p>앨범</p></div>
                    <div className={cn('nonfixed')}><p>미니1집</p></div>
                </div>
                <div className={cn('todaymusic-info-button')}>
                    <i className="fas fa-headphones fa-2x"></i>
                </div>
            </div> 
          </div>

        )
    }
}