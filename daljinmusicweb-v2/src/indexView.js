import React , { Component } from 'react'
import './indexView.css'

import { connect } from 'react-redux'


import * as Actions from './reduxmodules/login'

class IndexView extends Component {
    
    constructor (props) {
        super(props)

        this.onLoginButtonClick = this.onLoginButtonClick.bind(this)
        this.doIdChange = this.doIdChange.bind(this)
        this.doPwChange = this.doPwChange.bind(this)
    }

    componentDidMount () {
        if(this.props.isAuthenticated) {
            this.props.history.push('/music')
        }
    }

    componentDidUpdate (prevProps , prevState) {
        //console.log(this.props.isAuthenticated);
        if(this.props.isAuthenticated) {
            this.props.history.push('/music')
        }
    }

    

    onLoginButtonClick = (e) => {
        e.preventDefault()
        this.props.handleLogin()
    }

    doIdChange = (e) => {
        const value = e.target.value
        this.props.handleUserIdChange(value)
    }

    doPwChange = (e) => {
        const value = e.target.value
        this.props.handleUserPwChange(value)
    }

    render () {
        return (
            <div className="rootdiv">
                <div className="leftdiv">
                    <div className="logodiv">
                        <img alt="로고" src="daljin_logo_horizon.png" />
                    </div>
                </div>

                <div className="rightdiv">
                    <div className="formdiv">
                        <form method="post" action="/login">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>아이디</td>
                                        <td><input className="idbox" type="text" name="userid" onChange={this.doIdChange} /></td>
                                        <td rowSpan="2"><button className="loginbutton" onClick={this.onLoginButtonClick}><i className="fas fa-sign-in-alt fa-2x"></i></button></td>
                                    </tr>
                                    <tr>
                                        <td>비밀번호</td>
                                        <td><input className="pwbox" type="password" name="userpw" onChange={this.doPwChange} /></td>
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

const mapStateToProps = (state) => {
    return {
        userid : state.login.userid,
        userpw : state.login.userpw,
        isAuthenticated : state.login.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin : () => { dispatch(Actions.login())},
        handleUserIdChange : (id) => { dispatch(Actions.useridchange(id))},
        handleUserPwChange : (pw) => { dispatch(Actions.userpwchange(pw))}
    }
}




export default connect(mapStateToProps , mapDispatchToProps)(IndexView)