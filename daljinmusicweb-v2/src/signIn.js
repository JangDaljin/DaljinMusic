import React , { Component } from 'react'
import './signIn.css'


class SignIn extends Component {

    render() {
        <div className="maindiv">
            <form className="mainform" method="post" action="/login">
                <table className="maintable">
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td><input className="idinput" type="text" /></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td><input className="pwinput" type="password" /></td>
                        </tr>
                        <tr>
                            <td><input className="signinbutton" type="button" value="접속" /></td>
                            <td><input className="signupbutton" type="button" value="인증신청" /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    }
}

export default SignIn