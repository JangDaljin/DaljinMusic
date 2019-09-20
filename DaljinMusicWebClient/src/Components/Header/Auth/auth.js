import React , { Component } from 'react'
import { connect } from 'react-redux'

import classNames from 'classnames/bind'
import styles from './auth.css'
const cn = classNames.bind(styles)



class Auth extends Component {


    render () {

        const userInfo = (
            <div className={cn('auth-userinfo')}>
                <div className={cn('auth-userinfo-icon-wrap')}>
                    <i className={cn('fas fa-user' , {'auth-userinfo-icon' : this.props.isAuthenticated})}></i>
                </div>
                <div className={cn('auth-userinfo-text')}>
                    {this.props.isAuthticated? <p>Hello. XXX sir.</p> : <p>Sorry. after Login.</p> }
                </div>
            </div>
        )
        
        return (
            <div className={cn('header-auth')}>

                {userInfo}

                <div className={cn('auth-login-button')}>
                    <i className="far fa-address-card fa-2x"></i>
                    <p className={cn('loginout-text')}>{this.props.isAuthenticated? 'LOGOUT' : 'LOGIN'}</p>
                </div>


            </div>
        )
    }
}



export default connect(
    (state) => ({
        isAuthenticated : state.login.isAuthenticated,
        userid : state.login.userid
    }))(Auth);