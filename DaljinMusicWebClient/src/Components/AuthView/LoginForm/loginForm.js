import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as authActions from '../../../ReduxModules/auth'
import { withRouter } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './loginForm.css'
import { bindActionCreators } from 'redux'
const cn = classNames.bind(styles)


class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userId : '',
            userPw : ''
        }
    }

    componentDidUpdate (prevProps , prevState) {
        
        if(this.props.isAuthenticated === true) {
            this.props.history.push('/home')
        }
    }

    componentDidMount () {
        if(this.props.isAuthenticated === true) {
            this.props.history.push('/home')
        }
    }

    render () {
        return (
            <div className={cn('loginform')}>
                <div className={cn('loginform-left')}>
                    <div className={cn('loginform-id')}>
                        <input className={cn('loginform-id-input')} type='text' placeholder="아이디" onChange={(e)=> {this.setState({userId : e.target.value})}}/>
                    </div>

                    <div className={cn('loginform-pw')}>
                        <input className={cn('loginform-pw-input')} type='password' placeholder="비밀번호" onChange={(e)=> {this.setState({userPw : e.target.value})}} />
                    </div>
                </div>

                <div className={cn('loginform-right')}> 

                    <div className={cn('loginform-loginbutton')} onClick={()=> {this.props.AuthActions.fetchLogin({userId: this.state.userId , userPw:this.state.userPw})}}>
                        <i className="fas fa-sign-in-alt fa-3x"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        isAuthenticated : state.auth.isAuthenticated
    }),
    (dispatch) => ({
        AuthActions : bindActionCreators(authActions , dispatch)
    })
)(withRouter(LoginForm))