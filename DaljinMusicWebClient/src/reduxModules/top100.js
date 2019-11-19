import { createAction , handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import { get } from './Request/request'
import { List , fromJS } from 'immutable'

export const FETCH_TOP100 = 'top100/FETCH'
export const fetchTop100 = createAction(FETCH_TOP100) // 1: from , 2: to

export const ACCEPT_TOP100 = 'top100/ACCEPT'
export const acceptTop100 = createAction(ACCEPT_TOP100)

export const ABORT_TOP100 = 'top100/ABORT'
export const abortTop100 = createAction(ABORT_TOP100)

export const ALREADY_TOP100 = 'top100/ALREADY'
export const alreadyTop100 = createAction(ALREADY_TOP100)


const top100InitalState = {
    items : List([])
}

export const top100Reducer = handleActions({
    [ACCEPT_TOP100] : (state , action) => {
        const newState = { ...state }
        const { list , from , to } = action.payload
        
        if(newState.items.size >= from && newState.items.size >= to) {
            newState.items = newState.items.splice(from-1 , to - from + 1)
        }
        else if(newState.items.size >= from && newState.items.size <= to) {
            newState.items = newState.items.splice(from -1 , to - from + 1)
        }
        newState.items = newState.items.concat(fromJS(list))
        return newState
    },
    [ABORT_TOP100] : (state , action) => {
        const newState = { ...top100InitalState }
        return newState
    },

} , top100InitalState)


function * fetchSaga(action) {
    const { from , to } = action.payload
    yield get(`/top100?from=${from}&to=${to}` , ACCEPT_TOP100 , ABORT_TOP100)
}

export function* top100Saga() {
    yield takeLatest(FETCH_TOP100 , fetchSaga)
}



