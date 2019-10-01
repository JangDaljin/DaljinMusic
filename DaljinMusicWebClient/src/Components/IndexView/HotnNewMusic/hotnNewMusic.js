import React , { Component } from 'react'


import classNames from 'classnames/bind'
import styles from './hotnNewMusic.css'
const cn = classNames.bind(styles)



export default class HotnNewMusic extends Component {


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
                song : "SONG C" ,
                album : "ALBUM C"
            }
        ]

        return (
            <div className={cn('hotnnewmusic')}>
                <div className={cn('hotnnewmusic-title')}>
                    <span style={{color:'#FF5A5A'}}>HOT</span><span style={{color:'#9887b9'}}>&nbsp;&&nbsp;</span><span style={{color:'#069'}}>NEW</span>
                </div>

                <div className={cn('hotnnewmusic-content')}>
                    <div className={cn('hotnnewmusic-left')}>
                        <div className={cn('hotnnewmusic-album-img')} style={{backgroundImage: `url('twice.jpg')`}}>

                        </div>
                    </div>

                    <div className={cn('hotnnewmusic-right')}>
                        <div className={cn('hotnnewmusic-list')}>
                            {
                                data.map(
                                    (value , index) => (
                                        <div className={cn('hotnnewmusic-list-item' , { 'hot' : true } , { 'new' : false })} key={index}>
                                            <div className={cn('hotnnewmusic-list-item-info')}>
                                                <div className={cn('hotnnewmusic-list-item-singer')}><p>{value.singer}</p></div>
                                                <div className={cn('hotnnewmusic-list-item-song')}><p>{value.song}</p></div>
                                            </div>
                                        </div> 
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}