import React , { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './musicPlayer.css'
const cn = classNames.bind(styles)


export default class MusicPlayer extends Component {
    render () {
        return (
            <div className={cn('musicplayer')}>
                
                <div className={cn('top-wrap')}>
                    <div className={cn('img-wrap')}>
                        <div className={cn('img')} style={{backgroundImage:`url('/twice.jpg')`}}></div>
                    </div>
                    <div className={cn('info')}>
                        <div className={cn('singer')}>
                            <p>SINGER</p>
                        </div>
                        <div className={cn('song')}>
                            <p>SONG</p>
                        </div>
                    </div>
                    <div className={cn('buttons')}>
                        <div className={cn('button')}>
                            <div className={cn('prev')}>
                                <i className="fas fa-fast-forward"></i>
                            </div>
                            <div className={cn('play')}>
                                <i className="fas fa-play"></i>
                            </div>
                            <div className={cn('pause')}>
                                <i className="fas fa-pause"></i>
                            </div>
                            <div className={cn('next')}>
                                <i className="fas fa-fast-forward"></i>
                            </div>
                        </div>
                        <div className={cn('musicplayer-list-up')}>
                            <i className="fas fa-angle-down fa-2x"></i>
                        </div>
                    </div>
                </div>

                <div className={cn('bottom-wrap')}>

                    <div className={cn('musicplayer-list')}>
                        
                    </div>

                </div>

            </div>
        )
    }
}