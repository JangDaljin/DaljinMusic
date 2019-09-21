import React , { Component } from 'react'

import TodayMusic from './TodayMusic/todayMusic'
import SuggestMusic from './SuggestMusic/suggestMusic'
import HotnNewMusic from './HotnNewMusic/hotnNewMusic'
import TopTenMusic from './TopTenMusic/TopTenMusic'

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
                    <div className={cn('second-first')}>
                        <SuggestMusic />
                    </div>
                    <div className={cn('second-second')}>
                        <HotnNewMusic />
                    </div>
                    <div className={cn('second-third')}>
                        <TopTenMusic />
                    </div>
                </div>
                
            </div>
        )
    }
}


export default IndexBody;