import { takeLatest , call , put } from 'redux-saga/effects'
import { FETCH_LOGIN , ACCEPT_LOGIN , ABORT_LOGIN } from './login'
import Config from '../config'


function* fetchLogIn (action) {
    //const state = yield select() //'redux-saga/effects'

    const data = {
        userid : action.payload.id,
        userpw : action.payload.pw
    }

    const request = {
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'POST'
    }

    try {
        const response = yield call(fetch , `${Config.SERVER}/auth/login` , request )
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

export default function* loginSaga () {
    yield takeLatest(FETCH_LOGIN , fetchLogIn)
}
