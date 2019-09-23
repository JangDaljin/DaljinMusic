import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './auth.css'
const cn = classNames.bind(styles)



class Auth extends Component {


    render () {

        return (
            <div className={cn('header-auth')}>

                <div className={cn('auth-userinfo-wrap')}>
                    {!this.props.isAuthticated &&
                        <div className={cn('auth-userinfo')}>
                            <div className={cn('auth-userinfo-icon-wrap')}>
                                <i className={cn('fas fa-user' , {'auth-userinfo-icon' : this.props.isAuthenticated})}></i>
                            </div>
                            <div className={cn('auth-userinfo-text')}>
                                <p>안녕하세요. {this.props.userid}님.</p>
                            </div>
                        </div>
                    }
                </div>

                <Link to="/auth" className={cn('auth-loginout-button-wrap')}>
                    <div className={cn('auth-loginout-button')}>
                        <i className="far fa-address-card fa-2x"></i>
                        <p className={cn('loginout-text')}>{this.props.isAuthenticated? '로그아웃' : '로그인'}</p>
                    </div>
                </Link>


            </div>
        )
    }
}



export default connect(
    (state) => ({
        isAuthenticated : state.login.isAuthenticated,
        userid : state.login.userid
    }))(Auth);