import { takeLatest , put, call , select } from 'redux-saga/effects'

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
}