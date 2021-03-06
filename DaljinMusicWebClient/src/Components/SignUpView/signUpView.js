import React , { Component } from 'react'
import { connect } from 'react-redux'
import * as signUpActions from '../../ReduxModules/signUp'
import { withRouter } from 'react-router-dom'
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

            buttonActive : false
        }
    }

    componentDidUpdate (prevProps , prevState) {
        if(this.props.toastMessage !== '') {
            window.alert(this.props.toastMessage)
            this.props.SignUpActions.toastClear()
        }

        if(this.props.linkTo !== prevProps.linkTo) {
            this.props.history.push(this.props.linkTo)
        }

        if(prevProps.idCheck === false &&  this.props.idCheck === true) {
            this.setState({verifiedId : this.state.userId , buttonActive : this.state.verifyNickName && this.state.verifyPassword && this.state.verifyPasswordCheck})
        }
    }

    verifyId = (e) => {
        if(this.state.userId !== this.state.verifiedId) {
            this.props.SignUpActions.changedId()
        }
    }

    verifyPassword = (e) => {
        const regex = /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()\-+=]{1,50})(?=.*[a-zA-Z]{1,50}).{8,50}$/;
        if(regex.test(this.state.userPw)) {
            this.setState({verifyPassword : true , buttonActive : this.state.verifyNickName && this.state.verifyPasswordCheck && this.props.idCheck})
        }
        else {
            this.setState({verifyPassword : false , buttonActive : false})
        }
    }

    verifyPasswordCheck = (e) => {
        if(this.state.userPw === this.state.userPwCheck && this.state.userPw !== '' && this.state.userPwCheck !== '') {
            this.setState({verifyPasswordCheck : true , buttonActive : this.state.verifyNickName && this.state.verifyPassword && this.props.idCheck})
        }
        else {
            this.setState({verifyPasswordCheck : false , buttonActive : false })
        }
    }

    verifyNickName = (e) => {
        const regex = /^(?=.*\w{0,8})(?=.*[가-힣]{0,8}).{2,8}$/;
        if(regex.test(this.state.userName)) {
            this.setState({verifyNickName : true , buttonActive : this.state.verifyPassword && this.state.verifyPasswordCheck && this.props.idCheck})
        }
        else {
            this.setState({verifyNickName : false , buttonActive : false})
        }
    }

    isVertifyComplete = () => {
        const {verifyPassword , verifyPasswordCheck , verifyNickName} = this.state
        if(this.props.idCheck && verifyPassword && verifyPasswordCheck && verifyNickName) {
            this.setState({buttonActive : true})
        }
        else {
            this.setState({buttonActive : false})
        }
        
    }

    doIdCheck = (e) => {
        e.preventDefault();
        const regex = /^\w{6,20}$/;
        if(regex.test(this.state.userId)) {

            this.props.SignUpActions.duplIdCheck({ userId : this.state.userId})
        }
        else {
            window.alert('영어 및 숫자 6자리 이상')
        }
    }


    doSingUp = (e) => {
        e.preventDefault()
        const {verifyPassword , verifyPasswordCheck , verifyNickName} = this.state
        if(this.props.idCheck && verifyPassword && verifyPasswordCheck && verifyNickName) {
            console.log('sign up check complete')
            this.props.SignUpActions.fetchSignUp({userId : this.state.verifiedId , userPw : this.state.userPw , userName : this.state.userName})
        }
        else {
            console.log('sign up check unlcomplete')
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
                    <p><i className="fas fa-times"></i> 영문,숫자,특수문자 포함 8자리 이상</p>
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
                    <p><i className="fas fa-times"></i> 한글,영어,숫자 2자리~8자리 </p>
                </div>
                <div className={cn('wrap' , 'buttons')}>
                    <input className={cn({'active-color' : this.state.buttonActive})} type='button' value='가입하기' onClick={(e) => { this.state.buttonActive? this.doSingUp(e) : console.log('검증 미완료') }} />
                </div>
            </div>
        )
    }
}


export default connect(
    (state) => ({
        idCheck : state.signUp.idCheck,
        toastMessage : state.signUp.toastMessage,
        linkTo : state.signUp.linkTo
    }),
    (dispatch) => ({
        SignUpActions : bindActionCreators(signUpActions , dispatch)
    })
)(withRouter(SignUpView))