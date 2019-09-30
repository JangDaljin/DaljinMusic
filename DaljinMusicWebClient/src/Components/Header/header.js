import React , { Component } from 'react'


import Logo from './Logo/logo'
import Search from './Search/search'
import Navigator from './Navigator/navigator'
import Auth from './Auth/auth'

import MusicPlayer from '../MusicPlayer/musicPlayer'


import styles from './header.css'
import classNames from 'classnames/bind'
const cn = classNames.bind(styles)

class Header extends Component {


    render () {
        return (
            <div className={cn('header-root')}>
                <Logo />
                
                <Navigator />

                <Search />

                <Auth />

                <MusicPlayer />
            </div>
        )
    }


}

export default Header;