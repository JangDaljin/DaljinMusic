import { createAction , handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import { get } from './Request/request'

export const FETCH_HNNMUSIC = 'hotnnewmusic/FETCH'
export const hnnMusicFetch = createAction(FETCH_HNNMUSIC)

export const ACCEPT_HNNMUSIC = 'hotnnewmusic/ACCEPT'
export const hnnMusicAccept = createAction(ACCEPT_HNNMUSIC)

export const ABORT_HNNMUSIC = 'hotnnewmusic/ABORT'
export const hnnMusicAbort = createAction(ABORT_HNNMUSIC)

const hnnInitialState = {
    items : []
}

export const hnnMusicReducer = handleActions({
    [ACCEPT_HNNMUSIC] : (state, action) => {
        const newState = { ...state }
        newState.items = action.payload
        return newState
    },
    [ABORT_HNNMUSIC] : (state, action) => {
        const newState = { ...hnnInitialState }
        return newState
    }
}, hnnInitialState)

function* fetchSaga(action) {
    yield get(`/hotnnewmusic` , ACCEPT_HNNMUSIC , ABORT_HNNMUSIC)
}

export function* hnnMusicSaga() {
    yield takeLatest(FETCH_HNNMUSIC , fetchSaga)
}