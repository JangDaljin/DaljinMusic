import { takeLatest , select , call , put } from 'redux-saga/effects'
import { FETCH_LOGIN , ACCEPT_LOGIN , ABORT_LOGIN } from './login'
import Config from '../config'


function* fetchLogIn (action) {
    const state = yield select()

    const data = {
        userid : state.login.userid,
        userpw : state.login.userpw
    }

    const request = {
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'POST'
    }

    try {
        const response = yield call(fetch , `${Config.SERVER}/login` , request )
        if(response.ok) {
            yield put({ type : ACCEPT_LOGIN , payload : yield call([response , 'json'])})
        }
        else {
            yield put({type : ABORT_LOGIN})
        }
    }
    catch(error) {
        yield put({type : ABORT_LOGIN})
    }
}

export default function* rootSaga () {
    yield takeLatest(FETCH_LOGIN , fetchLogIn)
}
