import { createAction , handleActions } from 'redux-actions'
import { Map } from 'immutable'

export const MODAL_MYMUSICS_STATE_NAME = 'modalMyMusics'
export const MODAL_MYMUSICS_SHOW = 'modal/MYMUSICS_SHOW'
export const modalMyMusicsShow = createAction(MODAL_MYMUSICS_SHOW)
export const MODAL_MYMUSICS_HIDE = 'modal/MYMUSICS_HIDE'
export const modalMyMusicsHide = createAction(MODAL_MYMUSICS_HIDE)


const modalInitialState = {
    modalState : Map({
        [MODAL_MYMUSICS_STATE_NAME] : false
    })
}

export const modalReducer = handleActions({
    [MODAL_MYMUSICS_SHOW] : (state , action) => {
        const newState = { ...state }
        newState.modalState = newState.modalState.set(MODAL_MYMUSICS_STATE_NAME , true)
        return newState
    },
    [MODAL_MYMUSICS_HIDE] : (state , action) => {
        const newState = { ...state }
        newState.modalState = newState.modalState.set(MODAL_MYMUSICS_STATE_NAME , false)
        return newState
    },
} , modalInitialState)