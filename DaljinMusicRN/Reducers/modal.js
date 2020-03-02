import { createAction , handleActions } from 'redux-actions'
import { Map , List } from 'immutable'

export const MODAL_MYMUSICS_STATE_NAME = 'modalMyMusics'
export const MODAL_MYMUSICS_PARAM_NAME = 'modalMyMusicsParams'
export const MODAL_MYMUSICS_SHOW = 'modal/MYMUSICS_SHOW'
export const modalMyMusicsShow = createAction(MODAL_MYMUSICS_SHOW)
export const MODAL_MYMUSICS_HIDE = 'modal/MYMUSICS_HIDE'
export const modalMyMusicsHide = createAction(MODAL_MYMUSICS_HIDE)

export const MODAL_SIGNUP_STATE_NAME ='modalSignup'
export const MODAL_SIGNUP_SHOW = 'modal/SIGNUP_SHOW'
export const modalSignupShow = createAction(MODAL_SIGNUP_SHOW)
export const MODAL_SIGNUP_HIDE = 'modal/SIGNUP_HIDE'
export const modalSignupHide = createAction(MODAL_SIGNUP_HIDE)

const modalInitialState = {
    modalState : Map({
        [MODAL_MYMUSICS_STATE_NAME] : false,
        [MODAL_MYMUSICS_PARAM_NAME] : null,

        [MODAL_SIGNUP_STATE_NAME] : false,
    })
}

export const modalReducer = handleActions({
    [MODAL_MYMUSICS_SHOW] : (state , action) => {
        const newState = { ...state }
        newState.modalState = newState.modalState.set(MODAL_MYMUSICS_STATE_NAME , true)
        newState.modalState = newState.modalState.set(MODAL_MYMUSICS_PARAM_NAME , List().concat(action.payload.selectedMusicIds))
        return newState
    },
    [MODAL_MYMUSICS_HIDE] : (state , action) => {
        const newState = { ...state }
        newState.modalState = newState.modalState.set(MODAL_MYMUSICS_STATE_NAME , false)
        newState.modalState = newState.modalState.set(MODAL_MYMUSICS_PARAM_NAME , null) 
        return newState
    },

    [MODAL_SIGNUP_SHOW] : (state , action) => {
        const newState = { ...state }
        newState.modalState = newState.modalState.set(MODAL_SIGNUP_STATE_NAME , true)
        return newState
    },
    [MODAL_SIGNUP_HIDE] : (state , action) => {
        const newState = { ...state }
        newState.modalState = newState.modalState.set(MODAL_SIGNUP_STATE_NAME , false)
        return newState
    }
} , modalInitialState)