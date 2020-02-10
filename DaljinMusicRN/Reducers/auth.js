import { createAction , handleActions } from 'redux-actions'
import { takeLatest , put} from 'redux-saga/effects'
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

export const FETCH_ISLOGGED = 'auth/FETCH_ISLOGGED'
export const fetchIsLogged = createAction(FETCH_ISLOGGED)

export const ACCEPT_ISLOGGED = 'auth/ACCEPT_ISLOGGED'
export const acceptIsLogged = createAction(ACCEPT_ISLOGGED)

export const ABORT_ISLOGGED = 'auth/ABORT_ISLOGGED'
export const abortIsLogged = createAction(ABORT_ISLOGGED)

export const START_LOADING = 'auth/START_LOADING'
export const startLoading = createAction(START_LOADING)
export const END_LOADING = 'auth/END_LOADINg'
export const endLoading = createAction(END_LOADING)

export const SHOW_MODAL = 'auth/SHOW_MODAL'
export const showModal = createAction(SHOW_MODAL)
export const HIDE_MODAL = 'auth/HIDE_MODAL'
export const hideModal = createAction(HIDE_MODAL)

const authInitialState = {
    userId : '',
    userName : '',
    isAuthenticated : false,
    isLoading : true,

    modalShow : false,
}

export const authReducer = handleActions({
    [SHOW_MODAL] : (state , action) => {
        const newState = { ...state }
        newState.modalShow = true
        return newState
    },
    
    [HIDE_MODAL] : (state , action) => {
        const newState = { ...state }
        newState.modalShow = false
        return newState
    },

    [ACCEPT_LOGIN] : (state , action) => {
        const newState = { ...state }
        const { userId , userName , isAuthenticated , message } = action.payload
        newState.userId = userId
        newState.userName = userName
        newState.isAuthenticated = isAuthenticated
        return newState
    },
    [ABORT_LOGIN] : (state , action) => {
        const newState = { ...state }
        return newState
    },

    [ACCEPT_LOGOUT] : (state , action) => { 
        const newState = { ...state }
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
        const newState = { ...state }
        return newState
    },

    [START_LOADING] : (state , action) => {
        const newState = { ...state }
        newState.isLoading = true
        return newState
    },
    [END_LOADING] : (state , action) => {
        const newState = { ...state }
        newState.isLoading = false
        return newState
    }

} , authInitialState)


function* fetchLoginSaga (action) {
    yield put({type : START_LOADING})
    yield post(`/auth/login` , { 'Content-Type' : 'application/json', 'Accept':  'application/json' , 'Cache' : 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_LOGIN , ABORT_LOGIN )
    yield put({type : END_LOADING})
}

function* fetchLogoutSaga(action) {
    yield put({type : START_LOADING})
    yield post(`/auth/logout` , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache' : 'no-cache' } , JSON.stringify({}) , ACCEPT_LOGOUT , ABORT_LOGOUT )
    yield put({type : END_LOADING})
} 

function* fetchIsLoggedSaga() {
    yield put({type : START_LOADING})
    yield post(`/auth/islogged` , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache' : 'no-cache' } , JSON.stringify({}) , ACCEPT_ISLOGGED , ABORT_ISLOGGED )
    yield put({type : END_LOADING})
}


export function* authSaga() {
    yield takeLatest(FETCH_LOGIN , fetchLoginSaga)
    yield takeLatest(FETCH_LOGOUT , fetchLogoutSaga)
    yield takeLatest(FETCH_ISLOGGED , fetchIsLoggedSaga)
}

