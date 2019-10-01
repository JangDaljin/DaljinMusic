import React , { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './TopTenMusic.css'
const cn = classNames.bind(styles)

export default class TopTenMusic extends Component {
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
            },
            { 
                singer : "SINGER D" ,
                song : "SONG D" ,
                album : "ALBUM D"
            },
            { 
                singer : "SINGER E" ,
                song : "SONG E" ,
                album : "ALBUM E"
            },
            { 
                singer : "SINGER F" ,
                song : "SONG F" ,
                album : "ALBUM F"
            },
            { 
                singer : "SINGER G" ,
                song : "SONG G" ,
                album : "ALBUM G"
            },
            { 
                singer : "SINGER H" ,
                song : "SONG H" ,
                album : "ALBUM H"
            },
            { 
                singer : "SINGER I" ,
                song : "SONG I" ,
                album : "ALBUM I"
            },
            { 
                singer : "SINGER J" ,
                song : "SONG J" ,
                album : "ALBUM J"
            }
        ]

        return (
        
            <div className={cn('toptenmusic')}>

                <div className={cn('toptenmusic-title')}>
                    <p><i className="fas fa-fire" style={{color:'#F42'}}></i>&nbsp;실시간 차트&nbsp;<i className="fas fa-fire" style={{color:'#F42'}}></i></p>
                </div>


                <div className={cn('toptenmusic-list')}>
                        {
                            data.map(
                                (value , index) => (
                                    <div className={cn('toptenmusic-list-item')} key={index}>
                                        <div className={cn('toptenmusic-list-rank' , `rank${index+1}`)}>
                                            <p>{(index > 2)? `#${index+1}` : <i className="fas fa-medal"></i> }</p>
                                        </div>
                                        <div className={cn('toptenmusic-list-song')}>
                                            <p>{value.song}</p>
                                        </div>
                                        <div className={cn('toptenmusic-list-singer')}>
                                            <p>{value.singer}</p>
                                        </div>
                                        <div className={cn('toptenmusic-list-buttons')}>
                                            <div className={cn('toptenmusic-list-play' , 'toptenmusic-list-button')}><i className={cn('fas fa-play')}></i></div>
                                            <div className={cn('toptenmusic-list-addlist' , 'toptenmusic-list-button')}><i className={cn('fas fa-plus')}></i></div>
                                        </div>
                                    </div>
                                )
                            )
                        }
                </div>

            </div>

        
        )
    }
}