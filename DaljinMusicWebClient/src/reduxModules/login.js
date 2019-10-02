import { createAction , handleActions } from 'redux-actions'

export const FETCH_LOGIN = 'login/FETCH_LOGIN'
export const ACCEPT_LOGIN = 'login/ACCEPT_LOGIN'
export const ABORT_LOGIN = 'login/ABORT_LOGIN'

export const fetchLogin = createAction(FETCH_LOGIN)
export const acceptLogin = createAction(ACCEPT_LOGIN)
export const abortLogin = createAction(ABORT_LOGIN)


const initialState = {
    isAuthenticated : false,
    token : '',
}

export default handleActions({
    [ACCEPT_LOGIN] : (state , action) => {
        const newState = { ...state }
        
        if(action.payload.authenticated === true) {
            newState.isAuthenticated = true;
            newState.token = false;
        }
        
        return newState
    },
    [ABORT_LOGIN] : (state , action) => {
        const newState = { ...state }
        newState.isAuthenticated = false;
        return newState
    },
  
} , initialState)
