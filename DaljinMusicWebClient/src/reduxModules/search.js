import { createAction , handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import { get } from './Request/request'

import { Map, List, fromJS } from 'immutable'

export const FETCH_SEARCH = 'admin/FETCH_SEARCH'
export const fetchSearch = createAction(FETCH_SEARCH)

export const ACCEPT_SEARCH = 'admin/ACCEPT_SEARCH'
export const acceptSearch = createAction(ACCEPT_SEARCH)

export const ABORT_SEARCH = 'admin/ABORT_SEARCH'
export const abortSearch = createAction(ABORT_SEARCH)

export const FETCH_SEARCH_SINGER = 'admin/FETCH_SEARCH_SINGER'
export const fetchSearchSinger = createAction(FETCH_SEARCH_SINGER)

export const ACCEPT_SEARCH_SINGER = 'admin/ACCEPT_SEARCH_SINGER'
export const acceptSearchSinger = createAction(ACCEPT_SEARCH_SINGER)

export const ABORT_SEARCH_SINGER = 'admin/ABORT_SEARCH_SINGER'
export const abortSearchSinger = createAction(ABORT_SEARCH_SINGER)

export const FETCH_SEARCH_SONG = 'admin/FETCH_SEARCH_SONG'
export const fetchSearchSong = createAction(FETCH_SEARCH_SONG)

export const ACCEPT_SEARCH_SONG = 'admin/ACCEPT_SEARCH_SONG'
export const acceptSearchSong = createAction(ACCEPT_SEARCH_SONG)

export const ABORT_SEARCH_SONG = 'admin/ABORT_SEARCH_SONG'
export const abortSearchSong = createAction(ABORT_SEARCH_SONG)

export const FETCH_SEARCH_ALBUM = 'admin/FETCH_SEARCH_ALBUM'
export const fetchSearchAlbum = createAction(FETCH_SEARCH_ALBUM)

export const ACCEPT_SEARCH_ALBUM = 'admin/ACCEPT_SEARCH_ALBUM'
export const acceptSearchAlbum = createAction(ACCEPT_SEARCH_ALBUM)

export const ABORT_SEARCH_ALBUM = 'admin/ABORT_SEARCH_ALBUM'
export const abortSearchAlbum = createAction(ABORT_SEARCH_ALBUM)

const initialSearchState = {
    searchText : '',
    foundLists : Map({
        singer : List(),
        song : List(),
        album : List(),
    })
}

export const searchReducer = handleActions({
    [ACCEPT_SEARCH] : (state , action) => {
        const newState = { ...state }
        const { foundLists } = action.payload
        console.dir(foundLists)
        newState.foundLists = fromJS(foundLists)
        return newState
    },

    [ABORT_SEARCH] : (state , action) => {

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
    }

} , initialSearchState)

function* fetchSearchSaga(action) {
    const { searchText } = action.payload
    yield get(`/search?searchtext=${searchText}` , ACCEPT_SEARCH , ABORT_SEARCH)
}

function* fetchSearchSingerSaga(action) {
    const { searchText } = action.payload
    yield get(`/search/singer?searchtext=${searchText}` , ACCEPT_SEARCH_SINGER , ABORT_SEARCH_SINGER)
}

function* fetchSearchSongSaga(action) {
    const { searchText } = action.payload
    yield get(`/search/song?searchtext=${searchText}` , ACCEPT_SEARCH_SONG , ABORT_SEARCH_SONG)
}

function* fetchSearchAlbumSaga(action) {
    const { searchText } = action.payload
    yield get(`/search/album?searchtext=${searchText}` , ACCEPT_SEARCH_ALBUM , ABORT_SEARCH_ALBUM)
}

export function* searchSaga() {
    yield takeLatest(FETCH_SEARCH , fetchSearchSaga)
    yield takeLatest(FETCH_SEARCH_SINGER , fetchSearchSingerSaga)
    yield takeLatest(FETCH_SEARCH_SONG , fetchSearchSongSaga)
    yield takeLatest(FETCH_SEARCH_ALBUM , fetchSearchAlbumSaga)
}