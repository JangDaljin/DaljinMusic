import React , { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './searchResult.css'
const cn = classNames.bind(styles)

export default class searchResult extends Component {


    render () {
        return (
            <div className={cn('result')}>
                <div className={cn('title')}>{`${this.props.title}(${this.props.items.length})`}</div>

                <div className={cn('list')}>
                    {
                        this.props.items.map((value , index) => (
                            <div key={index} className={cn('list-item')}>

                                <div className={cn('list-item-img-wrap')}>
                                    <div className={cn('list-item-img')} style={{backgroundImage:`url('/twice.jpg')`}}>

                                    </div>
                                </div>

                                <div className={cn('list-item-info')}>
                                    <div className={cn('list-item-song')}>
                                        <p>{value.song}</p>
                                    </div>
                                    <div className={cn('list-item-singer')}>
                                        <p>{value.singer}</p>
                                    </div>
                                    <div className={cn('list-item-album')}>
                                        <p>{value.album}</p>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>

                <div className={cn('pages')}>
                    
                </div>
            </div>
        )
    }
}