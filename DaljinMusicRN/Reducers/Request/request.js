import { call , put } from 'redux-saga/effects'
import { API_SERVER } from '../../Config'
export function* get (url , acceptType , abortType) {
    
    
    try {
        const response = yield call(fetch , `${API_SERVER}${url}`)
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
    
export function* post (url , _headers = {} , _body , acceptType , abortType) {
    const request = {
        headers : _headers,
        body : _body,
        credentials : 'include',
        method : 'POST'
    }
    try {
        const response = yield call(fetch , `${API_SERVER}${url}` , request)
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