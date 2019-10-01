import React , { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './suggestMusic.css'
const cn = classNames.bind(styles)

export default class SuggestMusicList extends Component {

    render () {

        const data = [
            { 
                singer : "SINGER A" ,
                song : "SONG A" ,
                album : "ALBUM A"
            },
            { 
                singer : "SINGER B" ,
                song : "SONG B" ,
                album : "ALBUM B"
            },
            { 
                singer : "SINGER C" ,
                song : "SONG B" ,
                album : "ALBUM B"
            }
        ]
        return (
            <div className={cn('suggest-music')}>
                <div className="suggest-title">
                    <p>추천 음악</p>
                </div>
                <ul className={cn('suggest-music-list')}>
                    {
                        data.map((value , index) => (
                            <li key={index} className={cn('suggest-music-list-item')}>
                                <div className={cn('suggest-music-list-album-img')} style={{backgroundImage: `url('twice.jpg')`}}></div>
                                <div className={cn('suggest-music-list-info')}>
                                    <div className={cn('suggest-music-list-singer')}>{value.singer}</div>
                                    <div className={cn('suggest-music-list-song')}>{value.song}</div>
                                    <div className={cn('suggest-music-list-album')}>{value.album}</div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }

}