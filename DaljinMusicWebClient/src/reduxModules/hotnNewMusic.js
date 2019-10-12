import { createAction , handleActions } from 'redux-actions'
import { call , put , takeLatest } from 'redux-saga/effects'
import Config from '../config'

export const FETCH_HNNMUSIC = 'hotnnewmusic/FETCH'
export const hnnMusicFetch = createAction(FETCH_HNNMUSIC)

export const ACCEPT_HNNMUSIC = 'hotnnewmusic/ACCEPT'
export const hnnMusicAccept = createAction(ACCEPT_HNNMUSIC)

export const ABORT_HNNMUISC = 'hotnnewmusic/ABORT'
export const hnnMusicAbort = createAction(ABORT_HNNMUISC)

const hnnInitialState = {
    items : []
}

export const hnnMusicReducer = handleActions({
    [ACCEPT_HNNMUSIC] : (state, action) => {
        const newState = { ...state }
        newState.items = action.payload
        return newState
    },
    [ABORT_HNNMUISC] : (state, action) => {
        const newState = { ...hnnInitialState }
        return newState
    }
}, hnnInitialState)

function* fetchSaga(action) {
    
    try {
        const response = yield call(fetch , `${Config.SERVER}/hotnnewmusic`)
        
        if(response.ok) {
            yield put({type : ACCEPT_HNNMUSIC , payload : yield call([response , 'json'])})
        }
        else {
            throw new Error('aborted')
        }
    }
    catch(error) {
        yield put({type : ABORT_HNNMUISC})
    }

}

export function* hnnMusicSaga() {
    yield takeLatest(FETCH_HNNMUSIC , fetchSaga)
}