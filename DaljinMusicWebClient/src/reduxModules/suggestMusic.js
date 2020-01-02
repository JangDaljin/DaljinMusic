import { createAction , handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import { get } from './Request/request'
import { List , fromJS } from 'immutable'

export const FETCH_SUGGESTMUSIC = 'suggestmusic/FETCH'
export const fetchSuggestMusic = createAction(FETCH_SUGGESTMUSIC)

export const ACCEPT_SUGGESTMUSIC = 'suggestmusic/ACCEPT'
export const acceptSuggestMusic = createAction(ACCEPT_SUGGESTMUSIC)

export const ABORT_SUGGESTMUSIC = 'suggestmusic/ABORT'
export const abortSuggestMusic = createAction(ABORT_SUGGESTMUSIC)

export const suggestMusicState = {
    suggestMusics : List()
}

export const suggestMusicReducer = handleActions({
    [ACCEPT_SUGGESTMUSIC] : (state , action) => {
        const newState = { ...state }
        const { suggestMusics } = action.payload
        console.dir(suggestMusics)
        newState.suggestMusics = newState.suggestMusics.clear().concat(fromJS(suggestMusics))
        return newState
    },
    [ABORT_SUGGESTMUSIC] : (state , action) => {
        const newState = { ...state }
        return newState
    }
}, suggestMusicState)

function* fetchSaga(action) {
    const { userId , musicCount } = action.payload
    yield get(`/suggestmusic?userid=${userId}&musiccount=${musicCount}` , ACCEPT_SUGGESTMUSIC , ABORT_SUGGESTMUSIC)
}

export function* suggestMusicSaga() {
    yield takeLatest(FETCH_SUGGESTMUSIC , fetchSaga)
}