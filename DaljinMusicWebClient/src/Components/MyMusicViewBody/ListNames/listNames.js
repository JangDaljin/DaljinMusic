import React , { Component } from 'react'

import classNames from 'classnames/bind'
import styles from './listNames.css'
const cn = classNames.bind(styles)


export default class ListName extends Component {

    render () {
        return (
            <div>
                {
                    this.props.listNames.map(
                                (value , index) => (
                                    <div key={index} className={cn('mymusic-list-item-wrap')}>
                                        <div className={cn('mymusic-list-item')}>
                                            <p>{value}</p>
                                        </div>
                                    </div>
                                )
                            )
                }
            </div>
        )
    }
}