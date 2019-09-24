import React , { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './top100Body.css'
const cn = classNames.bind(styles)

export default class Top100Body extends Component {
    render () {


        const data = [];
        for(let i = 0 ; i < 3 ; i ++) {
            data.push({
                singer : `SINGER ${i}`,
                song : `SONG ${i}`,
                album : `ALBUM ${i}`
            })
        }

        return (
            <div className={cn('top100')}>
                <div className={cn('top100-left')}>
                    {
                        data.map((value , index) => (
                            <div key={index} className={cn('top100-list-item')}>
                                <div className={cn('top100-list-item-ranking')}>
                                    <p>#{index+1}</p>
                                </div>
                                <div className={cn('top100-list-item-img')}>
                                    <div className={cn('top100-list-item-album-img')} style={{backgroundImage:`url('twice.jpg')`}}>

                                    </div>
                                </div>

                                <div className={cn('top100-list-item-info')}>
                                    <div className={cn('top100-list-item-song')}>
                                        <p>{value.song}</p>
                                    </div>
                                    <div className={cn('top100-list-item-singer')}>
                                        <p>{value.singer}</p>
                                    </div>
                                    <div className={cn('top100-list-item-album')}>
                                        <p>{value.album}</p>
                                    </div>
                                </div>
                                
                                <div className={cn('top100-list-item-buttons')}>
                                    <input type="button" value='Play' />
                                    <input type="button" value='Add List' />
                                </div>

                            </div>
                        ))
                    }
                </div>

                <div className={cn('top100-right')}>
                    

                </div>

            </div>
        )
    }
}
