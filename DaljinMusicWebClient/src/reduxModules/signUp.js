import { createAction , handleActions } from 'redux-actions'
import { takeLatest} from 'redux-saga/effects'
import { post } from './Request/request'

export const FETCH_SIGNUP = 'signup/FETCH_SIGNUP'
export const fetchSignUp = createAction(FETCH_SIGNUP)

export const ACCEPT_SIGNUP = 'signup/ACCEPT_SIGNUP'
export const acceptSignUp = createAction(ACCEPT_SIGNUP)

export const ABORT_SIGNUP = 'signup/ABORT_SIGNUP'
export const abortSignUp = createAction(ABORT_SIGNUP)

export const DUPL_ID_CHECK = 'signup/DUPL_ID_CHECK'
export const duplIdCheck = createAction(DUPL_ID_CHECK)

export const ACCEPT_ID_CHECK = 'signup/ACCEPT_ID_CHECK'
export const acceptIdCheck = createAction(ACCEPT_ID_CHECK)

export const ABORT_ID_CHECK = 'signup/ABORT_ID_CHECK'
export const abortIdCheck = createAction(ABORT_ID_CHECK)

export const CHANGED_ID = 'signup/ID_CHANGED'
export const changedId = createAction(CHANGED_ID)

export const TOAST_CLEAR = 'signup/TOAST_CLEAR'
export const toastClear = createAction(TOAST_CLEAR)

const signUpState = {
    idCheck : false,
    toastMessage : '',
    linkTo : ''
}

export const signUpReducer = handleActions({
    [ACCEPT_ID_CHECK] : (state , action) => {
        const newState = { ...state }
        const { isOk , message } = action.payload
        newState.idCheck = isOk
        newState.toastMessage = message
        return newState;
    },

    [ABORT_ID_CHECK] : (state , action) => {
        const newState = { ...signUpState }
        return newState;
    },

    [CHANGED_ID] : (state , action) => {
        const newState = { ...state }
        newState.idCheck = false
        return newState;
    },

    [TOAST_CLEAR] : (state , action) => {
        const newState = { ...state }
        newState.toastMessage = ''
        return newState
    },

    [ACCEPT_SIGNUP] : (state , action) => {
        const newState = { ...state }
        const { message , isOk } = action.payload
        newState.toastMessage = message
        if(isOk) {
            newState.linkTo = '/'
        }
        return newState
    },

    [ABORT_SIGNUP] : (state , action) => {
        const newState = { ...state }
        return newState
    }
} , signUpState)

function* fetchSignUpSaga (action) {
    //const { userId , userPw , userName } = action.payload
    yield post(`/signup` , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } ,  JSON.stringify(action.payload) , ACCEPT_SIGNUP , ABORT_SIGNUP)
}

function* duplIdCheckSaga (action) {
    yield post(`/signup/idcheck` , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } ,  JSON.stringify(action.payload) , ACCEPT_ID_CHECK , ABORT_ID_CHECK)
}


export function* signUpSaga() {
    yield takeLatest(FETCH_SIGNUP , fetchSignUpSaga)
    yield takeLatest(DUPL_ID_CHECK , duplIdCheckSaga)
}
