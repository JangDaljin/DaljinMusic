import { createAction , handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import { get } from './Request/request'
import { List , fromJS } from 'immutable'

export const FETCH_HOTANDNEW= 'hotandnew/FETCH_HOTANDNEW'
export const fetchHotAndNew = createAction(FETCH_HOTANDNEW)

export const ACCEPT_HOTANDNEW = 'hotnnewmusic/ACCEPT_HOTANDNEW'
export const acceptHotAndNew = createAction(ACCEPT_HOTANDNEW)

export const ABORT_HOTANDNEW = 'hotnnewmusic/ABORT_HOTANDNEW'
export const abortHotAndNew = createAction(ABORT_HOTANDNEW)

const hotandnewInitalState = {
    list : List()
}

export const hotAndNewReducer = handleActions({
    [ACCEPT_HOTANDNEW] : (state, action) => {
        const newState = { ...state }
        const { list } = action.payload
        newState.list = newState.list.clear().concat(fromJS(list))
        return newState
    },
    [ABORT_HOTANDNEW] : (state, action) => {
        const newState = { ...state }
        return newState
    }
}, hotandnewInitalState)

function* fetchHotAndNewSaga(action) {
    yield get(`/hotnnewmusic` , ACCEPT_HOTANDNEW , ABORT_HOTANDNEW)
}

export function* hotAndNewSaga() {
    yield takeLatest(FETCH_HOTANDNEW , fetchHotAndNewSaga)
}