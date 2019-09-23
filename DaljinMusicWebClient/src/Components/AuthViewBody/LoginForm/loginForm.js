import React, { Component } from 'react'


import classNames from 'classnames/bind'
import styles from './loginForm.css'
const cn = classNames.bind(styles)


export default class LoginForm extends Component {

    render () {
        return (
            <div className={cn('loginform')}>
                <div className={cn('loginform-left')}>
                    <div className={cn('loginform-id')}>
                        <input className={cn('loginform-id-input')} type='text' placeholder="아이디" />
                    </div>

                    <div className={cn('loginform-pw')}>
                        <input className={cn('loginform-pw-input')} type='password' placeholder="비밀번호" />
                    </div>
                </div>

                <div className={cn('loginform-right')}>

                    <div className={cn('loginform-loginbutton')}>
                        <i className="fas fa-sign-in-alt fa-3x"></i>
                    </div>
                </div>
            </div>
        )
    }
}
