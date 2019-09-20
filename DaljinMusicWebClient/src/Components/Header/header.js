import React , { Component } from 'react'

import styles from './header.css'
import classNames from 'classnames/bind'

import Logo from './Logo/logo'
import Search from './Search/search'
import Navigator from './Navigator/navigator'
import Auth from './Auth/auth'
const cn = classNames.bind(styles)

class Header extends Component {


    render () {
        return (
            <div className={cn('header-root')}>
                <Logo />
                
                <Navigator />

                <Search />

                <Auth />
            </div>
        )
    }


}

export default Header;