import { call , put } from 'redux-saga/effects'

export function* post (url , _body , acceptType , abortType) {
    const request = {
        body : JSON.stringify(_body),
        credentials: 'include',
        method : 'POST'
    }

    try {
        const response = yield call(fetch , url , request)
        if(response.ok) {
            yield put({type : acceptType , payload : yield call([response , 'json'])})
        }
        else {
            throw new Error('aborted')
        }
    }
    catch(error) {
        yield put({type : abortType})
    }
}
    


