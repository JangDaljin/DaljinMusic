import React , { Component } from 'react'
import './indexView.css'

class IndexView extends Component {
    
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
                        <form>
                            <table>
                                <tr>
                                    <td>아이디</td>
                                    <td><input className="idbox" type="text" /></td>
                                    <td rowSpan="2"><button className="loginbutton"><i class="fas fa-sign-in-alt fa-2x"></i></button></td>
                                </tr>
                                <tr>
                                    <td>비밀번호</td>
                                    <td><input className="pwbox" type="password" /></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}




export default IndexView