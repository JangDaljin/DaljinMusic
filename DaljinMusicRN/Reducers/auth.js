import { createAction , handleActions } from 'redux-actions'
import { takeLatest , put} from 'redux-saga/effects'
import { post } from './Request/request'
import { ToastAndroid } from 'react-native'

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

//*******************************************************//
//회원가입
export const SIGNUP_LOADING = 'auth/SIGNUP_LOADING'
export const signupLoading = createAction(SIGNUP_LOADING)

export const FETCH_SIGNUP = 'auth/FETCH_SIGNUP'
export const fetchSignup = createAction(FETCH_SIGNUP)

export const ACCEPT_SIGNUP = 'auth/ACCEPT_SIGNUP'
export const acceptSignup = createAction(ACCEPT_SIGNUP)

export const ABORT_SIGNUP = 'auth/ABORT_SIGNUP'
export const abortSignup = createAction(ABORT_SIGNUP)

export const VERIFY_ID_LOADING = 'auth/VERIFY_ID_LOADING'
export const verifyIdLoading = createAction(VERIFY_ID_LOADING)

export const FETCH_VERIFY_ID = 'auth/FETCH_VERIFY_ID'
export const fetchVerifyId = createAction(FETCH_VERIFY_ID)

export const ACCEPT_VERIFY_ID = 'auth/ACCEPT_VERIFY_ID'
export const acceptVerifyId = createAction(ACCEPT_VERIFY_ID)

export const ABORT_VERIFY_ID = 'auth/ABORT_VERIFY_ID'
export const abortVerifyId = createAction(ABORT_VERIFY_ID)
//*******************************************************//

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
    modalShow : true,

    verifyIdLoading : false,
    verifyId : false,

    signupLoading : false,
    signup : false,
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
        newState.userId = ''
        newState.userName = ''
        newState.isAuthenticated = false
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
    },

    [VERIFY_ID_LOADING] : (state , action) => {
        const newState = { ...state }
        newState.verifyIdLoading = !newState.verifyIdLoading
        return newState
    },

    [ACCEPT_VERIFY_ID] : (state ,action) => {
        const newState = { ...state }
        newState.verifyId = action.payload.isOk
        return newState
    },

    [ABORT_VERIFY_ID] : (state, action) => {
        const newState = { ...state }
        newState.verifyId = false
        return newState
    },

    [SIGNUP_LOADING] : (state , action) => {
        const newState = { ...state }
        newState.signupLoading = !newState.signupLoading
        return newState
    },

    [ACCEPT_SIGNUP] : (state , action) => {
        const newState = { ...state }
        newState.signup = action.payload.isOk
        return newState
    },

    [ABORT_SIGNUP] : (state , action) => {
        const newState = { ...state }
        newState.signup = false
        return newState
    },

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

function* fetchSignupSaga (action) {
    yield put({type : SIGNUP_LOADING})
    yield post(`/signup` , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } ,  JSON.stringify(action.payload) , ACCEPT_SIGNUP , ABORT_SIGNUP)
    yield put({type : SIGNUP_LOADING})
}

function* fetchVerifyIdSaga (action) {
    yield put({ type : VERIFY_ID_LOADING})
    yield post(`/signup/idcheck` , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } ,  JSON.stringify(action.payload) , ACCEPT_VERIFY_ID , ABORT_VERIFY_ID)
    yield put({ type : VERIFY_ID_LOADING})
}


export function* authSaga() {
    //로그인
    yield takeLatest(FETCH_LOGIN , fetchLoginSaga)
    yield takeLatest(FETCH_ISLOGGED , fetchIsLoggedSaga)

    //로그아웃
    yield takeLatest(FETCH_LOGOUT , fetchLogoutSaga)

    //회원 가입
    yield takeLatest(FETCH_VERIFY_ID , fetchVerifyIdSaga)
    yield takeLatest(FETCH_SIGNUP , fetchSignupSaga)
}
