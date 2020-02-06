import { createAction , handleActions } from 'redux-actions'
import { takeLatest , put } from 'redux-saga/effects'
import { get } from './Request/request'
import { List , fromJS } from 'immutable'

export const FETCH_TOP100MUSICS = 'top100musics/FETCH'
export const fetchTop100Musics = createAction(FETCH_TOP100MUSICS) // 1: from , 2: to

export const ACCEPT_TOP100MUSICS = 'top100musics/ACCEPT'
export const acceptTop100Musics = createAction(ACCEPT_TOP100MUSICS)

export const ABORT_TOP100MUSICS = 'top100musics/ABORT'
export const abortTop100Musics = createAction(ABORT_TOP100MUSICS)

export const TOP100MUSICS_INIT = 'top100musics/INIT'
export const top100MusicsInit = createAction(TOP100MUSICS_INIT)

export const START_LOADING = 'top100musics/START_LOADING'
export const startLoading = createAction(START_LOADING)
export const END_LOADING = 'top100musics/END_LOADINg'
export const endLoading = createAction(END_LOADING)

const top100MusicsInitalState = {
    musics : List([]),
    isLoading : true,
}

export const top100MusicsReducer = handleActions({
    [TOP100MUSICS_INIT] : (state , action) => {
        const newState = { ...state }
        newState.musics = newState.musics.clear()
        return newState
    },

    [ACCEPT_TOP100MUSICS] : (state , action) => {
        const newState = { ...state }
        const { list , from , to } = action.payload
        if(from > 0 && to > 0 && to >= from) {
            if(newState.musics.size >= from && newState.musics.size >= to) {
                newState.musics = newState.musics.splice(from-1 , to - from + 1)
            }
            else if(newState.musics.size >= from && newState.musics.size <= to) {
                newState.musics = newState.musics.splice(from -1 , to - from + 1)
            }
            newState.musics = newState.musics.concat(fromJS(list)).sortBy(value => value.get('rank'))
        }
        return newState
    },
    [ABORT_TOP100MUSICS] : (state , action) => {
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
    },

} , top100MusicsInitalState)


function * fetchTop100MusicsSaga(action) {
    const { from , to  , init} = action.payload
    if(init)
        yield put({ type : TOP100MUSICS_INIT })
    yield put({ type : START_LOADING })
    yield get(`/top100?from=${from}&to=${to}` , ACCEPT_TOP100MUSICS , ABORT_TOP100MUSICS)
    yield put({ type : END_LOADING })
}

export function* top100MusicsSaga() {
    yield takeLatest(FETCH_TOP100MUSICS , fetchTop100MusicsSaga)
}



