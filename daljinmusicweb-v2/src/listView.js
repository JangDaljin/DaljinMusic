import React , { Component } from 'react'
import styles from './listView.css'
import classNames from 'classnames/bind'
const cn = classNames.bind(styles)

class ListView extends Component {


    render () {

        return(
            <div className={cn('topdiv')}>
                <div className={cn('albumlistdiv')}>
                    <ul className={cn('albumlist')}>
                        <li>Album1</li>
                        <li>Album2</li>
                        <li>Album3</li>
                    </ul>
                </div>

                <div className={cn('hidescroll')}>
                    <div className={cn('musiclistdiv scrollable')}>
                        <ul className={cn('musiclist')}>
                            <li>list1</li>
                            <li>list2</li>
                            <li>list3</li>
                            <li>list4</li>
                            <li>list5</li>
                        </ul>
                    </div>
                </div>

                <div className={cn('menulistdiv')}>
                    <ul className={cn('menulist')}>
                        <li>button1</li>
                        <li>button2</li>
                        <li>button3</li>
                    </ul>
                </div>
            </div>

        )

    }



}

export default ListView;