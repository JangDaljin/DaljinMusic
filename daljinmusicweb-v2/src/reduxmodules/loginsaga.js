import { takeLatest , select , call , put } from 'redux-saga/effects'
import Config from '../config'


function* fetchLogIn (action) {
    const state = yield select()

    const data = {
        userid : state.login.userid,
        userpw : state.login.userpw
    }

    const req = {
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'POST'
    }

    const res = yield call(fetch , `${Config.SERVER}/login` , req )
    const json = yield call([res , 'json'])

    yield put({ type : 'login/LOGIN' , payload : json})
}

function* fetchLogOut (action) {

}


export default function* rootSaga () {
    yield takeLatest('FETCH_LOGIN' , fetchLogIn)
    yield takeLatest('FETCH_LOGOUT', fetchLogOut)    
}



/*
function* login_Async() {
    const state = yield select((state)=>state.login)

    const data = {
        userid : state.userid,
        userpw : state.userpw
    }

    console.log(`userid:${state.userid} userpw:${state.userpw}`)

    const req = {
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'POST'
    }

    const json = call(fetch , 'http://localhost:8888/login' , req)

    console.log(json+"11");
}

export function* watchLogin() {
    yield takeLatest('login/LOGIN' , login_Async)
}*/
