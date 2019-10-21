import { createAction , handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import { get } from './Request/request'
import Config from '../config'

export const FETCH_SUGGESTMUSIC = 'suggestmusic/FETCH'
export const fetchSuggestMusic = createAction(FETCH_SUGGESTMUSIC)

export const ACCEPT_SUGGESTMUSIC = 'suggestmusic/ACCEPT'
export const acceptSuggestMusic = createAction(ACCEPT_SUGGESTMUSIC)

export const ABORT_SUGGESTMUSIC = 'suggestmusic/ABORT'
export const abortSuggestMusic = createAction(ABORT_SUGGESTMUSIC)

export const suggestMusicState = {
    items : []
}

export const suggestMusicReducer = handleActions({
    [ACCEPT_SUGGESTMUSIC] : (state , action) => {
        const newState = { ...state }
        newState.items = action.payload
        return newState
    },
    [ABORT_SUGGESTMUSIC] : (state , action) => {
        console.log('abort')
        const newState = { ...state }
        return newState
    }
}, suggestMusicState)

function* fetchSaga(action) {
    yield get(`${Config.SERVER}/suggestmusic/${action.payload}` , ACCEPT_SUGGESTMUSIC , ABORT_SUGGESTMUSIC)
}

export function* suggestMusicSaga() {
    yield takeLatest(FETCH_SUGGESTMUSIC , fetchSaga)
}