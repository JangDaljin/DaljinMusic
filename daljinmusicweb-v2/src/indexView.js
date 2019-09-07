import React , { Component } from 'react'
import './indexView.css'

import { connect } from 'react-redux'
import * as Actions from './actions/login'
class IndexView extends Component {
    
    constructor (props) {
        super(props)

        this.onLoginButtonClick = this.onLoginButtonClick.bind(this)
        this.doIdChange = this.doIdChange.bind(this)
        this.doPwChange = this.doPwChange.bind(this)
    }

    onLoginButtonClick = (e) => {
        e.preventDefault()
        const userid = this.props.userid
        const userpw = this.props.userpw

        const data = {
            'userid' : userid,
            'userpw' : userpw
        }

        const req = { 
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST'
            
        }

        fetch('http://localhost:8888/login' , req)
        .then(res => res.json())
        .then(json =>  {
            console.log(json)
            if(json.isOK === true) {
                console.log("OK");
                this.props.history.push('/music');
            }
        })
        .catch(err => console.log(err))
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
        userid : state.Login.userid,
        userpw : state.Login.userpw
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleUserIdChange : (id) => { dispatch(Actions.useridChange(id))},
        handleUserPwChange : (pw) => { dispatch(Actions.userpwChange(pw))}
    }
}




export default connect(mapStateToProps , mapDispatchToProps)(IndexView)