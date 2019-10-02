import { takeLatest , call , put } from 'redux-saga/effects'
import { FETCH_GET_MORE , ACCEPT_GET_MORE , ABORT_GET_MORE } from './top100'
import Config from '../config'


function* fetchGetMore (action) {
    //const state = yield select() //'redux-saga/effects'

    const request = {
        body : JSON.stringify({}),
        headers : {
            'Content-Type' : 'application/json'
        },
        method : 'POST'
    }

    try {
        const response = yield call(fetch , `${Config.SERVER}/top100/getmore` , request )
        if(response.ok) {
            yield put({ type : ACCEPT_GET_MORE , payload : yield call([response , 'json'])})
        }
        else {
            yield put({type : ABORT_GET_MORE})
        }
    }
    catch(error) {
        yield put({type : ABORT_LOGIN})
    }
}

export default function* loginSaga () {
    yield takeLatest(FETCH_GET_MORE , fetchGetMore)
}
