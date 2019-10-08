import React , { Component } from 'react'
import { connect } from 'react-redux'
import * as signUpActions from '../../ReduxModules/signUp'
import { bindActionCreators } from 'redux'

import classNames from 'classnames/bind'
import styles from './signUpView.css'
const cn = classNames.bind(styles)

class SignUpView extends Component {

    constructor (props) {
        super(props)
        this.state = {
            verifyPassword : false,
            verifyPasswordCheck : false,
            verifyNickName : false,
            
            verifiedId : '',
            userId : '',
            userPw : '',
            userPwCheck : '',
            userName : '',
        }
    }

    componentDidUpdate (prevProps , prevState) {
        if(this.props.toastMessage !== '') {
            window.alert(this.props.toastMessage)
            this.props.SignUpActions.toastClear()
        }
    }

    verifyId = (e) => {
        if(this.state.userId !== this.state.verifiedId) {
            this.props.SignUpActions.changedId()
        }
    }

    verifyPassword = (e) => {
        const regex = /^[A-Za-z0-9]{6,12}$/
        if(regex.test(this.state.userPw)) {
            this.setState({verifyPassword : true })
        }
        else {
            this.setState({verifyPassword : false })
        }

        this.verifyPasswordCheck()
    }

    verifyPasswordCheck = (e) => {
        if(this.state.userPw === this.state.userPwCheck && this.state.userPw !== '' && this.state.userPwCheck !== '') {
            this.setState({verifyPasswordCheck : true})
        }
        else {
            this.setState({verifyPasswordCheck : false})
        }
    }

    verifyNickName = (e) => {
        const regex = /.{2,8}$/
        if(regex.test(this.state.userName)) {
            this.setState({verifyNickName : true})
        }
        else {
            this.setState({verifyNickName : false})
        }
    }

    doIdCheck = (e) => {
        e.preventDefault();
        this.props.SignUpActions.duplIdCheck({ userId : this.state.userId})
    }


    doSingUp = (e) => {
        e.preventDefault()
        const {verifyPassword , verifyPasswordCheck , verifyNickName} = this.state
        if(this.props.idCheck && verifyPassword && verifyPasswordCheck && verifyNickName) {
            this.props.SignUpActions.fetchSignUp(this.state.userId , this.state.userPw , this.state.userName)
        }
    }

    render () {
        return (
            <div className={cn('viewbody')}>

                <div className={cn('wrap' , 'id-wrap')}>
                    <input type='text' placeholder="아이디" onBlur={this.verifyId} onChange={(e) => this.setState({userId : e.target.value})}/>
                    <input type='button' value="중복확인" onClick={this.doIdCheck} />
                </div>
                <div className={cn('verify' , { 'hidden' : this.props.idCheck})}>
                    <p><i className="fas fa-times"></i> 중복체크를 해주세요.</p>
                </div>


                <div className={cn('wrap')}>
                    <input type='password' placeholder="비밀번호" onBlur={this.verifyPassword} onChange={(e) => {this.setState({ userPw : e.target.value })}} />
                </div>
                <div className={cn('verify' , {'hidden' : this.state.verifyPassword })}>
                    <p><i className="fas fa-times"></i> 최소 특수문자 1개 필요</p>
                </div>


                <div className={cn('wrap')}>
                    <input type='password' placeholder="비밀번호확인" onBlur={this.verifyPasswordCheck} onChange={(e) => {this.setState({ userPwCheck : e.target.value })}}/>
                </div>
                <div className={cn('verify' , { 'hidden' : this.state.verifyPasswordCheck })}>
                    <p><i className="fas fa-times"></i> 비밀번호가 다릅니다.</p>
                </div>


                <div className={cn('wrap')}>
                    <input type='text' placeholder="닉네임" onBlur={this.verifyNickName} onChange={(e) => {this.setState({ userName : e.target.value })}}/>
                </div>
                <div className={cn('verify' , { 'hidden' : this.state.verifyNickName })}>
                    <p><i className="fas fa-times"></i> 특수문자가 포함되어있습니다.</p>
                </div>
                <div className={cn('wrap' , 'buttons')}>
                    <input type='button' value='가입하기' onClick={this.doSingUp} />
                </div>
            </div>
        )
    }
}


export default connect(
    (state) => ({
        idCheck : state.signUp.idCheck,
        toastMessage : state.signUp.toastMessage
    }),
    (dispatch) => ({
        SignUpActions : bindActionCreators(signUpActions , dispatch)
    })
)(SignUpView)