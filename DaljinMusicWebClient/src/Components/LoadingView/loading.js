import React , { Component } from 'react'


import classNames from 'classnames/bind'
import style from './loading.css'
const cn = classNames.bind(style)


class Loading extends Component {

    render () {
        return (
                <div className={cn('ring-wrap')}>
                    <div className={cn('ring')}>

                        LOADING

                    </div>
                </div>
        )
    }
}

export default Loading