import { call , put } from 'redux-saga/effects'
import { Readable } from 'stream'

export function* get (url , acceptType , abortType) {
    try {
        const response = yield call(fetch , `${process.env.REACT_APP_SERVER}${url}`)
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
        const response = yield call(fetch , `${process.env.REACT_APP_SERVER}${url}` , request)
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
    
export function* postStream (url , _headers , _body , acceptType , abortType) {
    const request = {
        headers : _headers,
        body : _body,
        credentials : 'include',
        method : 'POST'
    }

    try {
        const response = yield call(fetch , `${process.env.REACT_APP_SERVER}${url}` , request , acceptType)
        const reader = yield call(response.body.getReader)

        console.log(reader.read())

        const rs = new Readable()
        rs._read = () => {
            const result = reader.read();
            if(!result.done) {
                rs.push(Buffer.from(result.value))
            }
            else {
                rs.push(null);
                return
            }

            rs.on('readable' , () => {
                console.log(rs.read())
            })
        }
        yield put({type : acceptType , payload : rs})
    }
    catch(error) {
        console.log(error)
        yield put({type : abortType})
    }
}

