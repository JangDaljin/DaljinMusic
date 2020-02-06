import { createAction , handleActions } from 'redux-actions'
import { takeLatest , put} from 'redux-saga/effects'
import { get } from './Request/request'
import { Map , fromJS } from 'immutable'

export const FETCH_TODAYSLIVE = 'todayslive/FETCH'
export const fetchTodaysLive = createAction(FETCH_TODAYSLIVE)

export const ACCEPT_TODAYSLIVE = 'todayslive/ACCEPT'
export const acceptTodaysLive = createAction(ACCEPT_TODAYSLIVE)

export const ABORT_TODAYSLIVE = 'todayslive/ABORT'
export const abortTodaysLive = createAction(ABORT_TODAYSLIVE)

export const START_LOADING = 'todayslive/START_LOADING'
export const startLoading = createAction(START_LOADING)
export const END_LOADING = 'todayslive/END_LOADINg'
export const endLoading = createAction(END_LOADING)
const todaysLiveState = {
    music : Map(),
    isLoading : true,
}

export const todaysLiveReducer = handleActions({
    [ACCEPT_TODAYSLIVE] : (state , action) => {
        const newState = { ...state }

        const { music } = action.payload
        newState.music = fromJS(music)

        newState.isLoading = false
        return newState
    },
    [ABORT_TODAYSLIVE] : (state , aciton) => {
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
} , todaysLiveState)

function* fetchTodaysLiveSaga(action) {
    yield put({ type : START_LOADING })
    yield get(`/todaysmusic` , ACCEPT_TODAYSLIVE , ABORT_TODAYSLIVE)
    yield put({ type : END_LOADING })
}

export function* todaysLiveSaga() {
    yield takeLatest(FETCH_TODAYSLIVE , fetchTodaysLiveSaga)
}


