import { createAction , handleActions } from 'redux-actions'
import { takeLatest , put } from 'redux-saga/effects'
import { get } from './Request/request'

import { Map, List, fromJS } from 'immutable'

export const FETCH_SEARCH = 'search/FETCH_SEARCH'
export const fetchSearch = createAction(FETCH_SEARCH)

export const ACCEPT_SEARCH = 'search/ACCEPT_SEARCH'
export const acceptSearch = createAction(ACCEPT_SEARCH)

export const ABORT_SEARCH = 'search/ABORT_SEARCH'
export const abortSearch = createAction(ABORT_SEARCH)

export const FETCH_SEARCH_SINGER = 'search/FETCH_SEARCH_SINGER'
export const fetchSearchSinger = createAction(FETCH_SEARCH_SINGER)

export const ACCEPT_SEARCH_SINGER = 'search/ACCEPT_SEARCH_SINGER'
export const acceptSearchSinger = createAction(ACCEPT_SEARCH_SINGER)

export const ABORT_SEARCH_SINGER = 'search/ABORT_SEARCH_SINGER'
export const abortSearchSinger = createAction(ABORT_SEARCH_SINGER)

export const FETCH_SEARCH_SONG = 'search/FETCH_SEARCH_SONG'
export const fetchSearchSong = createAction(FETCH_SEARCH_SONG)

export const ACCEPT_SEARCH_SONG = 'search/ACCEPT_SEARCH_SONG'
export const acceptSearchSong = createAction(ACCEPT_SEARCH_SONG)

export const ABORT_SEARCH_SONG = 'search/ABORT_SEARCH_SONG'
export const abortSearchSong = createAction(ABORT_SEARCH_SONG)

export const FETCH_SEARCH_ALBUM = 'search/FETCH_SEARCH_ALBUM'
export const fetchSearchAlbum = createAction(FETCH_SEARCH_ALBUM)

export const ACCEPT_SEARCH_ALBUM = 'search/ACCEPT_SEARCH_ALBUM'
export const acceptSearchAlbum = createAction(ACCEPT_SEARCH_ALBUM)

export const ABORT_SEARCH_ALBUM = 'search/ABORT_SEARCH_ALBUM'
export const abortSearchAlbum = createAction(ABORT_SEARCH_ALBUM)

export const START_LOADING = 'search/START_LOADING'
export const startLoading = createAction(START_LOADING)
export const END_LOADING = 'search/END_LOADINg'
export const endLoading = createAction(END_LOADING)

const initialSearchState = {
    searchText : '',
    foundLists : Map({
        singer : List(),
        song : List(),
        album : List(),
    }),
    isLoading : '',
}

export const searchReducer = handleActions({
    [ACCEPT_SEARCH] : (state , action) => {
        const newState = { ...state }
        const { foundLists } = action.payload
        newState.foundLists = fromJS(foundLists)
        return newState
    },

    [ABORT_SEARCH] : (state , action) => {
        const newState = { ...state }
        return newState
    },

    [ACCEPT_SEARCH_SINGER] : (state , action) => {
        const newState = { ...state }
        const { foundMusics } = action.payload
        newState.foundLists = newState.foundLists.updateIn('singer' , value => value.clear().concat(fromJS(foundMusics)))
        return newState
    },
    [ABORT_SEARCH_SINGER] : (state , action) => {
        const newState = { ...state }
        newState.foundLists = newState.foundLists.updateIn('singer' , value => value.clear())
        return newState
    },
    [ACCEPT_SEARCH_SONG] : (state , action) => {
        const newState = { ...state }
        const { foundMusics } = action.payload
        newState.foundLists = newState.foundLists.updateIn('song' , value => value.clear().concat(fromJS(foundMusics)))
        return newState
    },
    [ABORT_SEARCH_SONG] : (state , action) => {
        const newState = { ...state }
        newState.foundLists = newState.foundLists.updateIn('song' , value => value.clear())
        return newState
    },
    [ACCEPT_SEARCH_ALBUM] : (state , action) => {
        const newState = { ...state }
        const { foundMusics } = action.payload
        newState.foundLists = newState.foundLists.updateIn('album' , value => value.clear().concat(fromJS(foundMusics)))
        return newState
    },
    [ABORT_SEARCH_ALBUM] : (state , action) => {
        const newState = { ...state }
        newState.foundLists = newState.foundLists.updateIn('album' , value => value.clear())
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

} , initialSearchState)

function* fetchSearchSaga(action) {
    const { searchText } = action.payload
    yield put({type : START_LOADING})
    yield get(`/search?searchtext=${searchText}` , ACCEPT_SEARCH , ABORT_SEARCH)
    yield put({type : END_LOADING})
}

function* fetchSearchSingerSaga(action) {
    const { searchText } = action.payload
    yield put({type : START_LOADING})
    yield get(`/search/singer?searchtext=${searchText}` , ACCEPT_SEARCH_SINGER , ABORT_SEARCH_SINGER)
    yield put({type : END_LOADING})
}

function* fetchSearchSongSaga(action) {
    const { searchText } = action.payload
    yield put({type : START_LOADING})
    yield get(`/search/song?searchtext=${searchText}` , ACCEPT_SEARCH_SONG , ABORT_SEARCH_SONG)
    yield put({type : END_LOADING})
}

function* fetchSearchAlbumSaga(action) {
    const { searchText } = action.payload
    yield put({type : START_LOADING})
    yield get(`/search/album?searchtext=${searchText}` , ACCEPT_SEARCH_ALBUM , ABORT_SEARCH_ALBUM)
    yield put({type : END_LOADING})
}

export function* searchSaga() {
    yield takeLatest(FETCH_SEARCH , fetchSearchSaga)
    yield takeLatest(FETCH_SEARCH_SINGER , fetchSearchSingerSaga)
    yield takeLatest(FETCH_SEARCH_SONG , fetchSearchSongSaga)
    yield takeLatest(FETCH_SEARCH_ALBUM , fetchSearchAlbumSaga)
}