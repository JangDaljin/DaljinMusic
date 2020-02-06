import { createAction , handleActions } from 'redux-actions'
import { takeLatest , put} from 'redux-saga/effects'
import { get } from './Request/request'
import { List , fromJS } from 'immutable'

export const FETCH_SUGGESTMUSICS = 'suggestmusics/FETCH'
export const fetchSuggestMusics = createAction(FETCH_SUGGESTMUSICS)

export const ACCEPT_SUGGESTMUSICS = 'suggestmusics/ACCEPT'
export const acceptSuggestMusics = createAction(ACCEPT_SUGGESTMUSICS)

export const ABORT_SUGGESTMUSICS = 'suggestmusics/ABORT'
export const abortSuggestMusics = createAction(ABORT_SUGGESTMUSICS)

export const START_LOADING = 'suggestmusics/START_LOADING'
export const startLoading = createAction(START_LOADING)
export const END_LOADING = 'suggestmusics/END_LOADINg'
export const endLoading = createAction(END_LOADING)

export const suggestMusicsState = {
    musics : List(),
    isLoading : true,
}

export const suggestMusicsReducer = handleActions({
    [ACCEPT_SUGGESTMUSICS] : (state , action) => {
        const newState = { ...state }
        const { suggestMusics } = action.payload
        newState.musics = newState.musics.clear().concat(fromJS(suggestMusics))
        newState.isLoading = false
        return newState
    },
    [ABORT_SUGGESTMUSICS] : (state , action) => {
        const newState = { ...state }
        return newState
    },
    [START_LOADING] : (state , action) => {
        const newState = { ...state }
        newState.isLoading = true
        return newState
    },
    [END_LOADING] : (state , action) => {
        const newState = { ...state }
        newState.isLoading = false
        return newState
    }
}, suggestMusicsState)

function* fetchSuggestMusicsSaga(action) {
    const { userId , musicCount } = action.payload
    yield put({ type : START_LOADING })
    yield get(`/suggestmusic?userid=${userId}&musiccount=${musicCount}` , ACCEPT_SUGGESTMUSICS , ABORT_SUGGESTMUSICS)
    yield put({ type : END_LOADING })
}

export function* suggestMusicsSaga() {
    yield takeLatest(FETCH_SUGGESTMUSICS, fetchSuggestMusicsSaga)
}