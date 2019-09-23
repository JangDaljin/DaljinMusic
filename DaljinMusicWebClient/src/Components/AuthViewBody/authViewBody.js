import React , { Component } from 'react'

import LoginForm from './LoginForm/loginForm'


import classNames from 'classnames/bind'
import styles from './authViewBody.css'
const cn = classNames.bind(styles)


export default class AuthViewBody extends Component {

    render () {
        return (

            <div className={cn('auth-background')}>

                <div className={cn('authviewbody')}>
                    <LoginForm />
                </div>

            </div>

        )
    }


}