import { createAction , handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import { post } from './Request/request'
import { List , fromJS } from 'immutable'

export const FETCH_VALIDATE_PASSWORD = 'admin/FETCH_VALIDATE_PASSWORD'
export const fetchValidatePassword = createAction(FETCH_VALIDATE_PASSWORD)

export const ACCEPT_VALIDATE_PASSWORD = 'admin/ACCEPT_VALIDATE_PASSWORD'
export const acceptValidatePassword = createAction(ACCEPT_VALIDATE_PASSWORD)

export const ABORT_VALIDATE_PASSWORD = 'admin/ABORT_VALIDATE_PASSWORD'
export const abortValidatePassword = createAction(ABORT_VALIDATE_PASSWORD)

export const FETCH_GET_ALL_MUSICS = 'admin/FETCH_GET_ALL_MUSICS'
export const fetchGetAllMusics = createAction(FETCH_GET_ALL_MUSICS)

export const ACCEPT_GET_ALL_MUSICS = 'admin/ACCEPT_GET_ALL_MUSICS'
export const acceptGetAllMusics = createAction(ACCEPT_GET_ALL_MUSICS)

export const ABORT_GET_ALL_MUSICS = 'admin/ABORT_GET_ALL_MUSICS'
export const abortGetAllMusics = createAction(ABORT_GET_ALL_MUSICS)

export const FETCH_SET_HOTANDNEW = 'admin/FETCH_SET_HOTANDNEW'
export const fetchSetHotAndNew = createAction(FETCH_SET_HOTANDNEW)

export const ACCEPT_SET_HOTANDNEW = 'admin/ACCEPT_SET_HOTANDNEW'
export const acceptSetHotAndNew = createAction(ACCEPT_SET_HOTANDNEW)

export const ABORT_SET_HOTANDNEW = 'admin/ABORT_SET_HOTANDNEW'
export const abortSetHotAndNew = createAction(ABORT_SET_HOTANDNEW)



export const FETCH_MUSIC_UPLOAD = 'admin/FETCH_MUSIC_UPLOAD'
export const fetchMusicUpload = createAction(FETCH_MUSIC_UPLOAD)

export const ACCEPT_MUSIC_UPLOAD = 'admin/ACCEPT_MUSIC_UPLOAD'
export const acceptMusicUpload = createAction(ACCEPT_MUSIC_UPLOAD)

export const ABORT_MUSIC_UPLOAD = 'admin/ABORT_MUSIC_UPLOAD'
export const abortMusicUpload = createAction(ABORT_MUSIC_UPLOAD)

const initialAdminState = {
    isAdmin : false,
    adminKey : null,
    musicList : List()
}

export const adminReducer = handleActions({
    [ACCEPT_VALIDATE_PASSWORD] : (state , action) => {
        const newState = { ...state }
        const { adminKey , isAdmin } = action.payload

        if(typeof adminKey === 'string' && adminKey.trim() !== '') {
            newState.isAdmin = isAdmin
            newState.adminKey = adminKey
        }

        if(!newState.isAdmin) {
            window.alert('비밀번호가 틀렸습니다.')
        }
        return newState
    },

    [ABORT_VALIDATE_PASSWORD] : (state , action) => {
        const newState = { ...state }
        window.alert('서버와 통신 불가')
        return newState
    },

    [ACCEPT_GET_ALL_MUSICS] : (state , action) => {
        const newState = { ...state }
        const { musicList } = action.payload
        newState.musicList = newState.musicList.concat(fromJS(musicList))
        return newState
    },

    [ABORT_GET_ALL_MUSICS] : (state , aciton) => {
        const newState = { ...state }
        newState.musicList = newState.musicList.clear()
        return newState
    },

    [ACCEPT_SET_HOTANDNEW] : (state , action) => {
        const newState = { ...state }
        const { message } = action.payload
        window.alert(message)
        return newState
    },
    [ABORT_SET_HOTANDNEW] : (state , action) => {
        const newState = { ...state }
        const { message } = action.payload
        window.alert(message)
        return newState
    },

    [ACCEPT_MUSIC_UPLOAD] : (state , action) => {
        const newState = {...state}
        const { message } = action.payload
        window.alert(message)
        return newState
    },
    [ABORT_MUSIC_UPLOAD] : (state , action) => {
        const newState = { ...initialAdminState }
        return newState
    }
} , initialAdminState)

function* fetchValidatePasswordSaga(action) {
    yield post('/admin/validate' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_VALIDATE_PASSWORD , ABORT_VALIDATE_PASSWORD)
}


function* fetchGetAllMusicsSaga(action) {
    yield post('/admin/getallmusics' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_GET_ALL_MUSICS , ABORT_GET_ALL_MUSICS)
}

function* fetchSetHotAndNewSaga(action) {
    yield post('/admin/sethotandnew' , { 'Content-Type' : 'application/json' , 'Accept':  'application/json' , 'Cache': 'no-cache' } , JSON.stringify(action.payload) , ACCEPT_SET_HOTANDNEW , ABORT_SET_HOTANDNEW)
}

function* fetchMusicUploadSaga(action) {
    const { songs , singers , albums , musicFiles } = action.payload
    const formData = new FormData()
    formData.append('songs' , JSON.stringify(songs))
    formData.append('singers' , JSON.stringify(singers))
    formData.append('albums' , JSON.stringify(albums.map((value) => ({'name' : value.name , '_id' : value._id , 'isThere' : value.isThere , 'index' : value.index}))))
    for(const album of albums) {
        if(album.isThere) {
            formData.append('albumImgFiles' , album.file)
        }
    }

    for(const file of musicFiles) {
        formData.append('musicFiles' , file)
    }

    yield post(`/admin/musicupload` , {} , formData , ACCEPT_MUSIC_UPLOAD , ABORT_MUSIC_UPLOAD)
}

export function* adminSaga() {
    yield takeLatest(FETCH_VALIDATE_PASSWORD , fetchValidatePasswordSaga)
    yield takeLatest(FETCH_GET_ALL_MUSICS , fetchGetAllMusicsSaga)
    yield takeLatest(FETCH_SET_HOTANDNEW , fetchSetHotAndNewSaga)
    yield takeLatest(FETCH_MUSIC_UPLOAD , fetchMusicUploadSaga)
}