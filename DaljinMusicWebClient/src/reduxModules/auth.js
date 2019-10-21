import { createAction , handleActions } from 'redux-actions'
import { takeLatest} from 'redux-saga/effects'
import Config from '../config'
import { post } from './Request/request'

export const FETCH_LOGIN = 'auth/FETCH_LOGIN'
export const fetchLogin = createAction(FETCH_LOGIN)

export const ACCEPT_LOGIN = 'auth/ACCEPT_LOGIN'
export const acceptLogin = createAction(ACCEPT_LOGIN)

export const ABORT_LOGIN = 'auth/ABORT_LOGIN'
export const abortLogin = createAction(ABORT_LOGIN)


export const FETCH_LOGOUT = 'auth/FETCH_LOGOUT'
export const fetchLogout = createAction(FETCH_LOGOUT)

export const ACCEPT_LOGOUT = 'auth/ACCEPT_LOGOUT'
export const acceptLogout = createAction(ACCEPT_LOGOUT)

export const ABORT_LOGOUT = 'auth/ABORT_LOGOUT'
export const abortLogout = createAction(ABORT_LOGOUT)

export const CHECK_LOGGED = 'auth/CHECK_LOGGED'
export const checkLogged = createAction(CHECK_LOGGED)

export const ALREADY_LOGGED = 'auth/ALREADY_LOGGED'
export const alreadyLogged = createAction(ALREADY_LOGGED)


const initialState = {
    userId : '',
    userName : '',
    isAuthenticated : false,
}

export const authReducer = handleActions({
    [ACCEPT_LOGIN] : (state , action) => {
        const newState = { ...state }

        const { userId , userName , isAuthenticated } = action.payload
        newState.userId = userId
        newState.userName = userName
        newState.isAuthenticated = isAuthenticated
        
        return newState
    },
    [ABORT_LOGIN] : (state , action) => {
        const newState = { ...initialState }
        return newState
    },
    [ACCEPT_LOGOUT] : (state , action) => {
        const newState = { ...state }
        const { userId , userName , isAuthenticated } = action.payload
        newState.userId = userId
        newState.userName = userName
        newState.isAuthenticated = isAuthenticated
        return newState
    },
    [ABORT_LOGOUT] : (state , action) => {
        const newState = { ...initialState }
        return newState
    },
    [ALREADY_LOGGED] : (state , action) => {
        const newState = { ...state }
        const { userId , userName , isAuthenticated } = action.payload
        newState.userId = userId
        newState.userName = userName
        newState.isAuthenticated = isAuthenticated
        return newState
    },
} , initialState)


function* fetchLoginSaga (action) {
    //const state = yield select() //'redux-saga/effects'
    yield post(`${Config.SERVER}/auth/login` , { 'Content-Type' : 'application/json', 'Accept':  'application/json' , 'Cache' : 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_LOGIN , ABORT_LOGIN )
}

function* fetchLogoutSaga(action) {
    yield post(`${Config.SERVER}/auth/logout` , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache' : 'no-cache' } , JSON.stringify({}) , ACCEPT_LOGOUT , ABORT_LOGOUT )
} 

function* checkLoggedSaga() {
    yield post(`${Config.SERVER}/auth/islogged` , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache' : 'no-cache' } , JSON.stringify({}) , ALREADY_LOGGED , '')
}


export function* authSaga() {
    yield takeLatest(FETCH_LOGIN , fetchLoginSaga)
    yield takeLatest(FETCH_LOGOUT , fetchLogoutSaga)
    yield takeLatest(CHECK_LOGGED , checkLoggedSaga)
}

