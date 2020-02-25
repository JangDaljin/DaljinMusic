import React , { Component } from 'react'
import ModalMyMusics from './ModalMyMusics'
import { connect } from 'react-redux'
import * as ModalActions from '../../Reducers/modal'
import { bindActionCreators } from 'redux'

class Modal extends Component {
    render () {
        return (
            <React.Fragment>
                <ModalMyMusics show={this.props.modalState.get(ModalActions.MODAL_MYMUSICS_STATE_NAME)} onClose={() => { this.props.ModalActions.modalMyMusicsHide() }} />
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