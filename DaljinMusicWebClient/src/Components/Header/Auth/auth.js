import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as authActions from '../../../ReduxModules/auth'


import classNames from 'classnames/bind'
import styles from './auth.css'
const cn = classNames.bind(styles)



class Auth extends Component {


    componentDidMount() {
        this.props.AuthActions.fetchIsLogged();
    }

    render () {
        return (
            <div className={cn('header-auth')}>
            {this.props.isAuthenticated ? 
                <div className={cn('auth-userinfo-wrap')}>
                    <div className={cn('auth-userinfo')}>

                        <div className={cn('auth-userinfo-icon-wrap')}>
                            <i className={cn('fas fa-user' , 'auth-userinfo-icon')}></i>
                        </div>

                        <div className={cn('auth-userinfo-text')}>
                            <p>안녕하세요. {this.props.userName}님.</p>
                        </div>

                    </div>

                    <div className={cn('auth-loginout-button')} onClick={() => {this.props.AuthActions.fetchLogout()}}>
                        
                        <p className={cn('loginout-text')}><i className="fas fa-sign-out-alt"></i><span> 로그아웃</span></p>
                    </div>

                </div>
                :
                <div className={cn('auth-before-login')}>
                    <Link to="/auth" className={cn('auth-loginout-button-wrap')}>
                            <div className={cn('auth-loginout-button')}>
                                <p className={cn('loginout-text')}><i className="fas fa-sign-in-alt"></i><span> 로그인</span></p>  
                            </div>
                    </Link>
                </div>
            }
            </div>
        )
    }
}



export default connect(
    (state) => ({
        isAuthenticated : state.auth.isAuthenticated,
        userName : state.auth.userName
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions , dispatch)
    })
    )(Auth);