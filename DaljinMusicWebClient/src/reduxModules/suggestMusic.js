import { createAction , handleActions } from 'redux-actions'
import { call , put , takeLatest } from 'redux-saga/effects'
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

    
    try {
        const response = yield call(fetch , `${Config.SERVER}/suggestmusic/${action.payload}`)
        console.log(`${action.payload}`)
        if(response.ok) {
            yield put({type : ACCEPT_SUGGESTMUSIC , payload : yield call([response , 'json'])})
        }
        else {
            throw new Error('aborted')
        }
    }
    catch(error) {
        yield put({type : ABORT_SUGGESTMUSIC})
    }

}

export function* suggestMusicSaga() {
    yield takeLatest(FETCH_SUGGESTMUSIC , fetchSaga)
}