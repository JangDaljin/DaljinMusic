import { createAction , handleActions } from 'redux-actions'
import { takeLatest , put} from 'redux-saga/effects'
import { get } from './Request/request'
import { List , fromJS } from 'immutable'

export const FETCH_HOTANDNEWMUSICS= 'hotnnewmusics/FETCH_HOTANDNEWMUSICS'
export const fetchHotAndNewMusics = createAction(FETCH_HOTANDNEWMUSICS)

export const ACCEPT_HOTANDNEWMUSICS = 'hotnnewmusics/ACCEPT_HOTANDNEWMUSICS'
export const acceptHotAndNewMusics = createAction(ACCEPT_HOTANDNEWMUSICS)

export const ABORT_HOTANDNEWMUSICS = 'hotnnewmusics/ABORT_HOTANDNEWMUSICS'
export const abortHotAndNewMusics = createAction(ABORT_HOTANDNEWMUSICS)


export const START_LOADING = 'hotandnewmusics/START_LOADING'
export const startLoading = createAction(START_LOADING)
export const END_LOADING = 'hotandnewmusics/END_LOADINg'
export const endLoading = createAction(END_LOADING)

const hotAndNewMusicsInitalState = {
    musics : List(),
    isLoading : true,
}

export const hotAndNewMusicsReducer = handleActions({
    [ACCEPT_HOTANDNEWMUSICS] : (state, action) => {
        const newState = { ...state }
        const { list } = action.payload
        newState.musics = newState.musics.clear().concat(fromJS(list))
        return newState
    },
    [ABORT_HOTANDNEWMUSICS] : (state, action) => {
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
}, hotAndNewMusicsInitalState)

function* fetchHotAndNewMusicsSaga(action) {
    yield put({ type : START_LOADING })
    yield get(`/hotnnewmusic` , ACCEPT_HOTANDNEWMUSICS , ABORT_HOTANDNEWMUSICS)
    yield put({ type : END_LOADING })
}

export function* hotAndNewMusicsSaga() {
    yield takeLatest(FETCH_HOTANDNEWMUSICS , fetchHotAndNewMusicsSaga)
}