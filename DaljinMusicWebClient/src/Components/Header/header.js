import React , { Component } from 'react'


import Logo from './Logo/logo'
import Search from './Search/search'
import Navigator from './Navigator/navigator'
import Auth from './Auth/auth'



import styles from './header.css'
import classNames from 'classnames/bind'
const cn = classNames.bind(styles)

class Header extends Component {

    headerResize = () => {
        document.documentElement.style.setProperty('--headerheight' , `${this.headerRoot.clientHeight}px`)
    }

    componentDidMount() {
        this.headerResize()
        window.addEventListener('resize', this.headerResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize' , this.headerResize)
    }

    render () {
        return (
            <div className={cn('header-root')} ref={ref => this.headerRoot = ref}>
                <Logo />
                
                <Navigator />

                <Search />

                <Auth />
            </div>
        )
    }


}

export default Header;