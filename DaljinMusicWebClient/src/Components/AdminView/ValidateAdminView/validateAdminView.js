import React , { Component } from 'react'

import * as AdminActions from '../../../ReduxModules/admin'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import classNames from 'classnames/bind'
import style from './validateAdminView.css'
const cn = classNames.bind(style)


class ValidateAdminView extends Component {

    state = {
        plainPassword : ''
    }


    onChangeAdminLoginPassword = (e) => {
        this.setState({'plainPassword' : e.target.value})
    }

    onClickAdminLogin = () => {
        this.props.AdminActions.fetchValidatePassword({'password' : this.state.plainPassword})
        this.setState({'plainPassword' : ''})
    }


    render () {
        return (

            <div className={cn('valiedate-admin-view')}>
                <div className={cn("fas fa-lock fa-2x" , 'lock-icon')}></div>
                <input type="password" placeholder="비밀번호" onChange={this.onChangeAdminLoginPassword}/>
                <div className={cn("far fa-arrow-alt-circle-right fa-2x" , 'admin-enter')} onClick={this.onClickAdminLogin} ></div>
            </div>

        )
    }
}





export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        AdminActions : bindActionCreators(AdminActions , dispatch)
    })
)(ValidateAdminView)