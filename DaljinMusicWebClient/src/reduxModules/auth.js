import { createAction , handleActions } from 'redux-actions'
import { call , put , takeLatest} from 'redux-saga/effects'
import Config from '../config'

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


    const data = {
        userId : action.payload.id,
        userPw : action.payload.pw
    }

    const request = {
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json',
            'Accept':  'application/json',
            'Cache': 'no-cache'
        },
        credentials : 'include',
        method : 'POST'
    }

    try {
        const response = yield call(fetch , `${Config.SERVER}/auth/login` , request )
        if(response.ok) {
            yield put({ type : ACCEPT_LOGIN , payload : yield call([response , 'json'])})
        }
        else {
            throw new Error('aborted');
        }
    }
    catch(error) {
        yield put({type : ABORT_LOGIN})
    }
}

function* fetchLogoutSaga(action) {

    const request = {
        body : JSON.stringify({}),
        headers : {
            'Content-Type' : 'application/json',
            'Accept':  'application/json',
            'Cache': 'no-cache'
        },
        credentials: 'include',
        method : 'POST'
    }

    try {
        const response = yield call(fetch , `${Config.SERVER}/auth/logout` , request )
        if(response.ok) {
            yield put({ type : ACCEPT_LOGOUT , payload : yield call([response , 'json'])})
        }
        else {
            throw new Error('aborted');
        }
    }
    catch(error) {
        yield put({type : ABORT_LOGOUT})
    }
} 

function* checkLoggedSaga() {
    const request = {
        body : JSON.stringify({}),
        headers : {
            'Content-Type' : 'application/json',
            'Accept':  'application/json',
            'Cache': 'no-cache'
        },
        credentials: 'include',
        method : 'POST'
    }

    const response = yield call(fetch , `${Config.SERVER}/auth/islogged` , request )
    if(response.ok) {
        yield put({ type : ALREADY_LOGGED , payload : yield call([response , 'json'])})
    }
    else {
        console.log('isnotlogged')
    }
}


export function* authSaga() {
    yield takeLatest(FETCH_LOGIN , fetchLoginSaga)
    yield takeLatest(FETCH_LOGOUT , fetchLogoutSaga)
    yield takeLatest(CHECK_LOGGED , checkLoggedSaga)
}

