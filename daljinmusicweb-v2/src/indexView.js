import React , { Component } from 'react'
import './indexView.css'

class IndexView extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
            userid : '',
            userpw : '',
            isOK : '대기'
        }
        this.onLoginButtonClick = this.onLoginButtonClick.bind(this)
        this.doIdChange = this.doIdChange.bind(this)
        this.doPwChange = this.doPwChange.bind(this)
    }

    onLoginButtonClick = (e) => {
        e.preventDefault()
        const userid = this.state.userid
        const userpw = this.state.userpw
        
        const req = { 
            body : {
                'userid' : userid,
                'userpw' : userpw
            },
            headers : {
                'contentType' : 'json'
            },
            method : 'POST'
            
        }

        fetch('http://localhost:8888/login' , req)
        .then(res => res.json())
        .then(json =>  {
            console.log(json)
            this.setState({isOK : json.isOK})}
            )
        .catch(err => console.log(err))
    }

    doIdChange = (e) => {
        const value = e.target.value
        this.setState({userid: value})
    }

    doPwChange = (e) => {
        const value = e.target.value
        this.setState({userpw: value}) 
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
                                    <tr>
                                        <td>TEST</td>
                                        <td>{this.state.isOK}</td>
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




export default IndexView