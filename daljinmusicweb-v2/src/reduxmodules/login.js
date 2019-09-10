import { createAction , handleActions } from 'redux-actions'

const LOGIN = 'login/LOGIN'
const USERIDCHANGE = 'login/USERIDCHANGE'
const USERPWCHANGE = 'login/USERPWCHANGE'

const FETCH_LOGIN = 'FETCH_LOGIN'



export const login = createAction(LOGIN)
export const useridchange = createAction(USERIDCHANGE) // id
export const userpwchange = createAction(USERPWCHANGE) // pw
export const fetchLogin = createAction(FETCH_LOGIN)

const initialState = {
    userid : '',
    userpw : '',
    isAuthenticated : false,
}

export default handleActions({
    [LOGIN] : (state , action) => {
        const newState = { ...state }
        
        if(action.payload.isOK === true) {
            newState.isAuthenticated = true;
        }
        
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
