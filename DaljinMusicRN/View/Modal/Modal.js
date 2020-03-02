import React , { Component } from 'react'

import ModalMyMusics from './ModalMyMusics'
import ModalSignup from './ModalSignup'

import { connect } from 'react-redux'
import * as ModalActions from '../../Reducers/modal'
import { bindActionCreators } from 'redux'

class Modal extends Component {
    render () {
        return (
            <React.Fragment>
                
                <ModalMyMusics 
                show={this.props.modalState.get(ModalActions.MODAL_MYMUSICS_STATE_NAME)} 
                onClose={() => { this.props.ModalActions.modalMyMusicsHide() }} 
                selectedMusicIds={this.props.modalState.get(ModalActions.MODAL_MYMUSICS_PARAM_NAME)} />

                <ModalSignup
                show={this.props.modalState.get(ModalActions.MODAL_SIGNUP_STATE_NAME)}
                onClose={() => { this.props.ModalActions.modalSignupHide() }} />

            </React.Fragment>
        )
    }
}


export default connect(
    state => ({
        modalState : state.modal.modalState
    }),
    dispatch => ({
        ModalActions : bindActionCreators(ModalActions , dispatch)
    })
)(Modal)