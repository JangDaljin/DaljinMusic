import React , { Component } from 'react'

import LoginForm from './LoginForm/loginForm'
import Logo from '../Header/Logo/logo'

import classNames from 'classnames/bind'
import styles from './authViewBody.css'
const cn = classNames.bind(styles)


export default class AuthViewBody extends Component {

    render () {
        return (

            <div className={cn('speaker-body')}>
                
                <div className={cn('background-shadow')}></div>
                
                <div className={cn('speaker-left')}>
                    <div className={cn('speaker' , 'speaker-small')}>
                        <div className={cn('speaker-outter')}>
                            <div className={cn('speaker-inner')}></div>
                        </div>
                    </div>

                    <div className={cn('speaker', 'speaker-big')}>
                        <div className={cn('speaker-outter')}>
                            <div className={cn('speaker-inner')}></div>
                        </div>
                    </div>
                </div>


                <div className={cn('speaker-center')}>
                    <div className={cn('speaker-center-top')}>
                        <div className={cn('speaker-center-top-top')}>
                            <Logo />
                        </div>
                        <div className={cn('speaker-center-top-bottom')}>
                            <LoginForm />
                        </div>
                        
                    </div>
                    <div className={cn('speaker-center-bottom')}>
                        <ul className={(cn('speaker-buttons'))}>
                            <li className={cn('speaker-button' , 'PREV')}><p><i className="fas fa-backward"></i>PREV</p></li>
                            <li className={cn('speaker-button' , 'START')}><p><i className="fas fa-play"></i>START</p></li>
                            <li className={cn('speaker-button' , 'PAUSE')}><p><i className="fas fa-pause"></i>PAUSE</p></li>
                            <li className={cn('speaker-button' , 'STOP')}><p><i className="fas fa-stop"></i>STOP</p></li>
                            
                            <li className={cn('speaker-button' , 'STOP')}><p><i className="fas fa-forward"></i>NEXT</p></li>
                            <li className={cn('speaker-button' , 'VOLUME')}></li>
                        </ul>
                    </div>
                </div>

                <div className={cn('speaker-right')}>
                    <div className={cn('speaker' , 'speaker-small')}>
                        <div className={cn('speaker-outter')}>
                            <div className={cn('speaker-inner')}></div>
                        </div>
                    </div>

                    <div className={cn('speaker', 'speaker-big')}>
                        <div className={cn('speaker-outter')}>
                            <div className={cn('speaker-inner')}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}