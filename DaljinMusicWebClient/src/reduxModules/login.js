import { createAction , handleActions } from 'redux-actions'

export const FETCH_LOGIN = 'login/FETCH_LOGIN'
export const ACCEPT_LOGIN = 'login/ACCEPT_LOGIN'
export const ABORT_LOGIN = 'login/ABORT_LOGIN'
export const USERIDCHANGE = 'login/USERIDCHANGE'
export const USERPWCHANGE = 'login/USERPWCHANGE'

export const fetchLogin = createAction(FETCH_LOGIN)
export const acceptLogin = createAction(ACCEPT_LOGIN)
export const abortLogin = createAction(ABORT_LOGIN)
export const userIdChange = createAction(USERIDCHANGE) // id
export const userPwChange = createAction(USERPWCHANGE) // pw


const initialState = {
    userid : '',
    userpw : '',
    isAuthenticated : false,
}

export default handleActions({
    [ACCEPT_LOGIN] : (state , action) => {
        const newState = { ...state }
        
        if(action.payload.isOK === true) {
            newState.isAuthenticated = true;
        }
        
        return newState
    },
    [ABORT_LOGIN] : (state , action) => {
        const newState = { ...state }
        newState.isAuthenticated = false;
        return newState
    },
    [USERIDCHANGE] : (state, action) => {
        const newState = { ...state }
        newState.userid = action.payload
        return newState
    },
    [USERPWCHANGE] : (state , action) => {
        const newState = { ...state }
        newState.userpw = action.payload
        return newState
    }
} , initialState)
