import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import className from 'classnames/bind'
import styles from './navigator.css'
const cn = className.bind(styles)

class Navigator extends Component {


    render () {

        return (
            <ul className={cn('header-navigator')}>
                <Link to='/home' className={cn(`navigator-item`)}><p><i className="fas fa-home"></i> 홈</p></Link>
                <Link to='/top100' className={cn(`navigator-item`)}><p><i className="fas fa-trophy"></i> TOP 100</p></Link>
                <Link to='/mymusic' className={cn(`navigator-item`)}><p><i className="fas fa-headphones-alt"></i> 내음악</p></Link>
            </ul>
        )

    }




}

export default Navigator;