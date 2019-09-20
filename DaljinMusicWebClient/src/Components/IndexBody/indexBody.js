import React , { Component } from 'react'

import TodayMusic from './TodayMusic/todayMusic'
import SuggestMusic from './SuggestMusic/suggestMusic'

import classNames from 'classnames/bind'
import styles from './indexBody.css'
const cn = classNames.bind(styles)

class IndexBody extends Component {




    render () {
        return (
            <div className={cn('indexbody')}>
                
                <div className={cn('first')}>
                    <TodayMusic />
                </div>
                
                <div className={cn('second')}>
                    <div className={cn('second-left')}>
                        <SuggestMusic />
                    </div>
                    <div className={cn('second-right')}>
                        
                    </div>
                </div>
                
            </div>
        )
    }
}


export default IndexBody;