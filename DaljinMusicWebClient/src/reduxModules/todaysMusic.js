import { createAction , handleActions } from 'redux-actions'
import { call , put , takeLatest} from 'redux-saga/effects'
import Config from '../config'

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

    try {
        const response = yield call(fetch , `${Config.SERVER}/todaysmusic` )
        if(response.ok) {
            yield put({ type : ACCEPT_TODAYSMUSIC , payload : yield call([response , 'json'])})
        }
        else {
            console.log(`ERROR`)
            throw new Error('aborted');
        }
    }
    catch(error) {
        console.log('error')
        yield put({type : ABORT_TODAYSMUSIC})
    }
}

export function* todaysMusicSaga() {
    yield takeLatest(FETCH_TODAYSMUSIC , fetchSaga)
}


