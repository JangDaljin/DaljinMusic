import React , { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../../ReduxModules/auth'
import { withRouter } from 'react-router-dom'

import classNames from 'classnames/bind'
import style00 from './authView2.css'
const cn = classNames.bind(style00)

class AuthView extends Component {

    state = {
        graphicInit : false,
        userId : '',
        userPw : '',
    }

    componentDidMount () {
        if(this.props.isAuthenticated === true) {
            this.props.history.push('/')
        }

        setTimeout(() => this.setState({ graphicInit : true }) , 500)
    }

    componentWillUnmount () {
        this.setState({ graphicInit : false })
    }

    componentDidUpdate (prevProps , prevState) {
        if(prevProps !== this.props) {
            if(this.props.isAuthenticated === true) {
                this.props.history.push('/')
            }
        }
    }

    render () {
        return (

            <div className={cn('background')}>
                <div className={cn('authview' , { 'show' : this.state.graphicInit })}>

                    <div className={cn('form')}>
                        <input type="text" className={cn('id')} placeholder="아이디"  onChange={(e)=> {this.setState({userId : e.target.value})}}/>
                        <input type="password" className={cn('pw')} placeholder="비밀번호" onChange={(e)=> {this.setState({userPw : e.target.value})}} />



                    </div>

                    <div className={cn('authview-buttons')}>
                        <button className={cn('signin')} onClick={(e)=> { this.props.AuthActions.fetchLogin({userId: this.state.userId , userPw:this.state.userPw})}}><i className="fas fa-sign-in-alt"></i> 로그인</button>
                        <button className={cn('signup')} onClick={(e)=> { this.props.history.push('/signup') }}><i className="far fa-address-card"></i> 회원가입</button>
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
)(withRouter(AuthView))