import React , { Component } from 'react'


import classNames from 'classnames/bind'
import style00 from './authView2.css'
const cn = classNames.bind(style00)

class AuthView extends Component {

    render () {
        return (

            <div className={cn('background')}>
                <div className={cn('authview')}>

                    <div className={cn('form')}>
                        <input type="text" className={cn('id')} />
                        <input type="password" className={cn('pw')} />
                    </div>

                    <div className={cn('authview-buttons')}>
                        <div className={cn('button-wrap')}>
                            <div className={cn('signin')}>로그인</div>
                        </div>
                        <div className={cn('button-wrap')}>
                            <div className={cn('signup')}>회원가입</div>
                        </div>
                    </div>
                </div>
            </div>


        )

    }

}

export default AuthView