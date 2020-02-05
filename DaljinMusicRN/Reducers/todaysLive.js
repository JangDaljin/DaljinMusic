import { createAction , handleActions } from 'redux-actions'
import { takeLatest} from 'redux-saga/effects'
import { get } from './Request/request'
import { Map , fromJS } from 'immutable'
import { ToastAndroid } from 'react-native'

export const FETCH_TODAYSLIVE = 'todayslive/FETCH'
export const fetchTodaysLive = createAction(FETCH_TODAYSLIVE)

export const ACCEPT_TODAYSLIVE = 'todayslive/ACCEPT'
export const acceptTodaysLive = createAction(ACCEPT_TODAYSLIVE)

export const ABORT_TODAYSLIVE = 'todayslive/ABORT'
export const abortTodaysLive = createAction(ABORT_TODAYSLIVE)

const todaysLiveState = {
    music : Map()
}

export const todaysLiveReducer = handleActions({
    [ACCEPT_TODAYSLIVE] : (state , action) => {
        const newState = { ...state }

        const { music } = action.payload
        newState.music = fromJS(music)

        return newState
    },
    [ABORT_TODAYSLIVE] : (state , aciton) => {
        const newState = { ...state }
        return newState
    },
} , todaysLiveState)

function* fetchTodaysLiveSaga(action) {
    yield get(`/todaysmusic` , ACCEPT_TODAYSLIVE , ABORT_TODAYSLIVE)
}

export function* todaysLiveSaga() {
    yield takeLatest(FETCH_TODAYSLIVE , fetchTodaysLiveSaga)
}


