import { createAction , handleActions } from 'redux-actions'
import { takeLatest , put} from 'redux-saga/effects'
import { post } from './Request/request'

export const MONITOR = 'auth/MONITOR'
export const monitor = createAction(MONITOR)

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

export const FETCH_ISLOGGED = 'auth/FETCH_ISLOGGED'
export const fetchIsLogged = createAction(FETCH_ISLOGGED)

export const ACCEPT_ISLOGGED = 'auth/ACCEPT_ISLOGGED'
export const acceptIsLogged = createAction(ACCEPT_ISLOGGED)

export const ABORT_ISLOGGED = 'auth/ABORT_ISLOGGED'
export const abortIsLogged = createAction(ABORT_ISLOGGED)

const initialState = {
    userId : '',
    userName : '',
    isAuthenticated : false,
    monitor : true,
}

export const authReducer = handleActions({

    [MONITOR] : (state , action) => {
        const newState = { ...state }
        newState.monitor = action.payload
        return newState
    },

    [ACCEPT_LOGIN] : (state , action) => {
        const newState = { ...state }
        const { userId , userName , isAuthenticated , message } = action.payload
        newState.userId = userId
        newState.userName = userName
        newState.isAuthenticated = isAuthenticated

        if(message !== '' && message !== 'undefined') {
            window.alert(message)
        }
        
        return newState
    },
    [ABORT_LOGIN] : (state , action) => {
        const newState = { ...initialState }
        return newState
    },
    [ACCEPT_LOGOUT] : (state , action) => { 
        const newState = { ...initialState }
        return newState
    },
    [ABORT_LOGOUT] : (state , action) => {
        const newState = { ...state }
        return newState
    },
    [ACCEPT_ISLOGGED] : (state , action) => {
        const newState = { ...state }
        const { userId , userName , isAuthenticated } = action.payload
        newState.userId = userId
        newState.userName = userName
        newState.isAuthenticated = isAuthenticated
        return newState
    },
    [ABORT_ISLOGGED] : (state , action) => {
        const newState = { ...initialState }
        return newState
    },
} , initialState)


function* fetchLoginSaga (action) {
    yield put({type : MONITOR , payload : true})
    yield post(`/auth/login` , { 'Content-Type' : 'application/json', 'Accept':  'application/json' , 'Cache' : 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_LOGIN , ABORT_LOGIN )
    yield put({type : MONITOR , payload : false})
}

function* fetchLogoutSaga(action) {
    yield put({type : MONITOR , payload : true})
    yield post(`/auth/logout` , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache' : 'no-cache' } , JSON.stringify({}) , ACCEPT_LOGOUT , ABORT_LOGOUT )
    yield put({type : MONITOR , payload : false})
} 

function* fetchIsLoggedSaga() {
    yield put({type : MONITOR , payload : true})
    yield post(`/auth/islogged` , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache' : 'no-cache' } , JSON.stringify({}) , ACCEPT_ISLOGGED , ABORT_ISLOGGED )
    yield put({type : MONITOR , payload : false})
}


export function* authSaga() {
    yield takeLatest(FETCH_LOGIN , fetchLoginSaga)
    yield takeLatest(FETCH_LOGOUT , fetchLogoutSaga)
    yield takeLatest(FETCH_ISLOGGED , fetchIsLoggedSaga)
}

