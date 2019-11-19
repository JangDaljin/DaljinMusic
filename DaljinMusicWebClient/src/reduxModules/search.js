import { createAction , handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import { get } from './Request/request'

import { List } from 'immutable'
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
    foundList : List([]),
}

export const searchReducer = handleActions({
    [ACCEPT_SEARCH_SINGER] : (state , action) => {
        const newState = { ...state }
        const { foundList } = action.payload
        newState.foundList = newState.foundList.clear().concat(foundList)
        return newState
    },
    [ABORT_SEARCH_SINGER] : (state , action) => {
        const newState = { ...state }
        newState.foundList = newState.foundSingers.clear()
        return newState
    },
    [ACCEPT_SEARCH_SONG] : (state , action) => {
        const newState = { ...state }
        const { foundList } = action.payload
        newState.foundList = newState.foundList.clear().concat(foundList)
        return newState
    },
    [ABORT_SEARCH_SONG] : (state , action) => {
        const newState = { ...state }
        newState.foundSongs = newState.foundSongs.clear()
        return newState
    },
    [ACCEPT_SEARCH_ALBUM] : (state , action) => {
        const newState = { ...state }
        const { foundList } = action.payload
        newState.foundList = newState.foundList.clear().concat(foundList)
        return newState
    },
    [ABORT_SEARCH_ALBUM] : (state , action) => {
        const newState = { ...state }
        newState.foundAlbums = newState.foundAlbums.clear()
        return newState
    }

} , initialSearchState)

function* fetchSearchSingerSaga(action) {
    const { search } = action.payload
    yield get(`/search/singer?search=${search}` , ACCEPT_SEARCH_SINGER , ABORT_SEARCH_SINGER)
}

function* fetchSearchSongSaga(action) {
    const { search } = action.payload
    yield get(`/search/song?search=${search}` , ACCEPT_SEARCH_SONG , ABORT_SEARCH_SONG)
}

function* fetchSearchAlbumSaga(action) {
    const { search } = action.payload
    console.log(search)
    yield get(`/search/album?search=${search}` , ACCEPT_SEARCH_ALBUM , ABORT_SEARCH_ALBUM)
}

export function* searchSaga() {
    yield takeLatest(FETCH_SEARCH_SINGER , fetchSearchSingerSaga)
    yield takeLatest(FETCH_SEARCH_SONG , fetchSearchSongSaga)
    yield takeLatest(FETCH_SEARCH_ALBUM , fetchSearchAlbumSaga)
}