import React , { Component } from 'react'
import styles from './loginView.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import * as loginActions from '../ReduxModules/login'

const cn = classNames.bind(styles);



class IndexView extends Component {
    
    constructor (props) {
        super(props)

        this.onLoginButtonClick = this.onLoginButtonClick.bind(this)
        this.doIdChange = this.doIdChange.bind(this)
        this.doPwChange = this.doPwChange.bind(this)
    }
        

    componentDidUpdate (prevProps , prevState) {
        //console.log(this.props.isAuthenticated);
        if(this.props.isAuthenticated) {
            this.props.history.push('/music')
        }
    }

    

    onLoginButtonClick = (e) => {
        e.preventDefault()
        const { LoginActions } = this.props
        LoginActions.fetchLogin()
    }

    doIdChange = (e) => {
        const value = e.target.value
        const { LoginActions } = this.props

        LoginActions.userIdChange(value)
    }

    doPwChange = (e) => {
        const value = e.target.value
        const { LoginActions } = this.props
        LoginActions.userPwChange(value)
    }

    render () {
        return (
            <div className={cn('rootdiv')}>
                <div className={cn('leftdiv')}>
                    <div className={cn('logodiv')}>
                        <img alt="로고" src="daljin_logo_horizon.png" />
                    </div>
                </div>

                <div className={cn('rightdiv')}>
                    <div className={cn('formdiv')}>
                        <form method="post" action="/login">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>아이디</td>
                                        <td><input className={cn('idbox')} type="text" name="userid" onChange={this.doIdChange} /></td>
                                        <td rowSpan="2"><button className={cn('loginbutton')} onClick={this.onLoginButtonClick}><i className="fas fa-sign-in-alt fa-2x"></i></button></td>
                                    </tr>
                                    <tr>
                                        <td>비밀번호</td>
                                        <td><input className={cn('pwbox')} type="password" name="userpw" onChange={this.doPwChange} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

/*
const mapStateToProps = (state) => {
    return {
        userid : state.login.userid,
        userpw : state.login.userpw,
        isAuthenticated : state.login.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin : () => { dispatch(Actions.fetchLogin())},
        handleUserIdChange : (id) => { dispatch(Actions.useridchange(id))},
        handleUserPwChange : (pw) => { dispatch(Actions.userpwchange(pw))}
    }
}
*/



export default connect(
    (state) => ({
        userid : state.login.userid,
        userpw : state.login.userpw,
        isAuthenticated : state.login.isAuthenticated
    }), 
    (dispatch) => ({
        LoginActions : bindActionCreators(loginActions, dispatch)
    })
)(IndexView)