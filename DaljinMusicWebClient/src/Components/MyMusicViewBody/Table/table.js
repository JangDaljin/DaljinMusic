import React , { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './table.css'
const cn = classNames.bind(styles)

export default class MyMusicTable extends Component {
    


    render () {
        return (
            <div className={cn('mymusic-table')}>
                <div className={cn('mymusic-table-header')}>
                    <div className={cn('mymusic-table-number', 'table-vertical-line')}><p>No</p></div>
                    <div className={cn('mymusic-table-song' , 'table-vertical-line')}><p>제목</p></div>
                    <div className={cn('mymusic-table-singer' , 'table-vertical-line')}><p>가수</p></div>
                    <div className={cn('mymusic-table-time')}><p>시간</p></div>
                </div>

                <div className={cn('mymusic-table-scrollable')}>
                    <div className={cn('mymusic-table-body')}>
                        {
                            this.props.musicList.items.map(
                                (value , index) => (
                                    <div key={index} className={cn('mymusic-table-items')}>
                                        <div className={cn('mymusic-table-number', 'table-vertical-line')}><p>{index+1}</p></div>
                                        <div className={cn('mymusic-table-song' , 'table-vertical-line')}><p>{value.song}</p></div>
                                        <div className={cn('mymusic-table-singer' , 'table-vertical-line')}><p>{value.singer}</p></div>
                                        <div className={cn('mymusic-table-time')}><p>{value.time}</p></div>
                                    </div>
                                )
                            )
                        }   
                    </div>
                </div>

            </div>
    )
    }
}