import { createAction , handleActions } from 'redux-actions'
import { takeLatest} from 'redux-saga/effects'
import { get } from './Request/request'

export const FETCH_TODAYSMUSIC = 'todaysmusic/FETCH'
export const fetchTodaysMusic = createAction(FETCH_TODAYSMUSIC)

export const ACCEPT_TODAYSMUSIC = 'todaysmusic/ACCEPT'
export const acceptTodaysMusic = createAction(ACCEPT_TODAYSMUSIC)

export const ABORT_TODAYSMUSIC = 'todaysmusic/ABORT'
export const abortTodaysMusic = createAction(ABORT_TODAYSMUSIC)

const todaysmusicState = {
    song : '',
    singer : '',
    album : '',
    albumImgUri : '',
}

export const todaysMusicReducer = handleActions({
    [ACCEPT_TODAYSMUSIC] : (state , action) => {
        const newState = { ...state }

        const { song , singer , album , albumImgUri } = action.payload

        newState.song = song
        newState.singer = singer
        newState.album = album
        newState.albumImgUri = albumImgUri

        return newState
    },
    [ABORT_TODAYSMUSIC] : (state , aciton) => {
        const newState = { ...todaysmusicState }
        return newState
    },
} , todaysmusicState)

function* fetchSaga(action) {
    yield get(`/todaysmusic` , ACCEPT_TODAYSMUSIC , ABORT_TODAYSMUSIC)
}

export function* todaysMusicSaga() {
    yield takeLatest(FETCH_TODAYSMUSIC , fetchSaga)
}


