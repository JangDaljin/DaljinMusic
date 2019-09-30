import React , { Component } from 'react'
import { withRouter } from 'react-router-dom'

import styles from './logo.css'
import classNames from 'classnames/bind'
const cn = classNames.bind(styles)

class Logo extends Component {
    render () {
        return (
            <div className={cn('header-logo')} onClick={() => { this.props.history.push('/')}}>
                <img className={cn('header-logo-img')} src="/daljin_logo_horizon.png" alt="로고" />
            </div>
        )
    }
}

export default withRouter(Logo)