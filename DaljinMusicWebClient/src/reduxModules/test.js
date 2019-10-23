import { createAction , handleActions } from 'redux-actions'
import { post } from './Request/request'
import Config from '../config'

import { takeLatest } from 'redux-saga/effects'


export const TEST_FETCH = 'test/TESTFETCH'
export const testFetch = createAction(TEST_FETCH)

export const REF_MAKE_FETCH = 'test/REFMAKEFETCH'
export const refMakeFetch = createAction(REF_MAKE_FETCH)

export const TEST_MAKE_FETCH = 'test/TESTMAKEFETCH'
export const testMakeFetch = createAction(TEST_MAKE_FETCH)



export const ACCEPT = 'test/TESTACCEPT'
export const accept = createAction(ACCEPT)

export const ABORT = 'test/TESTABORT'
export const abort = createAction(ABORT)



const initialTestState = {
   inputData : null
}


export const testReducer = handleActions({
    [ACCEPT] : (state , action) => {
        const newState = { ...state }
        newState.inputData = action.payload.outputData
        window.alert(action.payload.message)
        return newState
    },
    [ABORT] : (state , action) => {
        const newState = { ...initialTestState }
        
        return newState
    }
} , initialTestState)


function* testFetchSaga (action) {
    yield post(`${Config.SERVER}/test/start` , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT , ABORT)
}

function* refMakeFetchSaga (action) {
    yield post(`${Config.SERVER}/test/makeref` , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT , ABORT)
}

function* testMakeFetchSaga (action) {
    yield post(`${Config.SERVER}/test/maketest` , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT , ABORT)
}

export function* testSaga() {
    yield takeLatest(TEST_FETCH , testFetchSaga)
    yield takeLatest(REF_MAKE_FETCH , refMakeFetchSaga)
    yield takeLatest(TEST_MAKE_FETCH , testMakeFetchSaga)
}

